'use strict'

const test = require('tape')
const nock = require('nock')
const Spotify = require('../lib/client')

const url = 'https://api.spotify.test'
const client = new Spotify({ url })

test('should search artist, album, track', (t) => {
  const querys = {
    q: 'Demi Lovato',
    limit: 5,
    type: 'artist,album,track'
  }

  const response = { artists: [], albums: [], tracks: [] }

  t.equals(typeof client.search, 'function', 'should be a function')

  nock(url).get('/search')
    .query(querys)
    .reply(200, response)

  client.search(querys).then((res) => {
    t.equals(typeof res, 'object', '[res] should be a object')
    t.ok(Array.isArray(res.artists), '[res.artists] should be an Array')
    t.ok(Array.isArray(res.albums), '[res.albums] should be an Array')
    t.ok(Array.isArray(res.tracks), '[res.tracks] should be an Array')
    t.end()
  })
})

test('should search only artists', (t) => {
  const querys = {
    q: 'Demi Lovato',
    limit: 5,
    type: 'artist'
  }

  const response = { artists: [] }

  nock(url).get('/search')
    .query(querys)
    .reply(200, response)

  client.search(querys).then((res) => {
    t.equals(typeof res, 'object', '[res] should be a obejct')
    t.equals(Object.keys(res).length, 1, 'should have only element')
    t.ok(Array.isArray(res.artists), '[res.artists] should be an Array')
    t.end()
  })
})
