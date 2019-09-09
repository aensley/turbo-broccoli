/* global $, FEATURES, $content, getModal */

(function () {
  let $imageViewerModal,
    $imageViewerModalImage

  initImageViewer()

  /**
   * Converts a relative path to an Absolute URL.
   *
   * @param {String} href The relative path to convert.
   */
  function absoluteUrl (href) {
    const link = document.createElement('a')
    link.href = href
    return link.href
  }

  /**
   * Handles the click event on the print button.
   */
  function printButtonClick () {
    $imageViewerModalImage.printThis({
      printDelay: 333,
      removeScripts: true,
      base: window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)
    })
  }

  /**
   * Handles the click event on the save button.
   */
  function saveButtonClick () {
    const src = $imageViewerModalImage.find('img').first().attr('src')
    if (src) {
      const a = document.createElement('a')
      a.href = src
      a.download = src
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  /**
   * Initializes the modal used to display images.
   */
  function initImageViewerModal () {
    $imageViewerModal = getModal(
      'image-viewer',
      '<div id="image-viewer-modal-image" class="modal-body text-center"></div>',
      'modal-xl',
      null,
      (
        '<button type="button" class="btn btn-primary" id="image-viewer-save-button"><i class="fas fa-save mr-1"></i> Save</button>' +
        '<button type="button" class="btn btn-danger" id="image-viewer-print-button"><i class="fas fa-print mr-1"></i> Print</button>' +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal"><span aria-hidden="true" class="mr-1">&times;</span> Close</button>'
      )
    )
    $imageViewerModalImage = $('#image-viewer-modal-image')
    $('#image-viewer-print-button').on('click', printButtonClick)
    $('#image-viewer-save-button').on('click', saveButtonClick)
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
    $content.find(FEATURES['image-viewer'].selector).each(function () {
      const $this = $(this)
      if (absoluteUrl($this.attr('src')) === absoluteUrl($this.parent().attr('href'))) {
        $this.parent().on('click', openImageViewer)
      }
    })
  }
})()
