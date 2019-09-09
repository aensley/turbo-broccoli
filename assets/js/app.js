/* global $, BUILD_NUMBER, VERSIONS, API_ENDPOINT, API_TOKEN, REPOSITORY */

let browserWarned = false
let $content // eslint-disable-line no-unused-vars
const DATATABLES_SCRIPT_SELECTOR = 'script[type="text/x-datatable"]'
const FEATURES = {
  clipboard: {
    selector: '[data-clipboard-text]',
    external: ['https://cdn.jsdelivr.net/npm/clipboard@' + VERSIONS.clipboard + '/dist/clipboard.min.js']
  },
  datatables: {
    selector: DATATABLES_SCRIPT_SELECTOR + ' + table',
    external: [
      'https://cdn.datatables.net/v/' + VERSIONS.datatables + '/datatables.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/' + VERSIONS.pdfmake + '/pdfmake.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/' + VERSIONS.pdfmake + '/vfs_fonts.js',
      'https://cdn.datatables.net/v/' + VERSIONS.datatables + '/datatables.min.js'
    ]
  },
  'image-viewer': {
    selector: 'a img:only-child',
    external: ['https://cdn.jsdelivr.net/npm/printthis@' + VERSIONS.printthis + '/printThis.min.js']
  },
  search: {
    test: function () { return (testArrowFunction() && API_ENDPOINT.length && API_TOKEN.length && REPOSITORY.length) },
    external: [
      'https://cdnjs.cloudflare.com/ajax/libs/rest.js/' + VERSIONS.octokitrest + '/octokit-rest.min.js',
      'https://cdn.jsdelivr.net/npm/mark.js@' + VERSIONS.mark + '/dist/jquery.mark.min.js'
    ],
    otherwise: function () { if (!testArrowFunction()) { browserWarning() } }
  },
  toc: {
    selector: '.toc',
    external: [
      'https://cdn.jsdelivr.net/npm/tocbot@' + VERSIONS.tocbot + '/dist/tocbot.css',
      'https://cdn.jsdelivr.net/npm/tocbot@' + VERSIONS.tocbot + '/dist/tocbot.min.js'
    ],
    otherwise: function () { $('.heading-anchor').text('#') }
  },
  youtube: {
    selector: 'a[href*="youtu"]:contains("youtube-video")'
  }
}

/**
 * Displays a warning message to the user that their browser is not supported.
 */
function browserWarning () {
  if (!browserWarned) {
    $(
      '<div class="alert alert-warning alert-dismissible fade show d-print-none" role="alert">' +
        '<p class="m-0">To use all the features of this site, please view it in a modern browser.</p>' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
          '<span aria-hidden="true">&times;</span>' +
        '</button>' +
      '</div>'
    ).prependTo($('main').closest('.container'))
    browserWarned = true
  }
}

/**
 * Tests if the browser supports arrow functions.
 * Test obtained from: https://github.com/getify/ES-Feature-Tests/blob/ab31cd45ef6ffcaef4877e422e22ecd3877f985f/lib/featuretests.js#L27
 *
 * @returns {Boolean} True if arrow functions are supported. False if not.
 */
function testArrowFunction () {
  try {
    (new Function('"use strict"; var a = () => {};'))() // eslint-disable-line no-new-func
    return true
  } catch (err) {
    return false
  }
}

/**
 * Returns a search term in the location hash, if available.
 *
 * @returns {String} The search terms from the hash, or an empty string if none.
 */
function getSearchHash () { // eslint-disable-line no-unused-vars
  const hash = window.location.hash
  if (hash.length > 0 && hash.substring(0, 8) === '#search-') {
    return hash.substring(8)
  }

  return ''
}

/**
 * Creates a single modal for repeated used by similar functions.
 *
 * @param {String} id      The basename to use in the modal's many related IDs.
 * @param {String} content The content of the modal.
 * @param {String} size    The size class of the modal.
 * @param {String} header  The header of the modal.
 * @param {String} footer  The footer of the modal.
 *
 * @return {jQuery} The jQuery object representing the modal.
 */
function getModal (id, content, size, header, footer) { // eslint-disable-line no-unused-vars
  size = (size || '')
  const $modal = $(
    '<div class="modal fade" id="' + id + '-modal" tabindex="-1" role="dialog" aria-labelledby="' + id + '-modal-title" aria-hidden="true">' +
      '<div class="modal-dialog ' + size + ' modal-dialog-centered modal-dialog-scrollable" role="document">' +
        '<div class="modal-content">' +
          (
            header
              ? '<div class="modal-header">' +
                '<h5 class="modal-title" id="' + id + '-modal-title">' + header + '</h5>' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                  '<span aria-hidden="true">&times;</span>' +
                '</button>' +
              '</div>'
              : ''
          ) +
          content +
          (footer ? '<div class="modal-footer">' + footer + '</div>' : '') +
        '</div>' +
      '</div>' +
    '</div>'
  )
  $('body').append($modal)
  return $modal
}

/**
 * Cache-honoring version of $.getScript()
 * Obtained from: https://api.jquery.com/jQuery.getScript/
 *
 * @param {String} url     The URL to load.
 * @param {Object} options AJAX options object.
 *
 * @return {jqXHR} The jQuery XMLHttpRequest object of the request.
 */
$.cachedScript = function (url, options) {
  // Allow user to set any options except dataType, cache, and url
  options = $.extend(options || {}, {
    dataType: 'script',
    cache: true,
    url: url
  })

  return $.ajax(options)
}

/**
 * Cache-honoring External CSS Stylesheet loader.
 *
 * @param {String} url     The URL to load.
 * @param {Object} options AJAX options object.
 *
 * @return {jqXHR} The jQuery XMLHttpRequest object of the request.
 */
$.cachedCss = function (url, options) {
  // Allow user to set any options except cache and url
  options = $.extend(options || {}, {
    cache: true,
    url: url
  })

  return $.ajax(options).done(function () {
    $('#customStyles').before('<link rel="stylesheet" crossorigin="anonymous" href="' + url + '"/>')
  })
}

/**
 * Load multiple stylesheets and scripts and wait for all of them before resolving the promise.
 * Based on: https://stackoverflow.com/a/11803418
 *
 * @param {Array} arr URLs of resources to be loaded.
 *
 * @return {Promise} The jQuery Promise object representing all requests.
 */
$.getMultiJsCss = function (arr) {
  const _arr = $.map(arr, function (src) {
    if (src.search('.css') !== -1) {
      return $.cachedCss(src)
    } else {
      return $.cachedScript(src)
    }
  })

  _arr.push($.Deferred(function (deferred) {
    $(deferred.resolve)
  }))

  return $.when.apply($, _arr)
}

/**
 * Loads a single feature.
 *
 * @param {String} name    The name of the feature.
 * @param {Object} feature The feature object.
 */
function loadFeature (name, feature) {
  const loadFeatureScript = function () { $.cachedScript('assets/js/' + name + '.js?_=' + BUILD_NUMBER) }
  if (feature.external) {
    // Load external scripts first.
    $.getMultiJsCss(feature.external).done(loadFeatureScript)
  } else {
    // Load the feature directly.
    loadFeatureScript()
  }
}

/**
 * Checks if the given feature should be loaded.
 *
 * @param {Object} feature The feature object.
 *
 * @returns {Boolean} True if the feature should be loaded. False if not.
 */
function featureShouldLoad (feature) {
  return (
    (!feature.test || feature.test()) && // If we have a test, does it pass?
    (!feature.selector || $(feature.selector).length) // If we have a selector, is it found on the page?
  )
}

$(function () {
  // DOM Ready
  $('table').addClass('table table-striped table-bordered')
  $content = $('#content')
  // Conditionally load features on the page.
  for (const f in FEATURES) {
    const feature = FEATURES[f]
    if (featureShouldLoad(feature)) {
      loadFeature(f, feature)
    } else if (feature.otherwise) {
      // Perform an alternative action.
      feature.otherwise()
    }
  }
})
