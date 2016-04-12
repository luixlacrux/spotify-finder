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

Client.prototype.search = function (query, type, callback) {
  /* istanbul ignore else  */
  if (type === 'all') type = 'artist,album,track'

  this._request('/search', { q: query, type: type }, callback)
}

Client.prototype.getAlbum = function (id, options, callback) {
  var url = '/albums/' + id

  /* istanbul ignore else  */
  if (options.tracks) url += '/tracks'

  this._request(url, null, callback)
}

module.exports = Client
