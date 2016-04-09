var request = require('superagent')

function Client (options) {
  this.options = options || {}
  this.endpoint = this.options.endpoint || 'https://api.spotify.com/v1/'
  this.type = this.options.type || 'artist,album,track'
}

Client.prototype._request = function (path, query, options, callback) {
  var url = this.endpoint + path
  var type = this.type

  request
    .get(url)
    .query({ q: query })
    .query({ type: type })
    .set('Accept', 'application/json')
    .end(function (err, res) {
      if (err || !res.ok) return callback('An error ocurred in the request ' + err)

      callback(null, res.body)
    })
}

Client.prototype.search = function (query, options, callback) {
  this._request('/search', query, options, callback)
}

module.exports = Client
