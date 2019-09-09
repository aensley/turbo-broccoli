/* global $, FEATURES, $content */

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
      const $img = $imageViewerModalImage.find('img').first()
      const src = $img.attr('src')
      if (src) {
        $imageViewerModalImage.printThis({
          printDelay: 333,
          removeScripts: true,
          base: window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)
        })
      }
    })
    $('#image-viewer-save-button').on('click', function () {
      const src = $imageViewerModalImage.find('img').first().attr('src')
      if (src) {
        const a = document.createElement('a')
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
    $content.find(FEATURES['image-viewer'].selector).each(function () {
      const $this = $(this)
      if (absoluteUrl($this.attr('src')) === absoluteUrl($this.parent().attr('href'))) {
        $this.parent().on('click', openImageViewer)
      }
    })
  }
})()
