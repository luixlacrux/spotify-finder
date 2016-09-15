'use strict'

const test = require('tape')
const nock = require('nock')
const Spotify = require('../lib/client')

const config = {
  url: 'https://api.spotify.test',
  auth: 'https://accounts.spotify.test/api/token',
  consumer: {
    key: 'NgA6ZcYIixn8bUQ',
    secret: 'ixn8bUQNgA6ZcYI'
  }
}
const client = new Spotify(config)
const token = 'xxx-xxxx-xxx'
const headers = { 'Authorization': `Bearer ${token}` }

test('should get new releases', (t) => {
  const opts = { to: 'new-releases', country: 'SE' }
  const response = { albums: [] }

  nock(config.url, { reqheaders: headers })
    .get('/browse/new-releases')
    .query({ country: 'SE' })
    .reply(200, response)

  client.browse(opts).then((res) => {
    t.equals(typeof res, 'object', 'should be a object')
    t.ok(Array.isArray(res.albums), 'should be an Array of albums')
    t.end()
  })
})

test('should get featured playlists', (t) => {
  const opts = { to: 'featured-playlists', country: 'SE' }
  const response = { playlists: [] }

  nock(config.url, { reqheaders: headers })
    .get('/browse/featured-playlists')
    .query({ country: 'SE' })
    .reply(200, response)

  client.browse(opts).then((res) => {
    t.equals(typeof res, 'object', 'should be a object')
    t.ok(Array.isArray(res.playlists), 'should be an Array of playlists')
    t.end()
  })
})

test('should get categories', (t) => {
  const opts = { to: 'categories', country: 'SE' }
  const response = { categories: [] }

  nock(config.url, { reqheaders: headers })
    .get('/browse/categories')
    .query({ country: 'SE' })
    .reply(200, response)

  client.browse(opts).then((res) => {
    t.equals(typeof res, 'object', 'should be a object')
    t.ok(Array.isArray(res.categories), 'should be an Array of categories')
    t.end()
  })
})
