var request = require('superagent')
var qs = require('querystring')

function Client (options) {
  this.options = options || {}
  this.endpoint = this.options.endpoint || 'https://api.spotify.com/v1'
}

Client.prototype._request = function (path, params, callback) {
  var url = this.endpoint + path

  /* istanbul ignore else  */
  if (params) url = url + '?' + qs.encode(params)

  request
    .get(url)
    .set('Accept', 'application/json')
    .end(function (err, res) {
      if (err || !res.ok) return callback('An error ocurred in the request ' + err)

      callback(null, res.body)
    })
}

Client.prototype.search = function (q, type, limit, callback) {
  /* istanbul ignore else  */
  if (type === 'all') type = 'artist,album,track'

  this._request('/search', { q, type, limit }, callback)
}

Client.prototype.getAlbum = function (id, options, callback) {
  var url = '/albums/' + id

  /* istanbul ignore else  */
  if (options.tracks) url += '/tracks'

  this._request(url, null, callback)
}

Client.prototype.getAlbums = function (array_ids, callback) {
  var ids = array_ids.toString()
  this._request('/albums', { ids }, callback)
}

Client.prototype.getArtist = function (id, options, region, callback) {
  var url = '/artists/' + id
  var country = region || 'SE'

  if (options.albums) url += '/albums'
  else if (options.topTracks) url += '/top-tracks'
  else if (options.relatedArtists) url += '/related-artists'

  this._request(url, { country }, callback)
}

Client.prototype.getArtists = function (array_ids, callback) {
  var ids = array_ids.toString()
  this._request('/artists', { ids }, callback)
}

Client.prototype.getTrack = function (id, callback) {
  var url = '/tracks/' + id
  this._request(url, null, callback)
}

Client.prototype.getTracks = function (array_ids, callback) {
  var ids = array_ids.toString()
  this._request('/tracks', { ids }, callback)
}

module.exports = Client
