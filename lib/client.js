var request = require('superagent')
var qs = require('querystring')

function Client (options) {
  this.options = options || {}
  this.endpoint = this.options.endpoint || 'https://api.spotify.com/v1'
  this.client_id = this.options.client_id || null
  this.client_secret = this.options.client_secret || null
}

Client.prototype._request = function (path, params, callback) {
  var url = this.endpoint + path

  /* istanbul ignore else  */
  if (params) url = url + '?' + qs.encode(params)

  if (!this.client_id || !this.client_secret) {
    this._requestBasic(url, callback)
  } else {
    this._requestOAuth(url, callback)
  }
}

Client.prototype._requestBasic = function (url, callback) {
  request
    .get(url)
    .set('Accept', 'application/json')
    .end(function (err, res) {
      if (err || !res.ok) return callback('An error ocurred in the request ' + err)

      callback(null, res.body)
    })
}

Client.prototype._requestOAuth = function (url, callback) {
  this.getToken(function (err, token) {
    if (err) return callback('An error ocurred in the request' + err)

    request
      .get(url)
      .set('Authorization', 'Bearer ' + token)
      .end(function (err, res) {
        if (err || !res.ok) return callback('An error ocurred in the request' + err)

        callback(null, res.body)
      })
  })
}

Client.prototype.getToken = function (callback) {
  var client_id = this.client_id
  var client_secret = this.client_secret

  request
    .post('https://accounts.spotify.com/api/token')
    .type('form')
    .send({ grant_type: 'client_credentials' })
    .auth(client_id, client_secret)
    .end(function (err, res) {
      if (err || !res.ok) return callback('An error ocurred in the request ' + err)

      callback(null, res.body.access_token)
    })
}

Client.prototype.browse = function (options, callback) {
  var url = '/browse'

  if (Object.keys(options).length > 1) {
    return callback(new Error('Baq Request: Only one option is accepted'), null)
  } else {
    if (options.newReleases) url += '/new-releases'
    else if (options.featuredPlaylists) url += '/featured-playlists'
    else if (options.categories) url += '/categories'
    else return callback(new Error('Baq Request: The option is required'), null)

    this._request(url, null, callback)
  }
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
