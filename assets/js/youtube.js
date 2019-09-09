/* global $, FEATURES, $content */

(function () {
  const YOUTUBE_REGEX = /^.*((m\.)?youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|&vi?=)([^#&?'"/]*).*/

  initYouTubeEmbeds()

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
   * Initializes YouTube Video embeds.
   */
  function initYouTubeEmbeds () {
    $content.find(FEATURES.youtube.selector).each(function () {
      const $this = $(this)
      const href = $this.attr('href')
      const videoId = getYouTubeVideoId(href)
      $this.replaceWith(
        '<div class="embed-responsive embed-responsive-16by9">' +
          '<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' +
          videoId +
          '?modestbranding=1&iv_load_policy=3&rel=0&showinfo=0" allowfullscreen></iframe>' +
        '</div>'
      )
    })
  }
})()
