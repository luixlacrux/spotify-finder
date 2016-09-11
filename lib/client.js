'use strict'

const request = require('request-promise')
const Promise = require('bluebird')
const qs = require('querystring')

class Client {
  /**
   * @param {Object} [opts] - Setup custom's endpoints
   */
  constructor (opts) {
    this.baseURL = opts ? opts.url : 'https://api.spotify.com/v1'
    this.endpoints = {
      search: `${this.baseURL}/search`,
      albums: `${this.baseURL}/albums`,
      artists: `${this.baseURL}/artists`,
      tracks: `${this.baseURL}/tracks`
    }
  }

  /**
   * @param {string} path - endpoint to send request
   * @param {Object} [params] - querystrings
   */
  xhr (path, params) {
    path = params ? `${path}?${qs.encode(params)}`: path

    const opts = {
      method: 'GET',
      uri: path,
      json: true
    }

    return request(opts)
  }

  /**
   * @param {Object} params - Options for the find
   * @param {string} params.q - Query for the find
   * @param {string} [params.type='artist,albums,track'] - Type of find
   * @param {string} [params.limit=20] - Limit of find
   * @param {requestCallback} [callback] -The callback that handles the response
   */
  search(params, callback) {
    params.type = !params.type ? 'artist,album,track' : params.type

    if (callback) {
      return Promise
        .resolve(this.xhr(this.endpoints.search, params))
        .asCallback(callback)
    }

    return Promise.resolve(this.xhr(this.endpoints.search, params))

  }

  /**
   * @param {string} id - id of an album spotify
   * @param {Object} [opts] - Options for the find
   * @param {Boolean} [opts.tracks=false] - get only tracks
   * @param {requestCallback} [callback] -The callback that handles the response
   */
  getAlbum (id, opts, callback) {
    let url = `${this.endpoints.albums}/${id}`
    url = opts && opts.tracks ? `${url}/tracks` : url

    if (callback) {
      return Promise
        .resolve(this.xhr(url))
        .asCallback(callback)
    }

    return Promise.resolve(this.xhr(url))
  }

  /**
   * @param {Array} array_ids - ids of albums spotify
   * @param {requestCallback} [callback] -The callback that handles the response
   */
  getAlbums (array_ids, callback) {
    const ids = array_ids.toString()

    if (callback) {
      return Promise
        .resolve(this.xhr(this.endpoints.albums, { ids }))
        .asCallback(callback)
    }

    return Promise.resolve(this.xhr(this.endpoints.albums, { ids }))
  }

  /**
   * @param {string} id - id of an artists spotify
   * @param {Object} [opts] - Options for the find
   * @param {string} [opts.country] - country market
   * @param {Boolean} [opts.albums] - get only albums of artist
   * @param {Boolean} [opts.topTracks] - get only top-tracks of artist
   * @param {Boolean} [opts.relatedArtists] - get only related-artists of artist
   */
  getArtist (id, opts, callback) {
    let url = `${this.endpoints.artists}/${id}`
    const country = opts && opts.country ?  opts.country : 'SE'

    if (opts && opts.albums) url += '/albums'
    else if (opts && opts.topTracks) url += '/top-tracks'
    else if (opts && opts.relatedArtists) url += '/related-artists'

    if (callback) {
      return Promise
        .resolve(this.xhr(this.endpoints.albums, { ids }))
        .asCallback(callback)
    }

    return Promise.resolve(this.xhr(url, { country }))
  }

  /**
   * @param {Array} array_ids - ids of artists spotify
   * @param {requestCallback} [callback] -The callback that handles the response
   */
  getArtists (array_ids, callback) {
    const ids = array_ids.toString()

    if (callback) {
      return Promise
        .resolve(this.xhr(this.endpoints.artists, { ids }))
        .asCallback(callback)
    }

    return Promise.resolve(this.xhr(this.endpoints.artists, { ids }))
  }

  /**
   * @param {string} id - id of a track spotify
   * @param {requestCallback} [callback] -The callback that handles the response
   */
  getTrack (id, callback) {
    const url = `${this.endpoints.tracks}/${id}`

    if (callback) {
      return Promise
        .resolve(this.xhr(url))
        .asCallback(callback)
    }

    return Promise.resolve(this.xhr(url))
  }
  /**
   * @param {Array} array_ids - ids of tracks spotify
   * @param {requestCallback} [callback] -The callback that handles the response
   */
  getTracks (array_ids, callback) {
    const ids = array_ids.toString()

    if (callback) {
      return Promise
        .resolve(this.xhr(this.endpoints.tracks, { ids }))
        .asCallback(callback)
    }

    return Promise.resolve(this.xhr(this.endpoints.tracks, { ids }))
  }

}

module.exports = Client
