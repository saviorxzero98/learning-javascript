//====================================================================================================
// Description：HTTP.js
//====================================================================================================

var Uri = (function () {
	/**
	 * @class
	 * @param {String} url
	 */
    function Uri(url) {
		this._link = document.createElement('a');
		this._link.setAttribute('href', url || window.location);
	}

    /**
     * GET/SET Href
     * @param {String} href
     * @returns {String} 
     */
    Uri.prototype.href = function (href) {
        this._link.href = href || this._link.href;
        return this._link.href;
    };

    /**
     * GET/SET Protocol
     * @param {String} protocol     - "http:"??https:"
     * @returns {String} 
     */
    Uri.prototype.protocol = function (protocol) {
        this._link.protocol = protocol || this._link.protocol;
        return this._link.protocol;
	};

    /**
     * GET/SET Host
     * @param {String} host         - "example.com:8080"
     * @returns {String} 
     */
    Uri.prototype.host = function (host) {
        this._link.host = host || this._link.host;
        return this._link.host;
    };

    /**
     *  GET/SET Host Name
     * @param {String} hostname     - "example.com"
     * @returns {String} 
     */
    Uri.prototype.hostname = function (hostname) {
        this._link.hostname = hostname || this._link.hostname;
        return this._link.hostname;
    };

    /**
     * GET/SET Post
     * @param {String} port         - "80"??443"??8080"
     * @returns {String} 
     */
    Uri.prototype.port = function (port) {
        this._link.port = port || this._link.port;
        return this._link.port;
	};

    /**
     * GET/SET Path
     * @param {String} path         - "/pathname/"
     * @returns {String} 
     */
    Uri.prototype.path = function (path) {
        this._link.pathname = path || this._link.pathname;
        return this._link.pathname;
	};

    /**
     * GET/SET Query
     * @param {String} search       - "?search=test"
     * @returns {String} 
     */
    Uri.prototype.query = function (query) {
        this._link.search = query || this._link.search;
        return this._link.search;
	};

    /**
     * GET/SET Hash
     * @param {String} hash         - "#hash"
     * @returns {String} 
     */
    Uri.prototype.hash = function (hash) {
        this._link.hash = hash || this._link.hash;
        return this._link.hash;
    };

    /**
     * Get Query Parameters
     * @returns {Object} 
     */
    Uri.prototype.getParams = function () {
         return Uri.parserQueryParams(this.query());
    };

    /**
     * SET Query Parameter
     * @param {String} key
     * @param {String} value
     */
    Uri.prototype.setParam = function (key, value) {
        var params = this.getParams();
        params[key] = value;

        var paramKeys = Object.keys(params);
        var query = "";
        for (var i = 0; i < paramKeys.length; i++) {
            var paramKey = paramKeys[i];
            if (i == 0) {
                query += "?" + paramKey + "=" + params[paramKey];
            }
            else {
                query += "&" + paramKey + "=" + params[paramKey];
            }
        }
        this._link.search = query;
    };

    /**
     * SET Query Parameters
     * @param {Object} params
     */
    Uri.prototype.setParams = function (params) {
        if (typeof params != 'object') {
            return;
        }           

        var paramKeys = Object.keys(params);

        for (var i = 0; i < paramKeys.length; i++) {
            var paramKey = paramKeys[i];
            this.setParam(paramKey, params[paramKey]);
        }
    };

    /**
     * Get Url Href String
     * @returns {String} 
     */
    Uri.prototype.toString = function () {
        return this.href();
    };

    //#region Static Method

    /**
 * Parser Query Parameter
 * @param {String} searchUrl
 * @returns {Object} 
 */
    Uri.parserQueryParams = function (searchUrl) {
        var query = searchUrl || window.location.search;
        var dictionary = {};
        if (query.indexOf("?") != -1) {
            var search = query.split("?");
            var parameter = search[1].split("&");

            for (var i = 0; i < parameter.length; i++) {
                var pairKeyValue = parameter[i].split("=");
                dictionary[pairKeyValue[0]] = Uri.decodeURIComponent(pairKeyValue[1]);
            }
        }
        return dictionary;
    };

    /**
     * Encode URI
     * @param {String} url
     * @returns {String}
     */
    Uri.encodeURI = function (url) {
        return encodeURI(url);
    };

    /**
     * Encode URI Component
     * @param {String} url
     * @returns {String}
     */
    Uri.encodeURIComponent = function (url) {
        return encodeURIComponent(url);
    };

    /**
     * Encode URI Special Chars
     * @param {String} Text
     * @returns {String}
     */
    Uri.encodeURISpecialChars = function (url) {
        var ajaxSpecialCharsRegEx = /[+&?=#;:,$@/]/gm;
        return url.replace(ajaxSpecialCharsRegEx, function (match) {
            var ajaxSpecialCharsPlaceHolders = {
                '+': '%2B',
                '&': '%26',
                '?': '%3F',
                '=': "%3D",
                '#': "%23",
                ';': "%3B",
                ':': "%3A",
                ',': "%2C",
                '$': "%24",
                '@': "%40",
                '/': "%2F"
            };
            return ajaxSpecialCharsPlaceHolders[match];
        });
    };

    /**
     * Decode URI
     * @param {String} url
     * @returns {String}
     */
    Uri.decodeURI = function (url) {
        return decodeURI(url);
    };

    /**
     * Decode URI Component
     * @param {String} url
     * @returns {String}
     */
    Uri.decodeURIComponent = function (url) {
        return decodeURIComponent(url);
    };

    //#endregion Static Method

    return Uri;
})();


var HttpClient = (function () {
    function HttpClient() {
    }

    /**
     * Send Request
     * @param {Object} request  - {url, query, data, dataType [Json, FormData], headers, success, fail}
     * @returns {String} 
     */
    HttpClient.prototype.sendRequest = function (type, request) {
        // Check Request Data
        if (request == undefined || type == undefined || request.url == undefined) {
            console.error("No Request Data");
            return;
        };

        // Get XMLHttpRequest
        var xmlHttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

        // Add Type, Url, Async
        xmlHttp.open(type, this._setUrl(request.url, request.query), false);

        // Add Header
        xmlHttp = this._setHeaders(xmlHttp, request.headers, request.dataType);

        // Send Data
        xmlHttp = this._sendData(xmlHttp, request.data, request.dataType);

        // Invoke Callback
        this._invokeCallback(xmlHttp, request.success, request.fail);
        return xmlHttp.responseText;
    };

    /**
     * Send Request Async
     * @param {Object} request  - {url, query, data, dataType [Json, FormData], headers, success, fail}
     */
    HttpClient.prototype.sendRequestAsync = function (type, request) {
        // Check Request Data
        if (request == undefined || type == undefined || request.url == undefined) {
            console.error("No Request Data");
            return;
        };

        // Get XMLHttpRequest
        var xmlHttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

        // Add Callback
        var self = this;
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
                self._invokeCallback(xmlHttp, request.success, request.fail);
            }
        }

        // Add Type, Url, Async
        xmlHttp.open(type, this._setUrl(request.url, request.query), true);

        // Add Header
        xmlHttp = this._setHeaders(xmlHttp, request.headers, request.dataType);

        // Send Data
        xmlHttp = this._sendData(xmlHttp, request.data, request.dataType);
    };

    //#region Private Function

    /**
 * Create Url
 * @private
 * @param {String} url
 * @param {Object} query
 * @returns {String} 
 */
    HttpClient.prototype._setUrl = function (url, query) {
        var uri = new Uri(url);
        if (query && query) {
            uri.setParams(query);
        }
        return uri.toString();
    };

    /**
     * Add Headers
     * @private
     * @param {XMLHttpRequest} xmlhttp
     * @param {Object} headers
     * @param {String} dataType
     * @returns {XMLHttpRequest} 
     */
    HttpClient.prototype._setHeaders = function (xmlHttp, headers, dataType) {
        if (dataType != undefined) {
            switch (dataType.toUpperCase()) {
                case "JSON":
                    xmlHttp.setRequestHeader("Content-Type", "application/json");
                    break;
                case "FORMDATA":
                    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    break;
            }
        }
        if (headers && typeof headers === 'object') {
            var keys = Object.keys(headers);
            keys.forEach(function (key, index) {
                xmlHttp.setRequestHeader(key, headers[key]);
            })
        }
        return xmlHttp;
    };

    /**
     * 
     * @param {XMLHttpRequest} xmlhttp
     * @param {Object} data
     * @param {String} dataType
     * @returns {XMLHttpRequest} 
     */
    HttpClient.prototype._sendData = function (xmlHttp, data, dataType) {
        if (dataType == undefined) {
            xmlHttp.send(data);
            return xmlHttp;
        }

        var body = data;
        switch (dataType.toUpperCase()) {
            case "JSON":
                if (typeof data == 'object' || Array.isArray(data)) {
                    body = JSON.stringify(data);
                }
                break;
            case "FORMDATA":
                var formData = new Uri("");
                formData.setParams(data);
                body = formData.query().replace("?", "");
                break;
        }
        xmlHttp.send(body);
        return xmlHttp;
    };

    /**
     * 
     * @param {XMLHttpRequest} xmlhttp
     * @param {Function} success
     * @param {Function} fail
     */
    HttpClient.prototype._invokeCallback = function (xmlHttp, success, fail) {
        if (success && xmlHttp.status >= 200 && xmlHttp.status < 300) {
            success(xmlHttp.responseText, xmlHttp.status, xmlHttp.statusText);
        }
        else if (fail && (xmlHttp.status < 200 || xmlHttp.status >= 300)) {
            fail(xmlHttp.responseText, xmlHttp.status, xmlHttp.statusText);
        }
    };

    //#endregion Private Function

    //#region Static Function

    /**
     * Static Function - HTTP Send
     * @param {String} type
     * @param {Object} request
     * @param {bool} isAsync
     * @returns {Object} 
     */
    HttpClient.send = function (type, request, isAsync) {
        var client = new HttpClient();
        if (isAsync) {
            client.sendRequestAsync(type, request);
            return "";
        }
        else {
            return client.sendRequest(type, request);
        }
    };

    /**
     * HTTP GET
     * @param {Object} request
     * @param {bool} isAsync
     * @returns {Object} 
     */
    HttpClient.get = function (request, isAsync) {
        return HttpClient.send("GET", request, isAsync);
    };

    /**
     * HTTP POST
     * @param {Object} request
     * @param {bool} isAsync
     * @returns {Object} 
     */
    HttpClient.post = function (request, isAsync) {
        return HttpClient.send("Post", request, isAsync);
    };

    /**
     * HTTP PUT
     * @param {Object} request
     * @param {bool} isAsync
     * @returns {Object} 
     */
    HttpClient.put = function (request, isAsync) {
        return HttpClient.send("PUT", request, isAsync);
    };

    /**
     * HTTP PATCH
     * @param {Object} request
     * @param {bool} isAsync
     * @returns {Object} 
     */
    HttpClient.patch = function (request, isAsync) {
        return HttpClient.send("PATCH", request, isAsync);
    };

    /**
     * HTTP DELETE
     * @param {Object} request
     * @param {bool} isAsync
     * @returns {Object} 
     */
    HttpClient.delete = function (request, isAsync) {
        return HttpClient.send("DELETE", request, isAsync);
    };

    //#endregion Static Function

    return HttpClient;
})();