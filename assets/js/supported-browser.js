/* global $, Octokit, tocbot, ClipboardJS, VERSIONS, PAGE_URL, PAGE_NAME, API_ENDPOINT, API_TOKEN, REPOSITORY */

// Remove the file extension.
const DOT_POSITION = PAGE_NAME.lastIndexOf('.')
const BASENAME = (DOT_POSITION === -1 ? PAGE_NAME : PAGE_NAME.substring(0, DOT_POSITION))
let octokit,
  $content,
  $searchInput,
  $searchResultModal,
  $searchTerms,
  $searchResultsList,
  $imageViewerModal,
  $imageViewerModalImage
const DATATABLES_SCRIPT_SELECTOR = 'script[type="text/x-datatable"]'
const DATATABLE_SELECTOR = DATATABLES_SCRIPT_SELECTOR + ' + table'
const CLIPBOARD_SELECTOR = '[data-clipboard-text]'
const IMAGE_VIEWER_SELECTOR = 'a img:only-child'
const YOUTUBE_SELECTOR = 'a[href*="youtube.com"]:contains("youtube.com"),a[href*="youtu.be"]:contains("youtu.be")'
const TOC_SELECTOR = '#toc'
const YOUTUBE_REGEX = /^.*((m\.)?youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|&vi?=)([^#&?'"/]*).*/

/**
 * Initializes the GitHub REST API client.
 */
function initRest () {
  octokit = new Octokit({
    auth: API_TOKEN,
    baseUrl: API_ENDPOINT
  })
  octokit.hook.before('request', async (options) => {
    // Tell GitHub we want text-match data.
    options.headers.Accept = 'application/vnd.github.v3.text-match+json'
  })
}

/**
 * Shortens a string to a maxlength, without cutting off in the middle of a word.
 * Any word fragments at the end of the shortened string will be removed,
 * resulting in a string that may be shorter - but not longer - than maxLength.
 * Only if there are no non-word characters and the string is longer than
 * maxLength will the string be truncated in the middle of the word at maxLength.
 *
 * @param {String} subject   The string to shorten.
 * @param {Number} maxLength The maximum length of the string.
 *
 * @returns {String} The shortened string.
 */
function shortenWords (subject, maxLength) {
  if (subject.length <= maxLength) {
    return subject
  }

  // Are there any non-word characters?
  if (!/[^\w]/.test(subject)) {
    // Nope, just clip the string and return.
    return subject.substring(0, maxLength)
  }

  // Cut string down, but keep 1 extra character so we can check if a non-word character exists beyond the boundary.
  // This avoids removing the last word when it ends on maxLength.
  subject = subject.substring(0, maxLength + 1)
  // cut any word characters off the end of the string
  subject = subject.replace(/[\w]+$/, '')
  // cut any non-word characters off the end of the string
  subject = subject.replace(/[^\w]+$/, '')
  return subject
}

/**
 * Searches GitHub's API for terms in code.
 *
 * @param {String}   searchString The string to search for in GitHub.
 * @param {Function} callback     Callback function to receive results.
 */
function searchGitHubCode (searchString, callback) {
  searchString = shortenWords(searchString, 128)
  if (!searchString) {
    return
  }

  !octokit && initRest() // Initialize the REST client if it isn't already.
  octokit.search.code({
    q: 'repo:' + REPOSITORY + '+in:file+extension:md+' +
      // "For application/x-www-form-urlencoded, spaces are to be replaced by '+', so one may wish to follow
      // a encodeURIComponent replacement with an additional replacement of '%20' with '+'."
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
      encodeURIComponent(searchString).replace('%20', '+')
  }).then(({ data, header, status }) => {
    if (status === 200) {
      callback(searchString, data)
    }
  })
}

/**
 * Initializes the Search handler.
 */
function initSearch () {
  initSearchResultModal()
  $searchInput = $('#search-form').find('input').first()
  $('#search-form')
    .removeClass('d-none')
    .on('submit', function (e) {
      e.stopPropagation()
      e.preventDefault()
      let searchString = $searchInput.val().trim()
      if (!searchString) {
      // Don't search for nothing.
        return false
      }

      searchGitHubCode(searchString, displayResults)
      return false
    })
  // See if the user came from a search result link.
  let hashTerms = getSearchHash()
  if (hashTerms) {
    // They did. Highlight their search terms.
    highlightSearchTerms(hashTerms)
  }
}

/**
 * Returns a search term in the location hash, if available.
 *
 * @returns {String} The search terms from the hash, or an empty string if none.
 */
function getSearchHash () {
  let hash = window.location.hash
  if (hash.length > 0 && hash.substring(0, 8) === '#search-') {
    return hash.substring(8)
  }

  return ''
}

/**
 * Highlights search terms in the page's content.
 *
 * @param {String} searchString The search string to highlight on the page.
 */
function highlightSearchTerms (searchString) {
  // First unmark anything that was previously marked.
  $content.unmark({
    accuracy: 'exactly',
    ignoreJoiners: true,
    done: function () {
      // Now mark occurrences.
      $content.mark(
        searchString.replace(/[^a-z0-9]/gi, ' '),
        {
          accuracy: 'exactly',
          ignoreJoiners: true,
          done: function () {
            let $mark = $('mark[data-markjs]')
            if ($mark.length) {
              // Scroll to the first occurrence.
              window.scroll({
                top: ($mark.first().position().top + $('#header-nav').outerHeight()),
                left: 0,
                behavior: 'smooth'
              })
            }
          }
        }
      )
    }
  })
}

/**
 * Initializes the modal used to display search results.
 */
function initSearchResultModal () {
  $searchResultModal = $(
    '<div class="modal fade" id="search-results-modal" tabindex="-1" role="dialog" aria-labelledby="search-results-modal-title" aria-hidden="true">' +
      '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">' +
        '<div class="modal-content">' +
          '<div class="modal-header">' +
            '<h5 class="modal-title" id="search-results-modal-title">Search Results: <span id="search-terms"></span></h5>' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
              '<span aria-hidden="true">&times;</span>' +
            '</button>' +
          '</div>' +
          '<div id="search-results-list" class="modal-body"></div>' +
        '</div>' +
      '</div>' +
    '</div>'
  )
  $('body').append($searchResultModal)
  $searchTerms = $('#search-terms')
  $searchResultsList = $('#search-results-list')
  $searchResultModal.modal({ focus: false, show: false })
}

/**
 * Displays search results in a modal dialog.
 *
 * @param {String} searchString The search string entered by the user.
 * @param {Object} data         The results object returned from the API.
 */
function displayResults (searchString, data) {
  $searchTerms.text(searchString)
  $searchResultsList.html(listResults(searchString, data, true))
  $searchResultModal.modal('show')
  // Highlight local results.
  highlightSearchTerms(searchString)
}

/**
 * Creates an unordered list from search results data.
 *
 * @param {String} searchString The search string entered by the user.
 * @param {Object} data         The results object returned from the API.
 *
 * @returns {String} The unordered list as an HTML string.
 */
function listResults (searchString, data, highlightMessage) {
  let items = data.items; let list = '<ul>'; let max = 5; let resultsAdded = 0; let link; let localResults = false
  // Return a max of 5 results.
  for (let i = 0; i < items.length && i < max; i++) {
    // Set item = file name without the ".md" extension.
    let item = items[i].name.substring(0, items[i].name.length - 3)
    if (item === BASENAME) {
      // Don't include the current page. Do inform the user there are local results.
      localResults = true
      max++
      continue
    }

    // Add the result.
    link = (item === BASENAME && PAGE_URL === '/' ? './' : item) + '#search-' + searchString.replace(/[^a-z0-9]/gi, '-')
    list +=
      '<li>' +
        '<a href="' + link + '"><h5>' + item + '</h5></a>' +
        // Show the excerpts of the content that matched.
        listContentMatches(items[i].text_matches) +
      '</li>'
    resultsAdded++
  }

  if (!resultsAdded) {
    // No results to display. Explain.
    list +=
      '<li>' +
        '<h5>No results</h5>' +
        '<ul>' +
          '<li>Nothing found' + (highlightMessage && localResults ? ' on other pages.' : '. Please try another search.') + '</li>' +
          '<li>There may be results on the current page. If so, they are now highlighted.</li>' +
        '</ul>' +
      '</li>'
  }

  list += '</ul>'
  return list
}

/**
 * Creates an unordered list from text match data.
 *
 * @param {Object} matches The matches object for a single result returned from the GitHub API.
 *
 * @returns {String} The unordered list as an HTML string.
 */
function listContentMatches (matches) {
  let matchesList = '<ul>'; let max = 1; let singleMatch; let singleMatchMatchesLength; let matchIndex; let lastMatchIndex = 0
  for (let i = 0; i < matches.length && i < max; i++) {
    // Each match is a single content fragment with potentially several matches within it.
    singleMatch = matches[i]
    if (singleMatch.fragment.substring(0, 3) === '---') {
      // Skip front-matter matches.
      max++
      continue
    }

    matchesList += '<li>'
    singleMatchMatchesLength = singleMatch.matches.length
    for (let j = 0; j < singleMatchMatchesLength; j++) {
      // Loop through the match indices for the current fragment.
      matchIndex = singleMatch.matches[j]
      // Add the part before the match.
      matchesList += addBreaks(singleMatch.fragment.substring(lastMatchIndex, matchIndex.indices[0])) +
        '<mark>' +
          // Add the match.
          addBreaks(singleMatch.fragment.substring(matchIndex.indices[0], matchIndex.indices[1])) +
        '</mark>'
      // Add the part after the match.
      if (j === (singleMatchMatchesLength - 1)) {
        // This is the last match in this fragment.
        matchesList += addBreaks(singleMatch.fragment.substring(matchIndex.indices[1]))
      } else {
        lastMatchIndex = matchIndex.indices[1]
      }
    }

    matchesList += '</li>'
  }

  matchesList += '</ul>'
  return matchesList
}

/**
 * Replaces newline characters with HTML <br> (break) elements.
 *
 * @param {String} subject The string to modify.
 *
 * @returns {String} The modified string.
 */
function addBreaks (subject) {
  return subject.replace(/\r\n/gi, '<br>').replace(/\n/gi, '<br>')
}

/**
 * Searches for words in URL of a 404 request.
 */
function searchFor404 () {
  if ($('#search-404').length) {
    let lastPathContents = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)
    searchGitHubCode(decodeURIComponent(lastPathContents).replace(/[^a-z0-9]/gi, ' '), function (searchString, data) {
      let numItems = data.items.length
      for (let i = 0; i < data.items.length; i++) {
        if (data.items[i].name === '404.md') {
          numItems--
        }
      }

      if (numItems) {
        $('#search-404').html(
          '<h3>Possible Matches</h3><p>These results may be close to what you were looking for.</p>' +
          '<div id="search-results-list">' + listResults(searchString, data) + '</div>'
        )
      }
    })
  }
}

/**
 * Initializes the modal used to display images.
 */
function initImageViewerModal () {
  $imageViewerModal = $(
    '<div class="modal fade" id="image-viewer-modal" tabindex="-1" role="dialog" aria-labelledby="image-viewer-modal-title" aria-hidden="true">' +
      '<div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" role="document">' +
        '<div class="modal-content">' +
          '<div id="image-viewer-modal-image" class="modal-body text-center"></div>' +
          '<div class="modal-footer">' +
            '<button type="button" class="btn btn-primary" id="image-viewer-save-button"><i class="fas fa-save mr-1"></i> Save</button>' +
            '<button type="button" class="btn btn-danger" id="image-viewer-print-button"><i class="fas fa-print mr-1"></i> Print</button>' +
            '<button type="button" class="btn btn-secondary" data-dismiss="modal"><span aria-hidden="true" class="mr-1">&times;</span> Close</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  )
  $('body').append($imageViewerModal)
  $imageViewerModalImage = $('#image-viewer-modal-image')
  $('#image-viewer-print-button').on('click', function () {
    let $img = $imageViewerModalImage.find('img').first()
    let src = $img.attr('src')
    if (src) {
      $imageViewerModalImage.printThis({
        printDelay: 333,
        removeScripts: true,
        base: window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)
      })
    }
  })
  $('#image-viewer-save-button').on('click', function () {
    let src = $imageViewerModalImage.find('img').first().attr('src')
    if (src) {
      let a = document.createElement('a')
      a.href = src
      a.download = src
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  })
  $imageViewerModal.modal({ focus: false, show: false })
}

/**
 * Click event listener that opens an image in the image viewer.
 *
 * @param {Event} e The DOM event that triggered the event listener.
 */
function openImageViewer (e) {
  e.stopPropagation()
  $imageViewerModalImage.html(this.outerHTML)
  $imageViewerModal.modal('show')
  return false
}

/**
 * Initializes image viewer logic.
 */
function initImageViewer () {
  initImageViewerModal()
  $content.find(IMAGE_VIEWER_SELECTOR).each(function () {
    let $this = $(this)
    if (absoluteUrl($this.attr('src')) === absoluteUrl($this.parent().attr('href'))) {
      $this.parent().on('click', openImageViewer)
    }
  })
}

/**
 * Get the video ID from a YouTube URL.
 *
 * @see https://stackoverflow.com/a/45426669
 *
 * @param {String} url The YouTube URL.
 *
 * @return {String} The video ID.
 */
function getYouTubeVideoId (url) {
  const parsed = url.match(YOUTUBE_REGEX)
  return (parsed && parsed[3] ? parsed[3] : url)
}

/**
 * Initializes YouTube video players.
 */
function initYouTubeVideo () {
  $content.find(YOUTUBE_SELECTOR).each(function () {
    let $this = $(this)
    let href = $this.attr('href')
    if (href === $this.text()) {
      let videoId = getYouTubeVideoId(href)
      $this.replaceWith(
        '<div class="embed-responsive embed-responsive-16by9">' +
          '<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' +
          videoId +
          '?modestbranding=1&iv_load_policy=3&rel=0&showinfo=0" allowfullscreen></iframe>' +
        '</div>'
      )
    }
  })
}

/**
 * Converts a relative path to an Absolute URL.
 *
 * @param {String} href The relative path to convert.
 */
function absoluteUrl (href) {
  let link = document.createElement('a')
  link.href = href
  return link.href
}

/**
 * Initializes DataTables.
 */
function initDataTables () {
  $(DATATABLE_SELECTOR).each(function () {
    let $this = $(this)
    let options = {
      deferRender: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'excel', 'pdf', 'colvis'
      ],
      responsive: true
    }

    // If someone came to this page from a search result,
    // filter the table based on the search terms.
    let hashTerms = getSearchHash()
    if (hashTerms) {
      options.search = { 'search': hashTerms }
    }

    try {
      let localOptions = $this.prev(DATATABLES_SCRIPT_SELECTOR).text()
      if (localOptions) {
        localOptions = $.parseJSON(localOptions)
        if (typeof localOptions === 'object') {
          $.extend(options, localOptions)
        }
      }
    } catch (e) { console.error(e) }

    $this.DataTable(options)
  })
}

/**
 * Initializes the Table of Contents.
 */
function initToc () {
  // Table of contents
  tocbot.init({
    tocSelector: TOC_SELECTOR,
    contentSelector: '#content',
    headingSelector: 'h1, h2, h3, h4, h5, h6',
    headingsOffset: -154,
    collapseDepth: 0
  })
  $('.heading-anchor').text('#')
  $('#tocSidebar').show()
}

/**
 * Shows a tooltip for a given element.
 *
 * @param {Element} target  HTML DOM Element to attach the tooltip to.
 * @param {String}  message Tooltip text.
 */
function showTooltip (target, message) {
  let $target = $(target)
  let originalTitle = $target.attr('title')
  $target.attr('title', message)
  $target.on('shown.bs.tooltip', function () {
    // Hide after 1 second
    setTimeout(
      function () {
        $target.attr('title', originalTitle)
        $target.tooltip('hide')
      },
      1000
    )
  }).tooltip({
    placement: 'bottom',
    title: message,
    trigger: 'manual'
  }).tooltip('show')
}

/**
 * Initializes clipboard buttons.
 */
function initClipboard () {
  let clipboard = new ClipboardJS(CLIPBOARD_SELECTOR)
  clipboard.on('success', function (e) { showTooltip(e.trigger, 'Copied!') })
  clipboard.on('error', function (e) { showTooltip(e.trigger, 'Error') })
}

// Cache-honoring External CSS Stylesheet loader
$.cachedExtCss = function (url, options) {
  options = $.extend(options || {}, {
    cache: true,
    url: url
  })

  return $.ajax(options).done(function () {
    $('#customStyles').before('<link rel="stylesheet" crossorigin="anonymous" href="' + url + '"/>')
  })
}

// Load multiple stylesheets and wait for all of them before resolving the promise.
$.getMultiCss = function (arr, path) {
  var _arr = $.map(arr, function (scr) {
    return $.cachedExtCss((path || '') + scr)
  })

  _arr.push($.Deferred(function (deferred) {
    $(deferred.resolve)
  }))

  return $.when.apply($, _arr)
}

// Load multiple scripts and wait for all of them before resolving the promise.
// Obtained from: https://stackoverflow.com/a/11803418
$.getMultiScripts = function (arr) {
  var _arr = $.map(arr, function (scr) {
    return $.cachedScript(scr)
  })

  _arr.push($.Deferred(function (deferred) {
    $(deferred.resolve)
  }))

  return $.when.apply($, _arr)
}

$(function () {
  // DOM Ready
  $content = $('#content')
  if ($(TOC_SELECTOR).length) {
    // TODO: Refactor to load CSS/JS simultaneously.
    $.cachedExtCss('https://cdn.jsdelivr.net/npm/tocbot@' + VERSIONS.tocbot + '/dist/tocbot.css').done(
      function () {
        $.cachedScript('https://cdn.jsdelivr.net/npm/tocbot@' + VERSIONS.tocbot + '/dist/tocbot.min.js').done(initToc)
      }
    )
  } else {
    $('.heading-anchor').text('#')
  }

  initYouTubeVideo()

  if (API_ENDPOINT.length && API_TOKEN.length && REPOSITORY.length) {
    $.getMultiScripts(
      [
        'https://cdnjs.cloudflare.com/ajax/libs/rest.js/' + VERSIONS.octokitrest + '/octokit-rest.min.js',
        'https://cdn.jsdelivr.net/npm/mark.js@' + VERSIONS.mark + '/dist/jquery.mark.min.js'
      ]
    ).done(function () {
      initSearch()
      searchFor404()
    })
  }

  if ($content.find(DATATABLE_SELECTOR).length) {
    // TODO: Refactor to load CSS/JS simultaneously.
    $.cachedExtCss('https://cdn.datatables.net/v/' + VERSIONS.datatables + '/datatables.min.css').done(function () {
      $.getMultiScripts(
        [
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/' + VERSIONS.pdfmake + '/pdfmake.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/' + VERSIONS.pdfmake + '/vfs_fonts.js',
          'https://cdn.datatables.net/v/' + VERSIONS.datatables + '/datatables.min.js'
        ]
      ).done(initDataTables)
    })
  }

  if ($content.find(IMAGE_VIEWER_SELECTOR).length) {
    $.cachedScript('https://cdn.jsdelivr.net/npm/printthis@' + VERSIONS.printthis + '/printThis.min.js').done(initImageViewer)
  }

  if ($(CLIPBOARD_SELECTOR).length) {
    $.cachedScript('https://cdn.jsdelivr.net/npm/clipboard@' + VERSIONS.clipboard + '/dist/clipboard.min.js').done(initClipboard)
  }
})
