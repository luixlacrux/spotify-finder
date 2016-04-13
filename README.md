# spotify-finder

A Spotify Client for Node.js (non promised)
It allows to use some [Spotify Web API](https://developer.spotify.com/web-api/) endpoints

## Install
```
$ npm install spotify-finder
```
## Usage

``` js
var spotify = require('spotify-finder')
var client = spotify.createClient()
```

Search for all types
```js
client.search('Demi', 'all', function (err, data) {
  // do something with data
})
```

Search for type specific
```js
client.search('Stone Cold', 'track'  function (err, tracks) {
  // do something with tracks
})
```

Get album by id
```js
client.getAlbum('41MnTivkwTO3UUJ8DrqEJJ', { tracks: false }, function (err, album) {
  // do something with album
})
```
Get an album's tracks
```js
client.getAlbum('41MnTivkwTO3UUJ8DrqEJJ', { tracks: true }, function (err, tracks) {
  // do something with tracks
})
```

Get several albums by id
```js
client.getAlbums(['41MnTivkwTO3UUJ8DrqEJJ', '6UXCm6bOO4gFlDQZV5yL37'], function (err, albums) {
  // do something with albums
})
```

Get artist by id
```js
client.getArtist('6S2OmqARrzebs0tKUEyXyp', {}, function (err, artist) {
  // do something with artist
})
```

Get an artist's albums
```js
client.getArtist('6S2OmqARrzebs0tKUEyXyp', { albums: true }, null, function (err, albums) {
  // do something with albums
})
```

Get an artist's top tracks
```js
client.getArtist('6S2OmqARrzebs0tKUEyXyp', { topTracks: true }, null, function (err, tracks) {
  // do something with tracks 
})
```

Get an artist's related artists
```js
client.getArtist('6S2OmqARrzebs0tKUEyXyp', { relatedArtists: true }, null, function (err, artists) {
   //do something with artists
})
```

## License MIT

Copyright (c) 2016 - Luis Lacruz


Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:


The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.


THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
