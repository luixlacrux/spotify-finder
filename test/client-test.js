var test = require('tape')
var nock = require('nock')
var spotify = require('../')
var Client = require('../lib/client')

var endpoint = 'https://api.spotify.test'

test('should create a client', function (t) {
  t.ok(spotify.createClient, 'should exist')
  t.equals(typeof spotify.createClient, 'function', 'should be a function')

  var client = spotify.createClient()
  t.ok(client instanceof Client, 'should be instance of Client')
  t.end()
})

test('should fail with unknown endpoint', function (t) {
  var client = spotify.createClient({ endpoint: endpoint })
  nock(endpoint)
    .get('/foo')
    .reply(404)

  client._request('/foo', { q: 'Demi', type: 'artist' }, function (err, body) {
    t.ok(err, 'request failed')
    t.end()
  })
})

test('should search artist, album, track', function (t) {
  var client = spotify.createClient({ endpoint: endpoint })
  t.equals(typeof client.search, 'function', 'should be a function')

  nock(endpoint)
    .get('/search')
    .query({ q: 'Demi Lovato' })
    .query({ limit: 5 })
    .query({ type: 'artist,album,track' })
    .reply(200, [{ artists: 'Demi Lovato' },
                  { albums: 'Demi Lovato' },
                  { tracks: 'Demi Lovato' }])

  client.search('Demi Lovato', 'all', 5, function (err, data) {
    t.error(err, 'should not be an error')
    t.ok(Array.isArray(data), 'should be an Array')
    t.equals(data[0].artists, 'Demi Lovato', 'should retrive a artist name')
    t.equals(data[1].albums, 'Demi Lovato', 'should retrive a albums name')
    t.equals(data[2].tracks, 'Demi Lovato', 'should retrive a tracks name')
    t.end()
  })
})

test('should get single an album', function (t) {
  var id_album = '6Kssm2LosQ0WyLukFZkEG5'
  var client = spotify.createClient({ endpoint: endpoint })
  t.equals(typeof client.getAlbum, 'function', 'should be a function')

  nock(endpoint)
    .get('/albums/' + id_album)
    .reply(200, { id: id_album })

  client.getAlbum(id_album, { tracks: false }, function (err, album) {
    t.error(err, 'should not be an error')
    t.equals(typeof album, 'object', 'should be a single element')
    t.equals(album.id, id_album, 'should retrive a album id')
    t.end()
  })
})

test('should get album tracks', function (t) {
  var id_album = '67sdfahy4dertgd232dttt'
  var client = spotify.createClient({ endpoint: endpoint })
  t.equals(typeof client.getAlbum, 'function', 'should be a function')

  nock(endpoint)
    .get('/albums/' + id_album + '/tracks')
    .reply(200, { items: [] })

  client.getAlbum(id_album, { tracks: true }, function (err, tracks) {
    t.error(err, 'should not be an error')
    t.ok(Array.isArray(tracks.items), 'should be an Array')
    t.end()
  })
})
test('should get several albums', function (t) {
  var ids = ['67sdfahy4dertgd232dttt', '5asw67sad23q2tsdf232']
  var client = spotify.createClient({ endpoint: endpoint })
  t.equals(typeof client.getAlbums, 'function', 'should be a function')

  nock(endpoint)
    .get('/albums')
    .query({ ids: ids.toString() })
    .reply(200, { albums: [] })

  client.getAlbums(ids.toString(), function (err, data) {
    t.error(err, 'should not be an error')
    t.ok(Array.isArray(data.albums), 'should be an Array')
    t.end()
  })
})

test('should get single an artist', function (t) {
  var id_artist = '6S2OmqARrzebs0tKUEyXyp'
  var client = spotify.createClient({ endpoint: endpoint })
  t.equals(typeof client.getArtist, 'function', 'should be a function')

  nock(endpoint)
    .get('/artists/' + id_artist)
    .query({ country: 'SE' })
    .reply(200, { id: id_artist })

  client.getArtist(id_artist, {}, null, function (err, artist) {
    t.error(err, 'should not be an error')
    t.equals(typeof artist, 'object', 'should be a single element')
    t.equals(artist.id, id_artist, 'should retrive a artist id')
    t.end()
  })
})

test('should get an artist albums', function (t) {
  var id_artist = '6S2OmqARrzebs0tKUEyXyp'
  var client = spotify.createClient({ endpoint: endpoint })
  t.equals(typeof client.getArtist, 'function', 'should be a function')

  nock(endpoint)
    .get('/artists/' + id_artist + '/albums')
    .query({ country: 'SE' })
    .reply(200, { items: [] })

  client.getArtist(id_artist, { albums: true }, null, function (err, albums) {
    t.error(err, 'should not be an error')
    t.equals(typeof albums, 'object', 'should be a single element')
    t.ok(Array.isArray(albums.items), 'should be an Array of albums')
    t.end()
  })
})

test('should get an artist top tracks', function (t) {
  var id_artist = '6S2OmqARrzebs0tKUEyXyp'
  var client = spotify.createClient({ endpoint: endpoint })
  t.equals(typeof client.getArtist, 'function', 'should be a function')

  nock(endpoint)
    .get('/artists/' + id_artist + '/top-tracks')
    .query({ country: 'SE' })
    .reply(200, { tracks: [] })

  client.getArtist(id_artist, { topTracks: true }, null, function (err, data) {
    t.error(err, 'should not be an error')
    t.ok(Array.isArray(data.tracks), 'should be an Array of tracks')
    t.end()
  })
})

test('should get an artist related artists', function (t) {
  var id_artist = '6S2OmqARrzebs0tKUEyXyp'
  var client = spotify.createClient({ endpoint: endpoint })
  t.equals(typeof client.getArtist, 'function', 'should be a function')

  nock(endpoint)
    .get('/artists/' + id_artist + '/related-artists')
    .query({ country: 'SE' })
    .reply(200, { artists: [] })

  client.getArtist(id_artist, { relatedArtists: true }, null, function (err, data) {
    t.error(err, 'should not be an error')
    t.ok(Array.isArray(data.artists), 'should be an Array of artists')
    t.end()
  })
})

test('should get several artist', function (t) {
  var ids = ['aweWEqewrw253462sda', 'sdar3tadsgdas4d2fy2']
  var client = spotify.createClient({ endpoint: endpoint })
  t.equals(typeof client.getArtists, 'function', 'should be a function')

  nock(endpoint)
    .get('/artists')
    .query({ ids: ids.toString() })
    .reply(200, { artists: [] })

  client.getArtists(ids.toString(), function (err, data) {
    t.error(err, 'should not be an error')
    t.ok(Array.isArray(data.artists), 'should be an Array of artists')
    t.end()
  })
})

test('should get an track', function (t) {
  var id_track = 'eGsygTp906u18L0Oimnem'
  var client = spotify.createClient({ endpoint: endpoint })
  t.equals(typeof client.getTrack, 'function', 'should be an function')

  nock(endpoint)
    .get('/tracks/' + id_track)
    .reply(200, { id: id_track })

  client.getTrack(id_track, function (err, track) {
    t.error(err, 'should not be an error')
    t.equals(track.id, id_track, 'should retrive a track id')
    t.end()
  })
})

test('should get several tracks', function (t) {
  var ids = ['0eGsygTp906u18L0Oimnem', 'dsadeTd465hfdg45hddsd']
  var client = spotify.createClient({ endpoint: endpoint })
  t.equals(typeof client.getTracks, 'function', 'should be an function')

  nock(endpoint)
    .get('/tracks')
    .query({ ids: ids.toString() })
    .reply(200, { tracks: [] })

  client.getTracks(ids.toString(), function (err, data) {
    t.error(err, 'should not be an error')
    t.ok(Array.isArray(data.tracks), 'should be an Array of tracks')
    t.end()
  })
})
