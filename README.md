# <img src="https://d1v2xm8p2pd3wl.cloudfront.net/assets/static/images/shuffler_logo_200.png" width="45" align="left">&nbsp;node-shufflerfm

> [Shuffler.fm](https://shuffler.fm) API client for Node.js

## Install

```javascript
npm install shufflerfm
```

## API

### `new ShufflerFM('APP_KEY')`

Create an instance of a client. `'APP_KEY'` is mandatory - http://developers.shuffler.fm/#app_key.

Returns a bunch of self-descripting methods. Every `callback` function has three arguments: `(error, parsedJSON, originalResponse)`. Details about every Shuffler.fm API resource is available here - http://developers.shuffler.fm/#resources.

##### `getActivityById(id, callback)`

##### `getArtists([query], callback)`
##### `getArtistById(id, callback)`

##### `getChartsPopular(callback)`

##### `getChannel(channel, [position], callback)`

##### `getGenres(callback)`
##### `getGenreByName(genre, callback)`
##### `getGenreSites(genre, callback)`

##### `getSites([query], callback)`
##### `getSiteById(id, callback)`
##### `getFeaturedSites(callback)`

##### `getTracks(callback)`
##### `getTrackById(id, callback)`

## Example

```javascript
var ShufflerFM = require('shufflerfm');

var sfm = new ShufflerFM('YOUR APP KEY');

sfm.getGenre('uk+garage', function (err, data, response) {
    if (err) throw err;

    // do something with data
    console.dir(data);
});
```

## To Do

Implement API resources that need OAuth - http://developers.shuffler.fm/#authorizations, e.g.:

- [x] Authorizations
- [ ] Subscribtions
- [ ] Users

## License

MIT Licensed

Copyright (c) 2014 Dmitri Voronianski [dmitri.voronianski@gmail.com](mailto:dmitri.voronianski@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
