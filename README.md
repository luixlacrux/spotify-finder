# spotify-finder
[![Build Status](https://travis-ci.org/luixlacrux/spotify-finder.svg?branch=es6)](https://travis-ci.org/luixlacrux/spotify-finder) [![Coverage Status](https://coveralls.io/repos/github/luixlacrux/spotify-finder/badge.svg?branch=es6)](https://coveralls.io/github/luixlacrux/spotify-finder?branch=es6)
---
A isomorphic Spotify client, that use the [Client Credentials](https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow) authorization flow. It allows to use some [Spotify Web API](https://developer.spotify.com/web-api/) endpoints.

## Install
```
$ npm install spotify-finder
```
## Usage

```js
import Spotify from 'spotify-finder'
const client = new Spotify({
  consumer: {
    key: 'YOUR_CLIENT_ID', // if your not have an app in spotify ignore this options
    secret: 'YOUR_CLIENT_SECRET' // if your not have an app in spotify ignore this options
  }
})
```
Note: if you do not Provide the client credentials, some features that require authentication will not be available.
To create an application in Spotify. [click here](https://developer.spotify.com/my-applications/#!/)

#### Search for all types
```js
const params = {
  q: 'Demi', // required
}
client.search(params)
  .then(data => {
    // do something with data
  })
```
#### Search for type specific with limit
```js
const params = {
  q: 'Stone Cold', // required
  type: 'artist', // optional for default 'artist,album,track'
  limit: 5 // optional for default 20
}
client.search(params)
  .then(data => {
    // do something with data
  })
```

#### Get a List of New Releases
```js
const params = {
  to: 'new-releases', // required
  limit: 10, // optional for default 20
  offset: 5 // optional for default 0
}
client.browse(params)
  .then(albums => {
    // do something with album's
  })
```
#### Get a List of Featured Playlists
```js
client.browse({ to: 'featured-playlists' })
  .then(playlists => {
    // do something with playlist's
  })
```
#### Get a List of Categories
```js
client.browse({ to: 'categories' })
  .then(categories => {
    // do something with categories
  })
```
#### Get a Category by id
```js
client.getCategory('toptrack')
  .then(category => {
    // do something with category
  })
```
#### Get a Category’s Playlists
```js
const params = {
  playlists: true, // required
  limit: 10, // optional for default 20
  offset: 5, // optional for default 0
  country: 'BR' // optional for default 'SE'
}
client.getCategory('toptrack', params)
  .then(playlists => {
    // do something with playlists
  })
```
#### Get album by id
```js
client.getAlbum('41MnTivkwTO3UUJ8DrqEJJ', { tracks: false })
  .then(album => {
    // do something with album
  })
```
#### Get an album's tracks
```js
client.getAlbum('41MnTivkwTO3UUJ8DrqEJJ', { tracks: true })
  .then(tracks => {
    // do something with tracks
  })
```

#### Get several albums by id
```js
const ids = ['41MnTivkwTO3UUJ8DrqEJJ', '6UXCm6bOO4gFlDQZV5yL37']
client.getAlbums(ids)
  .then(albums => {
    // do something with albums
  })
```

#### Get artist by id
```js
client.getArtist('6S2OmqARrzebs0tKUEyXyp')
  .then(artist => {
    // do something with artist
  })
```

#### Get an artist's albums
```js
const params = {
  albums: true, // required
  album_type: 'album,single', // optional for default all types
  limit: 10, // optional for default 20
  offset: 5 // optional for default 0
}
client.getArtist('6S2OmqARrzebs0tKUEyXyp', params)
  .then(albums => {
    // do something with albums
  })
```

#### Get an artist's top tracks
```js
client.getArtist('6S2OmqARrzebs0tKUEyXyp', { topTracks: true })
  .then(tracks => {
    // do something with tracks
  })
```

#### Get an artist's related artists
```js
client.getArtist('6S2OmqARrzebs0tKUEyXyp', { relatedArtists: true })
  .then(artists => {
     //do something with artists
  })
```

#### Get several artists by id
```js
const ids = ['15deb326635d69d0505434', '934da7155ec15deb32663'],
client.getArtists(ids)
  .then(artists => {
    //do something with artists
  })
```

#### Get an track by id
```js
client.getTrack('934da7155ec15deb32663')
  .then(track => {
    //do something with track
  })
```

#### Get several tracks by id
```js
const ids = ['15deb326635d69d0505s', 'da7155ec15deb326635d69d']
client.getTracks(ids)
  .then(tracks => {
    //do something with tracks
  })
```
