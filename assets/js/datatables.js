/* global $, FEATURES, $content, getSearchHash, DATATABLES_SCRIPT_SELECTOR */

(function () {
  initDataTables()

  /**
   * Initializes DataTables.
   */
  function initDataTables () {
    $content.find(FEATURES.datatables.selector).each(function () {
      const $this = $(this)
      const options = {
        deferRender: true,
        dom: 'Bfrtip',
        buttons: [
          'copy', 'excel', 'pdf', 'colvis'
        ],
        responsive: true
      }

      // If someone came to this page from a search result,
      // filter the table based on the search terms.
      const hashTerms = getSearchHash()
      if (hashTerms) {
        options.search = { search: hashTerms }
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
})()
