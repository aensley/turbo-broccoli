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
 * Cache-honoring version of $.getScript()
 * Obtained from: https://api.jquery.com/jQuery.getScript/
 *
 * @param {String} url     The URL to load.
 * @param {Object} options AJAX options object.
 *
 * @return {jqXHR} The jQuery XMLHttpRequest object of the request.
 */
$.cachedScript = function (url, options) {
  // Allow user to set any option except for dataType, cache, and url
  options = $.extend(options || {}, {
    dataType: 'script',
    cache: true,
    url: url
  })

  // Use $.ajax() since it is more flexible than $.getScript
  // Return the jqXHR object so we can chain callbacks
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
  var _arr = $.map(arr, function (src) {
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
 * Loads a feature.
 *
 * @param {String} f The feature to load.
 */
function loadFeatureScript (f) {
  $.cachedScript('assets/js/' + f + '.js?_=' + BUILD_NUMBER)
}

/**
 * Conditionally loads features for the page.
 */
function loadFeatures () {
  for (const f in FEATURES) {
    const feature = FEATURES[f]
    if (
      (!feature.test || feature.test()) && // If we have a test, does it pass?
      (!feature.selector || $(feature.selector).length) // If we have a selector, is it found on the page?
    ) {
      if (feature.external) {
        // Load external scripts first.
        $.getMultiJsCss(feature.external).done(function () {
          // Then load the feature.
          loadFeatureScript(f)
        })
      } else {
        // Load the feature directly.
        loadFeatureScript(f)
      }
    } else if (feature.otherwise) {
      // Perform an alternative action.
      feature.otherwise()
    }
  }
}

$(function () {
  // DOM Ready
  $('table').addClass('table table-striped table-bordered')
  $content = $('#content')
  loadFeatures()
})
