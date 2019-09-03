const urls = [
  'http://www.youtube.com/watch?v=w3jLJU7DT5E&feature=feedrec_grec_index',
  'http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/w3jLJU7DT5E',
  'http://www.youtube.com/v/w3jLJU7DT5E?fs=1&amp;hl=en_US&amp;rel=0',
  'http://www.youtube.com/watch?v=w3jLJU7DT5E#t=0m10s',
  'http://www.youtube.com/embed/w3jLJU7DT5E?rel=0',
  'http://www.youtube.com/watch?v=w3jLJU7DT5E',
  'http://youtu.be/w3jLJU7DT5E',
  'https://youtu.be/w3jLJU7DT5E',
  'http://youtu.be/w3jLJU7DT5E?feature=youtube_gdata_player',
  '//www.youtube-nocookie.com/embed/w3jLJU7DT5E?rel=0',
  'http://www.youtube.com/user/Scobleizer#p/u/1/w3jLJU7DT5E',
  'http://www.youtube.com/watch?v=w3jLJU7DT5E&feature=channel',
  'http://www.youtube.com/watch?v=w3jLJU7DT5E&playnext_from=TL&videos=osPknwzXEas&feature=sub',
  'http://www.youtube.com/ytscreeningroom?v=w3jLJU7DT5E',
  'http://www.youtube.com/user/SilkRoadTheatre#p/a/u/2/w3jLJU7DT5E',
  'http://www.youtube.com/watch?v=w3jLJU7DT5E&feature=youtu.be',
  'http://www.youtube.com/user/Scobleizer#p/u/1/w3jLJU7DT5E?rel=0',
  'http://www.youtube.com/embed/w3jLJU7DT5E?rel=0',
  'http://www.youtube.com/watch?v=w3jLJU7DT5E',
  'http://youtube.com/v/w3jLJU7DT5E?feature=youtube_gdata_player',
  'http://youtube.com/vi/w3jLJU7DT5E?feature=youtube_gdata_player',
  'http://youtube.com/?v=w3jLJU7DT5E&feature=youtube_gdata_player',
  'http://www.youtube.com/watch?v=w3jLJU7DT5E&feature=youtube_gdata_player',
  'http://youtube.com/?vi=w3jLJU7DT5E&feature=youtube_gdata_player',
  'http://youtube.com/watch?v=w3jLJU7DT5E&feature=youtube_gdata_player',
  'http://youtube.com/watch?vi=w3jLJU7DT5E&feature=youtube_gdata_player',
  'http://youtube.googleapis.com/v/w3jLJU7DT5E?version=3',
  'https://www.youtube.com/watch?feature=g-vrec&v=w3jLJU7DT5E',
  'http://www.youtube.com/watch?feature=player_embedded&v=w3jLJU7DT5E#',
  'http://www.youtube.com/watch?v=w3jLJU7DT5E',
  '<iframe width="420" height="315" src="http://www.youtube.com/embed/w3jLJU7DT5E" frameborder="0" allowfullscreen></iframe>',
  '<object width="420" height="315"><param name="movie" value="http://www.youtube-nocookie.com/v/w3jLJU7DT5E?version=3&amp;hl=en_US"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube-nocookie.com/v/w3jLJU7DT5E?version=3&amp;hl=en_US" type="application/x-shockwave-flash" width="420" height="315" allowscriptaccess="always" allowfullscreen="true"></embed></object>',
  'http://i1.ytimg.com/vi/w3jLJU7DT5E/default.jpg',
  'https://www.youtube.com/watch?v=w3jLJU7DT5E&feature=g-all-xit',
  'w3jLJU7DT5E'
]

const YOUTUBE_REGEX = /^.*((m\.)?youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|&vi?=)([^#&?'"/]*).*/
function getYouTubeVideoId (url) {
  const parsed = url.match(YOUTUBE_REGEX)
  return (parsed && parsed[2] ? parsed[2] : url)
}

urls.forEach(function (url) {
  console.log(getYouTubeVideoId(url))
})
