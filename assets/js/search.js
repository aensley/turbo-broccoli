/* global $, $content, Octokit, PAGE_URL, API_TOKEN API_ENDPOINT, REPOSITORY, PAGE_NAME, getSearchHash */

(function () {
  const DOT_POSITION = PAGE_NAME.lastIndexOf('.')
  const BASENAME = (DOT_POSITION === -1 ? PAGE_NAME : PAGE_NAME.substring(0, DOT_POSITION))
  const octokit = new Octokit({
    auth: API_TOKEN,
    baseUrl: API_ENDPOINT
  })
  let $searchInput,
    $searchResultModal,
    $searchTerms,
    $searchResultsList

  initSearch()
  searchFor404()

  /**
   * Initializes the GitHub REST API client.
   */
  function initRest () {
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
        const searchString = $searchInput.val().trim()
        if (!searchString) {
        // Don't search for nothing.
          return false
        }

        searchGitHubCode(searchString, displayResults)
        return false
      })
    // See if the user came from a search result link.
    const hashTerms = getSearchHash()
    if (hashTerms) {
      // They did. Highlight their search terms.
      highlightSearchTerms(hashTerms)
    }
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
              const $mark = $('mark[data-markjs]')
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
              '<h5 class="modal-title" id="search-results-modal-title">Search Results: <span class="search-terms"></span></h5>' +
              '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
              '</button>' +
            '</div>' +
            '<div class="search-results-list" class="modal-body"></div>' +
          '</div>' +
        '</div>' +
      '</div>'
    )
    $('body').append($searchResultModal)
    $searchTerms = $('.search-terms')
    $searchResultsList = $('.search-results-list')
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
    const items = data.items; let list = '<ul>'; let max = 5; let resultsAdded = 0; let link; let localResults = false
    // Return a max of 5 results.
    for (let i = 0; i < items.length && i < max; i++) {
      // Set item = file name without the ".md" extension.
      const item = items[i].name.substring(0, items[i].name.length - 3)
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
      const lastPathContents = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)
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
            '<div class="search-results-list">' + listResults(searchString, data) + '</div>'
          )
        }
      })
    }
  }
})()
