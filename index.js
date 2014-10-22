var querystring = require('querystring');
var request = require('request');

request.defaults({
    json: true,
    headers: {'Content-Type': 'application/json', 'User-Agent': 'node-shufflerfm'}
});

var resources = {
    'activity': '/activities/{id}',
    'artists': '/artists',
    'artist': '/artists/{id}',
    'channel': '/channels/{channel}',
    'charts': '/charts/popular',
    'genres': '/genres',
    'genre': '/genres/{genre}',
    'genre-sites': '/genres/{genre}/sites',
    'sites': '/sites',
    'site': '/sites/{id}',
    'tracks': '/tracks',
    'track': '/tracks/{id}'
};

function Shuffler (appKey, appSecret) {
    if (!appKey || typeof appKey !== 'string') {
        throw new Error('App Key is required - http://developers.shuffler.fm/#app_key');
    }
    if (!appSecret || typeof appSecret !== 'string') {
        throw new Error('App Secret is required - http://developers.shuffler.fm/#app_key');
    }
    this.appKey = appKey;
    this.appSecret = appSecret;
    this.baseUrl = 'https://api.shuffler.fm/v2';
    this.authBaseUrl = 'https://shuffler.fm/authorizations';
}

Shuffler.prototype = {
    getAppKey: function () {
        return this.appKey;
    },

    getAppSecret: function () {
        return this.appSecret;
    },

    getBaseUrl: function () {
        return this.baseUrl;
    },

    getAuthorizationsBaseUrl: function () {
        return this.authUrl;
    },

    createOAuthUrl: function (scope, redir_uri) {
        if (!scope || !scope.length) {
            throw new Error('Define scope for auth - http://developers.shuffler.fm/#authorizations');
        }
        if (!redir_uri || typeof redir_uri !== 'string') {
            throw new Error('Redirect uri is required - http://developers.shuffler.fm/#authorizations');
        }
        scopes = typeof scopes === 'string' ? scopes : scopes.join(',');
        return this.getAuthorizationsBaseUrl() + '?app_key=' + this.getAppKey() + '&scope=' + scope + '&redir_uri=' + redir_uri;
    },

    getAuthToken: function (code, callback) {
        var url = this.getAuthorizationsBaseUrl() + '?app_key=' + this.getAppKey() + '&app_secret=' + this.getAppSecret();
        return request({method: 'POST', url: url, body: {code: code}}, this._parseResponse(callback));
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

    _get: function (url, callback) {
        return request({method: method, url: url}, this._parseResponse(callback));
    },

    _parseResponse: function (callback) {
        return function (err, response, body) {
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
        };
    },

    getActivityById: function (id, callback) {
        var url = this._createUrl('activity', {id: id});
        this._get(url, callback);
    },

    getArtists: function (query, callback) {
        if (typeof query === 'function') {
            callback = query;
            query = false;
        }

        var url = this._createUrl('artists', {}, (query ? {q: query} : {}));
        this._get(url, callback);
    },

    getArtistById: function (id, callback) {
        var url = this._createUrl('artist', {id: id});
        this._get(url, callback);
    },

    getGenres: function (genre, callback) {
        var url = this._createUrl('genres', {genre: genre});
        this._get(url, callback);
    },

    getGenreByName: function (genre, callback) {
        var url = this._createUrl('genre', {genre: genre});
        this._get(url, callback);
    },

    getGenreSites: function (genre, callback) {
        var url = this._createUrl('genre-sites', {genre: genre});
        this._get(url, callback);
    },

    getChartsPopular: function (callback) {
        var url = this._createUrl('charts');
        this._get(url, callback);
    },

    getChannel: function (channel, position, callback) {
        if (typeof position === 'function') {
            callback = position;
            position = false;
        }

        var qs = position ? {position: position} : {};
        var url = this._createUrl('channel', {channel: channel}, qs);
        this._get(url, callback);
    },

    getTracks: function (callback) {
        var url = this._createUrl('tracks');
        this._get(url, callback);
    },

    getTrackById: function (id, callback) {
        var url = this._createUrl('track', {id: id});
        this._get(url, callback);
    },

    getSites: function (query, callback) {
        if (typeof query === 'function') {
            callback = query;
            query = false;
        }

        var url = this._createUrl('sites', {}, (query ? {q: query} : {}));
        this._get(url, callback);
    },

    getSiteById: function (id, callback) {
        var url = this._createUrl('site', {id: id});
        this._get(url, callback);
    },

    getFeaturedSites: function () {
        var url = this._createUrl('sites', {}, {filter: 'featured'});
        this._get(url, callback);
    }
};

module.exports = Shuffler;
