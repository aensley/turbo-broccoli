/* global $, FEATURES, tocbot */

(function () {
  initToc()

  /**
   * Initializes the Table of Contents.
   */
  function initToc () {
    // Table of contents
    tocbot.init({
      tocSelector: FEATURES.toc.selector,
      contentSelector: '#content',
      headingSelector: 'h1, h2, h3, h4, h5, h6',
      headingsOffset: -154,
      collapseDepth: 0
    })
    $('.heading-anchor').text('#')
    $('.toc-sidebar').show()
  }
})()
