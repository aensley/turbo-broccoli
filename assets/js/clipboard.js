/* global $, FEATURES, ClipboardJS */

(function () {
  initClipboard()

  /**
   * Shows a tooltip for a given element.
   *
   * @param {Element} target  HTML DOM Element to attach the tooltip to.
   * @param {String}  message Tooltip text.
   */
  function showTooltip (target, message) {
    const $target = $(target)
    const originalTitle = $target.attr('title')
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
    const clipboard = new ClipboardJS(FEATURES.clipboard.selector)
    clipboard.on('success', function (e) { showTooltip(e.trigger, 'Copied!') })
    clipboard.on('error', function (e) { showTooltip(e.trigger, 'Error') })
  }
})()
