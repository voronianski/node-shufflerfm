# <img src="https://d1v2xm8p2pd3wl.cloudfront.net/assets/static/images/shuffler_logo_200.png" width="50" align="left">&nbsp;node-shufflerfm

> [Shuffler.fm](https://shuffler.fm) API client for Node.js

## Install

```javascript
npm install shufflerfm
```

## Usage

http://developers.shuffler.fm/#resources

## Example

```javascript
var ShufflerFM = require('shufflerfm');

var sfm = new ShufflerFM('YOUR APP KEY');

sfm.getGenre('uk+garage', function (err, json, response) {
    if (err) throw err;

    console.dir(json);
});
```

## License
