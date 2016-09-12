'use strict'

const test = require('tape')
const nock = require('nock')
const Spotify = require('../lib/client')

const url = 'https://api.spotify.test'
const client = new Spotify({ url })

test('should get single an album', (t) => {
  const albumId = '6Kssm2LosQ0WyLukFZkEG5'
  const response = { id: albumId, name: 'Demi' }

  t.equals(typeof client.getAlbum, 'function', 'should be a function')

  nock(url).get(`/albums/${albumId}`)
    .reply(200, response)

  client.getAlbum(albumId, { tracks: false }).then((album) => {
    t.equals(typeof album, 'object', 'should be a object')
    t.equals(album.id, albumId, 'should retrive a album id')
    t.end()
  })
})

test('should get album tracks', (t) => {
  const albumId = '6Kssm2LosQ0WyLukFZkEG5'
  const response = { items: [] }

  nock(url).get(`/albums/${albumId}/tracks`)
    .reply(200, response)

  client.getAlbum(albumId, { tracks: true }).then((tracks) => {
    t.ok(Array.isArray(tracks.items), 'should be a Array of tracks')
    t.end()
  })
})

test('should get several albums', (t) => {
  const ids = ['6Kssm2LosQ0WyLukFZkEG5', '56yYgfX6M5FlpETfyZSHkn']
  const response = { albums: [] }

  nock(url).get('/albums')
    .query({ ids: ids.toString() })
    .reply(200, response)

  client.getAlbums(ids.toString()).then((res) => {
    t.ok(Array.isArray(res.albums), 'should be an Array of albums')
    t.end()
  })
})
