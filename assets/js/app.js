/* global $, bowser, BUILD_NUMBER */

/**
 * Checks if the user's browser is supported by GitHub.
 * @see: https://help.github.com/en/articles/supported-browsers
 *
 * @return {boolean} True if the user's browser is supported. False if not.
 */
function isSupportedBrowser () {
  const parser = bowser.getParser(window.navigator.userAgent)
  const supportedBrowsers = [
    'Chrome',
    'Firefox',
    'Safari',
    'Microsoft Edge'
  ]
  let supported = false
  for (let i = 0; i < supportedBrowsers.length; i++) {
    if (parser.isBrowser(supportedBrowsers[i])) {
      supported = true
      break
    }
  }

  return supported
}

/**
 * Displays a warning message to the user that their browser is not supported.
 */
function browserWarning () {
  $(
    '<div class="alert alert-warning alert-dismissible fade show d-print-none" role="alert">' +
      '<p class="m-0">To use all the features of this site, please view it in <strong>Google Chrome</strong>.</p>' +
      '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
      '</button>' +
    '</div>'
  ).prependTo($('main').closest('.container'))
}

$(function () {
  // DOM Ready
  $('table').addClass('table table-striped table-bordered')
  if (!isSupportedBrowser()) {
    browserWarning()
  } else {
    // Only perform default tasks if we're in a supported browser.
    $.cachedScript = function (url, options) {
      // Cache-honoring version of $.getScript()
      // Obtained from: https://api.jquery.com/jQuery.getScript/
      // Allow user to set any option except for dataType, cache, and url
      options = $.extend(options || {}, {
        dataType: 'script',
        cache: true,
        url: url + '?_=' + BUILD_NUMBER
      })

      // Use $.ajax() since it is more flexible than $.getScript
      // Return the jqXHR object so we can chain callbacks
      return $.ajax(options)
    }

    $.cachedScript('assets/js/supported-browser.js')
  }
})
