# <img src="https://dl.dropboxusercontent.com/u/100463011/shuffler-logo.png" width="45" align="left">&nbsp;node-shufflerfm

> [Shuffler.fm](https://shuffler.fm) API client for Node.js and Browserify.

## Install

```javascript
npm install shufflerfm
```

## Example

```javascript
var ShufflerFM = require('shufflerfm');

var sfm = new ShufflerFM('YOUR APP KEY', 'YOUR APP SECRET');

sfm.getGenre('uk+garage', function (err, data, response) {
    if (err) throw err;

    // do something with data
    console.dir(data);
});
```

## API

### `new ShufflerFM('APP_KEY', 'APP SECRET')`

Create an instance of a client. `'APP_KEY'` and `'APP SECRET'` are mandatory - http://developers.shuffler.fm/#app_key.

Returns a bunch of self-descripting methods. Details about every Shuffler.fm API resource is available here - http://developers.shuffler.fm/#resources.

#### Activities

http://developers.shuffler.fm/#activities

##### `getActivityById(id, callback)`

#### Artists

http://developers.shuffler.fm/#artists

##### `getArtists([query], callback)`
##### `getArtistById(id, callback)`

#### Authorizations

http://developers.shuffler.fm/#authorizations

##### `createOAuthUrl(scope, redirect_uri)`

- `scope` {String|Array} - required and should be at least one of the following: `users.r, users.favorites.r, users.favorites.m, users.subscriptions.r, users.subscriptions.m`
- `redirect_uri` {String} - required and should be under the same domain as the one in your app's settings (http://shuffler.fm/developers/apps)

Returns an uri string  (e.g. `https://shuffler.fm/authorizations/auth?app_key=YOUR-APP-KEY&scope=users.r&redir_uri=http%3A%2F%2Fmyurl.net`) that should be opened in browser.

```javascript
var ShufflerFM = require('shufflerfm');

var sfm = new ShufflerFM('YOUR APP KEY', 'YOUR APP SECRET');
var oauthUrl = sfm.createOAuthUrl(['users.r', 'users.favorites.r'], 'http://myurl.net');

console.log(oauthUrl);
// -> https://shuffler.fm/authorizations/auth?app_key=YOUR-APP-KEY&scope=users.r,users.favorites.r&redir_uri=http%3A%2F%2Fmyurl.net`
// open in browser to follow a three-legged OAuth 2.0 flow
// this will return you `code` that you will need later
```

##### `getAuthToken(code, callback)`

- `code` {String} - required, it's received as query param in redirect uri (after user follows the OAuth uri and grants access to your application)

Returns object with `access_token` and `userId` as second argument in `callback` function.

#### Charts

http://developers.shuffler.fm/#charts

##### `getChartsPopular(callback)`

#### Channels

http://developers.shuffler.fm/#channels

##### `getChannel(channel, [position], callback)`

#### Genres

http://developers.shuffler.fm/#genres

##### `getGenres(callback)`
##### `getGenreByName(genre, callback)`
##### `getGenreSites(genre, callback)`

#### Sites

http://developers.shuffler.fm/#sites

##### `getSites([query], callback)`
##### `getSiteById(id, callback)`
##### `getFeaturedSites(callback)`

#### Tracks

http://developers.shuffler.fm/#tracks

##### `getTracks(callback)`
##### `getTrackById(id, callback)`

## To Do

Implement API resources that need OAuth - http://developers.shuffler.fm/#authorizations, e.g.:

- [x] Authorizations
- [ ] Subscribtions
- [ ] Users

## License

MIT Licensed

Copyright (c) 2014-2015 Dmitri Voronianski [dmitri.voronianski@gmail.com](mailto:dmitri.voronianski@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
