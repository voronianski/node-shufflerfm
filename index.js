var querystring = require('querystring');
var request = require('request');

request.defaults({
    json: true,
    headers: {'Content-Type': 'application/json', 'User-Agent': 'node-shufflerfm'}
});

var resources = {
    'artists': '/artists',
    'artist': '/artists/{id}',
    'channel': '/channels/{channel}',
    'charts': '/charts/popular',
    'genres': '/genres',
    'genre': '/genres/{genre}',
    'sites': '/sites',
    'site': '/sites/{id}',
    'tracks': '/tracks',
    'track': '/tracks/{id}'
};

function Shuffler (appKey) {
    if (!appKey || typeof appKey !== 'string') {
        throw new Error('AppKey string is required - http://developers.shuffler.fm/#app_key');
    }
    this.appKey = appKey;
    this.baseUrl = 'https://api.shuffler.fm/v2';
}

Shuffler.prototype = {
    getAppKey: function () {
        return this.appKey;
    },

    getBaseUrl: function () {
        return this.baseUrl;
    },

    _createUrl: function (alias, params, qs) {
        if (!resources[alias]) {
            throw new Error('"' + alias + '" is not available - http://developers.shuffler.fm/#resources');
        }
        params = params || {};
        qs = qs || {};

        var url = resources[alias];
        Object.keys(params).forEach(function (key) {
            var param = key && params[key];
            if (!key) {
                return;
            }
            url = url.replace(new RegExp('\\{'+key+'\\}', 'g'), param);
        });

        qs = querystring.stringify(qs);
        return this.getBaseUrl() + url + '?app-key=' + this.getAppKey() + (qs ? '&'+qs : '');
    },

    _request: function (method, url, callback) {
        return request({method: method, url: url}, function (err, response, body) {
            if (err) {
                return callback(err);
            }

            var parsed;
            try {
                parsed = JSON.parse(body);
            } catch (e) {
                err = new Error('Parsing error: ' + e.message);
                return callback(err);
            }

            return callback(null, parsed, response);
        });
    },

    getArtists: function (query, callback) {
        if (typeof query === 'function') {
            callback = query;
            query = false;
        }

        var url = this._createUrl('artists', {}, (query ? {q: query} : {}));
        this._request('GET', url, callback);
    },

    getArtistById: function (id, callback) {
        var url = this._createUrl('artist', {id: id});
        this._request('GET', url, callback);
    },

    getGenre: function (genre, callback) {
        var url = this._createUrl('genre', {genre: genre});
        this._request('GET', url, callback);
    },

    getPopularCharts: function (callback) {
        var url = this._createUrl('charts');
        this._request('GET', url, callback);
    },

    getChannel: function (channel, position, callback) {
        if (typeof position === 'function') {
            callback = position;
            position = false;
        }

        var qs = position ? {position: position} : {};
        var url = this._createUrl('channel', {channel: channel}, qs);
        this._request('GET', url, callback);
    },

    getTracks: function (callback) {
        var url = this._createUrl('tracks');
        this._request('GET', url, callback);
    },

    getTrackById: function (id, callback) {
        var url = this._createUrl('track', {id: id});
        this._request('GET', url, callback);
    },

    getSites: function (query, callback) {
        if (typeof query === 'function') {
            callback = query;
            query = false;
        }

        var url = this._createUrl('sites', {}, (query ? {q: query} : {}));
        this._request('GET', url, callback);
    },

    getSiteById: function (id, callback) {
        var url = this._createUrl('site', {id: id});
        this._request('GET', url, callback);
    },

    getFeaturedSites: function () {
        var url = this._createUrl('sites', {}, {filter: 'featured'});
        this._request('GET', url, callback);
    }
};

module.exports = Shuffler;
