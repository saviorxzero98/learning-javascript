//====================================================================================================
// Description：Uri.js
//====================================================================================================

var LocalStorageManager = (function () {

    function LocalStorageManager() {
    }

    /**
     * Set Data
     * @param {String} key
     * @param {String} value
     */
    LocalStorageManager.set = function (key, value) {
        window.localStorage.setItem(key, value);
    };

    /**
     * Get Data
     * @param {String} key
     * @param {String} defaultValue
     * @returns {String} 
     */
    LocalStorageManager.get = function (key, defaultValue) {
        return window.localStorage.getItem(key) || defaultValue || "";
    };

    /**
     * Remove Data
     * @param {String} key
     */
    LocalStorageManager.remove = function (key) {
        window.localStorage.removeItem(key);
    };

    /**
     * Clear Data
     */
    LocalStorageManager.clear = function () {
        window.localStorage.clear();
    };

    /**
     * Get Keys
     * @returns {Array} 
     */
    LocalStorageManager.keys = function () {
        return Object.keys(window.localStorage);
    };

    /**
     * Get Count
     * @returns {int} 
     */
    LocalStorageManager.count = function () {
        return window.localStorage.length;
    };

    /**
     * Get Local Storage
     * @returns {Object} 
     */
    LocalStorageManager.storage = function () {
        return window.localStorage;
    };

    return LocalStorageManager;
})();

var SessionStorageManager = (function () {

    function SessionStorageManager() {
    }

    /**
     * Set Data
     * @param {String} key
     * @param {String} value
     */
    SessionStorageManager.set = function (key, value) {
        window.sessionStorage.setItem(key, value);
    };

    /**
     * Get Data
     * @param {String} key
     * @param {String} defaultValue
     * @returns {String} 
     */
    SessionStorageManager.get = function (key, defaultValue) {
        return window.sessionStorage.getItem(key) || defaultValue || "";
    };

    /**
     * Remove Data
     * @param {String} key
     */
    SessionStorageManager.remove = function (key) {
        window.sessionStorage.removeItem(key);
    };

    /**
     * Clear Data
     */
    SessionStorageManager.clear = function () {
        window.sessionStorage.clear();
    };

    /**
     * Get Keys
     * @returns {Array} 
     */
    SessionStorageManager.keys = function () {
        return Object.keys(window.sessionStorage);
    };

    /**
     * Get Count
     * @returns {int} 
     */
    SessionStorageManager.count = function () {
        return window.sessionStorage.length;
    };

    /**
     * Get Local Storage
     * @returns {Object} 
     */
    SessionStorageManager.storage = function () {
        return window.sessionStorage;
    };

    return SessionStorageManager;
})();

var CookieManager = (function () {
    function CookieManager() {
    }

    /**
     * Set Cookie
     * @param {String} key
     * @param {String} value
     * @param {int} expireSec
     * @param {boolean} isHttpsOnly
     * @param {String} path
     * @param {String} domain
     */
    CookieManager.set = function (key, value, expireSec, isHttpsOnly, path, domain) {
        var config = {};

        // Cookie Key-Value
        config[key] = value;

        // Cookie Expires
        if (expireSec) {
            var date = new Date();
            date.setTime(date.getTime() + (expireSec * 1000));
            config["expires"] = date.toGMTString();
        }

        // Cookie Secure、Path、Domain
        if (isHttpsOnly)    config["secure"] = isHttpsOnly;
        if (path)           config["path"] = path;
        if (domain)         config["domain"] = domain;

        document.cookie = CookieManager.toCookieString(config);
    };

    /**
     * Get Cookie
     * @param {String} key
     * @param {String} defaultValue
     * @returns {String} 
     */
    CookieManager.get = function (key, defaultValue) {
        var cookieConfig = CookieManager.toCookie(document.cookie);
        return cookieConfig[key] || defaultValue;
    };

    /**
     * Remove Cookie
     * @param {String} key
     */
    CookieManager.remove = function (key) {
        this.set(key, "", -1);
    };

    /**
     * Clear Cookie
     */
    CookieManager.clear = function () {
        var cookieConfig = CookieManager.toCookie(document.cookie);
        var cookieKeys = Object.keys(cookieConfig);
        for (var i = 0; i < cookieKeys.length; i++) {
            this.remove(cookieKeys[i]);
        }
    };

    /**
     * Cookie Count
     * @returns {int} 
     */
    CookieManager.count = function () {
        var cookieConfig = CookieManager.toCookie(document.cookie);
        var cookieKeys = Object.keys(cookieConfig);
        return cookieKeys.length;
    };

    /**
     * Private Function - Cookie Config To Cookie Config String
     * @param {Object} cookieConfig
     * @returns {String} 
     */
    CookieManager.toCookieString = function (cookieConfig) {
        var keys = Object.keys(cookieConfig);
        var cookieString = "";
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (i != 0) cookieString += ";";
            cookieString += (encodeURI(key) + "=" + encodeURI(cookieConfig[key]));
        }
        return cookieString;
    };

    /**
     * Private Function - Cookie String To Cookie
     * @param {String} cookieString
     * @returns {Object} 
     */
    CookieManager.toCookie = function (cookieString) {
        var cookieConfig = {};
        if (cookieString.indexOf(";") != -1) {
            var configs = cookieString.split(";");
            for (var i = 0; i < configs.length; i++) {
                var pairKeyValue = configs[i].split("=");
                if (pairKeyValue.length == 2) {
                    var key = decodeURI(pairKeyValue[0].trim());
                    var value = decodeURI(pairKeyValue[1] || "");
                    cookieConfig[key] = value;
                }
            }
        }
        return cookieConfig;

    };

    return CookieManager;
})();

var WebSqlConnector = (function () {

    /**
     * Open Web SQL
     * @param {String} dbName
     * @param {String} dbVersion
     * @param {String} dbDesc
     * @param {int} dbSize
     * @param {Function} callback
     */
    function WebSqlConnector(dbName, dbVersion, dbDesc, dbSize, callback) {
        this._db = openDatabase(dbName, dbVersion, dbDesc, dbSize, callback);
    }

    /**
     * Execute Non Query
     * @param {String} sqlStatement
     */
    WebSqlConnector.prototype.ExecuteNonQuery = function (sqlStatement) {
        this._db.transaction(function (tx) {
            if (Array.isArray(sqlStatement)) {
                for (var i = 0; i < sqlStatement.length; i++) {
                    tx.executeSql(sqlStatement[i]);
                }
            }
            else {
                tx.executeSql(sqlStatement);
            }
        });
    };

    /**
     * Execute Query
     * @param {String} sqlStatement
     * @param {Function} callback
     */
    WebSqlConnector.prototype.ExecuteQuery = function (sqlStatement, callback) {
        this._db.transaction(function (tx) {
            tx.executeSql(sqlStatement, callback);
        });
    };

    return WebSqlConnector;
})();