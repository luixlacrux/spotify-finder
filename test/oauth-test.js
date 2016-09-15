'use strict'

const test = require('tape')
const nock = require('nock')
const Spotify = require('../lib/client')

const config = {
  auth: 'https://accounts.spotify.test/api/token',
  consumer: {
    key: 'NgA6ZcYIixn8bUQ',
    secret: 'ixn8bUQNgA6ZcYI'
  }
}

const encode = new Buffer(`${config.consumer.key}:${config.consumer.secret}`).toString('base64')
const headers = { 'Authorization': `Basic ${encode}` }
const response = { access_token: 'xxx-xxxx-xxx' }

const client = new Spotify(config)

const clientBad = new Spotify({ auth: 'https://accounts.spotify.test/api/token' })

test('should return an access token', (t) => {
  nock(config.auth, { reqheaders: headers })
    .post('')
    .reply(200, response)

  client.getToken().then((token) => {
    t.equals(typeof token, 'string', 'should be a string')
    t.end()
  })
})

test('should fail without client credentials', (t) => {
  nock(config.auth, { reqheaders: headers })
    .post('/')
    .reply(200, response)

  clientBad.getToken().catch((err) => {
    t.equals(err, 'Client credentials are not provided', 'should return a error')
    t.end()
  })
})
