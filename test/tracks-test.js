'use strict'

const test = require('tape')
const nock = require('nock')
const Spotify = require('../lib/client')

const url = 'https://api.spotify.test'
const client = new Spotify({ url })

test('should get an track', (t) => {
  const trackId = 'eGsygTp906u18L0Oimnem'
  const response = { id: trackId }

  nock(url).get(`/tracks/${trackId}`)
    .reply(200, response)

  client.getTrack(trackId).then((track) => {
    t.equals(track.id, trackId, 'should retrive a track id')
    t.end()
  })
})

test('should get several tracks', (t) => {
  const ids = ['eGsygTp906u18L0Oimnem', 'dsadeTd465hfdg45hddsd']
  const response = { items: [] }

  nock(url).get('/tracks')
    .query({ ids: ids.toString() })
    .reply(200, response)

  client.getTracks(ids.toString()).then((tracks) => {
    t.ok(Array.isArray(tracks.items), 'should be an Array of tracks')
    t.end()
  })
})
