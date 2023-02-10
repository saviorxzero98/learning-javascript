
// URI處理
class Uri {
    private _link: HTMLAnchorElement;

    /**
	 * @class
	 * @param {string} url
	 */
    constructor(url: string) {
        this._link = document.createElement('a');
        this._link.href = url || window.location.href;
    }

    /**
     * GET/SET Href
     * @param {string} href
     * @returns {string} 
     */
    public href(href?: string): string {
        this._link.href = href || this._link.href;
        return this._link.href;
    }

    /**
     * GET/SET Protocol
     * @param {string} protocol     - "http:", "https:"
     * @returns {string} 
     */
    public protocol(protocol?: string): string {
        this._link.protocol = protocol || this._link.protocol;
        return this._link.protocol;
    }

    /**
     * GET/SET Host
     * @param {string} host         - "example.com:8080"
     * @returns {string} 
     */
    public host(host?: string): string {
        this._link.host = host || this._link.host;
        return this._link.host;
    }

    /**
     * GET/SET Host Name
     * @param {string} hostname     - "example.com"
     * @returns {string} 
     */
    public hostname(hostname?: string): string {
        this._link.hostname = hostname || this._link.hostname;
        return this._link.hostname;
    }

    /**
     * GET/SET Post
     * @param {string} port         - "80"、"443"、"8080"
     * @returns {string} 
     */
    public port(port?: string): string {
        this._link.port = port || this._link.port;
        return this._link.port;
    }

    /**
     * GET/SET Path
     * @param {string} path     - "/pathname/"
     * @returns {string} 
     */
    public path(path?: string): string {
        this._link.pathname = path || this._link.pathname;
        return this._link.pathname;
    }

    /**
     * GET/SET Query
     * @param {string} search   - "?search=test"
     * @returns {string} 
     */
    public query(query?: string): string {
        this._link.search = query || this._link.search;
        return this._link.search;
    }

    /**
     * GET/SET Hash
     * @param {string} hash     - "#hash"
     * @returns {string} 
     */
    public hash(hash?: string): string {
        this._link.hash = hash || this._link.hash;
        return this._link.hash;
    }

    /**
     * Get Query Parameters
     * @returns {any} 
     */
    public getParams(): any {
        return Uri.parseQueryParams(this.query());
    }

    /**
     * SET Query Parameter
     * @param {string} key
     * @param {string} value
     */
    public setParam(key: string, value: string) {
        let params = this.getParams();
        params[key] = value;

        let paramKeys = Object.keys(params);
        let query = '';
        for (var i = 0; i < paramKeys.length; i++) {
            let paramKey = paramKeys[i];
            if (i == 0) {
                query += `?${paramKey}=${params[paramKey]}`;
            }
            else {
                query += `&${paramKey}=${params[paramKey]}`;
            }
        }
        this._link.search = query;
    }

    /**
     * SET Query Parameters
     * @param {any} params
	 */
    public setParams(params: any) {
        let paramKeys = Object.keys(params);
        for (var i = 0; i < paramKeys.length; i++) {
            let paramKey = paramKeys[i];
            this.setParam(paramKey, params[paramKey]);
        }
    }

    /**
     * Get Url Href String
     * @returns {string} 
     */
    public toString(): string {
        return this.href();
    }

    /**
     * Parser Query Parameter
     * @param {string} query
     * @returns {any} 
     */
    public static parseQueryParams(query: string = window.location.search): any {
        let dictionary = {};
        if (query.indexOf('?') != -1) {
            let search = query.split('?');
            let parameter = search[1].split('&');

            for (var i = 0; i < parameter.length; i++) {
                let pairKeyValue = parameter[i].split('=');
                dictionary[pairKeyValue[0]] = Uri.decodeURI(pairKeyValue[1]);
            }
        }
        return dictionary;
    }

    /**
     * Encode URI
     * @param {string} url
     * @returns {string}
     */
    public static encodeURI(url: string): string {
        return encodeURI(url);
    }

    /**
     * Encode URI Component
     * @param {string} url
     * @returns {string}
     */
    public static encodeURIComponent(url: string): string {
        return encodeURIComponent(url);
    }

    /**
     * Encode URI Special Chars
     * @param {string} url
     * @returns {string}
     */
    public static encodeURISpecialChars(url: string): string {
        let ajaxSpecialCharsRegEx = /[+&?=#;:,$@/]/gm;
        return url.replace(ajaxSpecialCharsRegEx, (match) => {
            let ajaxSpecialCharsPlaceHolders = {
                '+': '%2B',
                '&': '%26',
                '?': '%3F',
                '=': '%3D',
                '#': '%23',
                ';': '%3B',
                ':': '%3A',
                ',': '%2C',
                '$': '%24',
                '@': '%40',
                '/': '%2F'
            };
            return ajaxSpecialCharsPlaceHolders[match];
        });
    }

    /**
     * Decode URI
     * @param {string} url
     * @returns {string}
     */
    public static decodeURI(url: string): string {
        return decodeURI(url);
    }

    /**
     * Decode URI Component
     * @param {string} url
     * @returns {string}
     */
    public static decodeURIComponent(url: string): string {
        return decodeURIComponent(url);
    }
}

// Local Storage管理
class LocalStorageManager {
    /**
     * Set Data
     * @param {string} key
     * @param {string} value
     */
    public static set(key: string, value: string) {
        window.localStorage.setItem(key, value);
    }

    /**
     * Get Data
     * @param {string} key
     * @param {string} defaultValue
     * @returns {string}
     */
    public static get(key: string, defaultValue: string): string {
        return window.localStorage.getItem(key) || defaultValue || '';
    }

    /**
     * Remove Data
     * @param {string} key
     */
    public static remove(key: string) {
        window.localStorage.removeItem(key);
    }

    /**
     * Clear Data
     */
    public static clear() {
        window.localStorage.clear();
    }

     /**
     * Get Keys
     * @returns {string[]}
     */
    public static getKeys(): string[] {
        return Object.keys(window.localStorage);
    }

     /**
     * Get Count
     * @returns {number} 
     */
    public static count(): number {
        return window.localStorage.length;
    }

    /**
     * Get Local Storage
     * @returns {Storage}
     */
    public static getStorage(): Storage {
        return window.localStorage;
    }
}

// Local Storage管理
class SessionStorageManager {
    /**
     * Set Data
     * @param {string} key
     * @param {string} value
     */
    public static set(key: string, value: string) {
        window.sessionStorage.setItem(key, value);
    }

    /**
     * Get Data
     * @param {string} key
     * @param {string} defaultValue
     * @returns {string}
     */
    public static get(key: string, defaultValue: string) {
        return window.sessionStorage.getItem(key) || defaultValue || '';
    }

    /**
     * Remove Data
     * @param {string} key
     */
    public static remove(key: string) {
        window.sessionStorage.removeItem(key);
    }

    /**
     * Clear Data
     */
    public static clear() {
        window.sessionStorage.clear();
    }

     /**
     * Get Keys
     * @returns {string[]}
     */
    public static getKeys(): string[] {
        return Object.keys(window.sessionStorage);
    }

     /**
     * Get Count
     * @returns {number} 
     */
    public static count(): number {
        return window.sessionStorage.length;
    }

    /**
     * Get Local Storage
     * @returns {Storage}
     */
    public static getStorage(): Storage {
        return window.sessionStorage;
    }
}

// Cookie管理
class CookieManager {
    public expireDay: number;
    public isHttpsOnly: boolean;
    public domain: string;
    public path: string;

    constructor();
    constructor(options: any);
    constructor(options?: any) {
        this.setOptions(options);
    }

    /**
     * Set Options
     * @param {any}  options    - Global Options
     */
    public setOptions(options: any) {
        if (options) {
            this.expireDay = options['expireDay'] || this.expireDay;
            this.isHttpsOnly = options['isHttpsOnly'] || this.isHttpsOnly;
            this.path = options['path'] || this.path;
            this.domain = options['domain'] || this.domain;
        }
    }

    /**
     * Set Cookie
     * @param {string} key
     * @param {string} value
     * @param {any} options     - Local Options
     */
    public set(key: string, value: string, options?: any) {
        // Set Option
        let expireDay = this.expireDay;
        let isHttpsOnly = this.isHttpsOnly;
        let path = this.path;
        let domain = this.domain;

        if (options) {
            expireDay = options['expireDay'] || this.expireDay;
            isHttpsOnly = options['isHttpsOnly'] || this.isHttpsOnly;
            path = options['path'] || this.path;
            domain = options['domain'] || this.domain;
        }

        let config = {};

        // Cookie Key-Value
        config[key] = value;

        // Cookie Expires
        if (expireDay) {
            let date = new Date();
            date.setTime(date.getTime() + (expireDay * 24 * 60 * 60 * 1000));
            config['expires'] = date['toGMTString']();
        }

        // Cookie Secure、Path、Domain
        if (isHttpsOnly) config['secure'] = isHttpsOnly;
        if (path) config['path'] = path;
        if (domain) config['domain'] = domain;

        document.cookie = this.toCookieString(config);
    }

    /**
     * Get Cookie
     * @param {string} key
     * @param {string} defaultValue
     * @returns {string} 
     */
    public get(key: string, defaultValue: string = ''): string {
        let cookieConfig = this.toCookie(document.cookie);
        return cookieConfig[key] || defaultValue;
    }

    /**
     * Remove Cookie
     * @param {string} key
     */
    public remove = function (key: string) {
        this.set(key, '', -1);
    }

    /**
     * Clear Cookie
     */
    public clear() {
        let cookieConfig = this.toCookie(document.cookie);
        let cookieKeys = Object.keys(cookieConfig);
        for (var i = 0; i < cookieKeys.length; i++) {
            this.remove(cookieKeys[i]);
        }
    }

    /**
     * Cookie Count
     * @returns {number} 
     */
    public count(): number {
        var cookieConfig = this.toCookie(document.cookie);
        var cookieKeys = Object.keys(cookieConfig);
        return cookieKeys.length;
    }

    /**
     * Private Function - Cookie Config To Cookie Config String
     * @param {any} cookieConfig
     * @returns {string} 
     */
    public toCookieString(cookieConfig: any): string {
        let keys = Object.keys(cookieConfig);
        let cookieString = '';
        for (var i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (i != 0) cookieString += ';';
            cookieString += `${key}=${cookieConfig[key]}`;
        }
        return cookieString;
    }

    /**
     * Private Function - Cookie String To Cookie
     * @param {string} cookieString
     * @returns {any} 
     */
    public toCookie(cookieString: string): any {
        let cookieConfig = {};
        if (cookieString.indexOf(';') != -1) {
            var configs = cookieString.split(';');
            for (var i = 0; i < configs.length; i++) {
                let pairKeyValue = configs[i].split('=');
                if (pairKeyValue.length == 2) {
                    let key = pairKeyValue[0].trim();
                    let value = pairKeyValue[1];
                    cookieConfig[key] = value;
                }
            }
        }
        return cookieConfig;
    }
}

// UUID產生器
class UidGenerator {
    /**
     * Get Guid
     * @returns {string} 
     */
    public static newGuid(): string {
        let text = '';
        let possible = '0123456789ABCDEF';

        for (var i = 0; i < 35; i++) {

            switch (i) {
                case 8:
                case 13:
                case 18:
                    text += '-';
                    break;
                case 14:
                    text += '4';
                default:
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                    break;
            }
        }

        return text;
    }

    /**
     * Get Uid
     * @param {number} length
     * @param {string} charSet
     * @returns {string} 
     */
    public static newUid(length: number = 16, charSet: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'): string {
        var text = '';
        for (var i = 0; i < length; i++) {
            text += charSet.charAt(Math.floor(Math.random() * charSet.length));
        }
        return text;
    }
}

// Http Request
class HttpRequest {
    public url: string = '';
    public query: string = '';
    public headers: { key: string, velue: string };
    public dataType: string = '';
    public data: any;
    public success: Function;
    public fail: Function;
}

// Http Client
class HttpClient {
    /**
     * Send Request
     * @param {string} action   - GET, POST, PUT, DELETE, PATCH
     * @param {any} request     - {url, query, data, dataType [Json, FormData], headers, success, fail}
     * @returns {string}
     */
    public sendRequest(action: string, request: HttpRequest): string {
        // Check Request Data
        if (request == undefined || action == undefined || request.url == undefined) {
            console.error('No Request Data');
            return;
        };
        
        // Get XMLHttpRequest
        let xmlHttp = ((<any>window).XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

        // Add Type, Url, Async
        xmlHttp.open(action, this._setUrl(request.url, request.query), false);

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
     * @param {string} action   - GET, POST, PUT, DELETE, PATCH
     * @param {any} request     - {url, query, data, dataType [Json, FormData], headers, success, fail}
     */
    public sendRequestAsync(action: string, request: any) {
        // Check Request Data
        if (request == undefined || action == undefined || request.url == undefined) {
            console.error('No Request Data');
            return;
        };

        // Get XMLHttpRequest
        let xmlHttp = ((<any>window).XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

        // Add Callback
        var self = this;
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState === 4) {
                self._invokeCallback(xmlHttp, request.success, request.fail);
            }
        }

        // Add Type, Url, Async
        xmlHttp.open(action, this._setUrl(request.url, request.query), true);

        // Add Header
        xmlHttp = this._setHeaders(xmlHttp, request.headers, request.dataType);

        // Send Data
        xmlHttp = this._sendData(xmlHttp, request.data, request.dataType);
    };

    //#region Private Function

    /**
     * Create Url
     * @private
     * @param {string} url
     * @param {any} query
     * @returns {string} 
     */
    private _setUrl(url: string, query: string) {
        var uri = new Uri(url);
        if (query) {
            uri.setParams(query);
        }
        return uri.toString();
    };

    /**
     * Add Headers
     * @private
     * @param {XMLHttpRequest} xmlhttp
     * @param {any} headers
     * @param {string} dataType
     * @returns {XMLHttpRequest} 
     */
    private _setHeaders(xmlHttp: XMLHttpRequest, headers: any, dataType?: string) {
        if (dataType !== undefined) {
            switch (dataType.toUpperCase()) {
                case 'JSON':
                    xmlHttp.setRequestHeader('Content-Type', 'application/json');
                    break;
                case 'FORMDATA':
                    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    break;
            }
        }
        if (headers && typeof headers === 'object') {
            let keys = Object.keys(headers);
            keys.forEach((key, index) => {
                xmlHttp.setRequestHeader(key, headers[key]);
            })
        }
        return xmlHttp;
    };

    /**
     * 
     * @param {XMLHttpRequest} xmlhttp
     * @param {any} data
     * @param {string} dataType
     * @returns {XMLHttpRequest} 
     */
    private _sendData(xmlHttp: XMLHttpRequest, data: any, dataType: string) {
        if (dataType === undefined) {
            xmlHttp.send(data);
            return xmlHttp;
        }

        var body = data;
        switch (dataType.toUpperCase()) {
            case 'JSON':
                if (typeof data == 'object' || Array.isArray(data)) {
                    body = JSON.stringify(data);
                }
                break;
            case 'FORMDATA':
                var formData = new Uri('');
                formData.setParams(data);
                body = formData.query().replace('?', '');
                break;
        }
        xmlHttp.send(body);
        return xmlHttp;
    };

    /**
     * 
     * @param {XMLHttpRequest} xmlhttp
     * @param {any} success
     * @param {any} fail
     */
    private _invokeCallback = function (xmlHttp: any, success: Function, fail: Function) {
        if (success && xmlHttp.status >= 200 && xmlHttp.status < 300) {
            success(xmlHttp.responseText, xmlHttp.status, xmlHttp.statusText);
        }
        else if (fail && (xmlHttp.status < 200 || xmlHttp.status >= 300)) {
            fail(xmlHttp.responseText, xmlHttp.status, xmlHttp.statusText);
        }
    };


    /**
     * Static Function - HTTP Send (Sync)
     * @param {string} action
     * @param {boolean} isAsync
     * @returns {string} 
     */
    public static send(action: string, request: HttpRequest): string {
        var client = new HttpClient();
        client.sendRequestAsync(action, request);
        return '';
    };

    /**
     * Static Function - HTTP Send (Async)
     * @param {string} action
     * @param {boolean} isAsync
     * @returns {string} 
     */
    public static sendAsync(action: string, request: HttpRequest): string {
        var client = new HttpClient();
        return client.sendRequest(action, request);
    };

    /**
     * HTTP GET (Sync)
     * @param {any} request
     * @returns {string} 
     */
    public static get(request: HttpRequest): string {
        return HttpClient.send('GET', request);
    };
    /**
     * HTTP GET (Async)
     * @param {any} request
     * @returns {string} 
     */
    public static getAsync(request: HttpRequest): string {
        return HttpClient.sendAsync('GET', request);
    };

    /**
     * HTTP POST (Sync)
     * @param {any} request
     * @returns {string}
     */
    public static post(request: HttpRequest): string {
        return HttpClient.send('POST', request);
    };

    /**
     * HTTP POST (Async)
     * @param {any} request
     * @returns {string}
     */
    public static postAsync(request: HttpRequest): string {
        return HttpClient.sendAsync('POST', request);
    };
}

// Broswer Agent
class BroswerAgentHelper {
    constructor() {

    }

    public static isIE6(): boolean {
        return (navigator.userAgent.indexOf("MSIE 6") !== -1);
    }
    public static isIE7(): boolean {
        return (navigator.userAgent.indexOf("MSIE 7") !== -1);
    }
    public static isIE8(): boolean {
        return (navigator.userAgent.indexOf("MSIE 8") !== -1);
    }
    public static isIE9(): boolean {
        return (navigator.userAgent.indexOf("MSIE 9") !== -1);
    }
    public static isIE10(): boolean {
        return (navigator.userAgent.indexOf("MSIE 10") !== -1);
    }
    public static isIE11(): boolean {
        return (new RegExp("Trident.*rv[ :]*(\d+\.\d+)").exec(navigator.userAgent) != undefined);
    }
    public static isEdge(): boolean {
        return (new RegExp("Windows NT.*Edge\/(\d+\.\d+)").exec(navigator.userAgent) != undefined);
    }

    public static isMobile(): boolean {
        return (BroswerAgentHelper.isAndroid() || BroswerAgentHelper.isiOS() || BroswerAgentHelper.isWindowsPhone());
    }

    public static isAndroid(): boolean {
        let userAgent = navigator.userAgent;
        return (userAgent.indexOf("Android") !== -1 && userAgent.indexOf("Windows") === -1);
    }
    public static isAndroidPhone(): boolean {
        let userAgent = navigator.userAgent;
        return (userAgent.indexOf("Android") !== -1 && userAgent.indexOf("Mobile") !== -1 && userAgent.indexOf("Windows") === -1);
    }
    public static isAndroidTablet(): boolean {
        let userAgent = navigator.userAgent;
        return (userAgent.indexOf("Android") !== -1 && userAgent.indexOf("Mobile") === -1 && userAgent.indexOf("Windows") === -1);
    }

    public static isiOS(): boolean {
        return (BroswerAgentHelper.isiPad() || BroswerAgentHelper.isiPhone());
    }
    public static isiPhone(): boolean {
        let userAgent = navigator.userAgent;
        return (userAgent.indexOf("iPhone") !== -1 && userAgent.indexOf("Windows") === -1);
    }
    public static isiPad(): boolean {
        let userAgent = navigator.userAgent;
        return (userAgent.indexOf("iPad") !== -1 && userAgent.indexOf("Windows") === -1);
    }

    public static isWindowsPhone(): boolean {
        let userAgent = navigator.userAgent;
        return (userAgent.indexOf("Windows Phone") !== -1);
    }

    public static isSafari(): boolean {
        let userAgent = navigator.userAgent;
        return (userAgent.indexOf("Macintosh") !== -1 && userAgent.indexOf("Safari") !== -1 && userAgent.indexOf("Windows") === -1);
    }

    public static getIEVersion(): number {
        let userAgent = navigator.userAgent;
        let version: number = 0;
        if (/MSIE (\d+\.\d+);/.test(userAgent)) {
            version = Number(RegExp.$1);
        }
        else if (/Trident.*rv[ :]*(\d+\.\d+)/.test(userAgent)) {
            version = Number(RegExp.$1);
        }
        else if (/Windows NT.*Edge\/(\d+\.\d+)/.test(userAgent)) {
            version = Number(RegExp.$1);
        }
        return version;
    }
    public static getFirefoxVersion(): number {
        let userAgent = navigator.userAgent;
        let version = 0;
        if (/Firefox[\/\s](\d+\.\d+)/.test(userAgent)) {
            version = Number(RegExp.$1);
        }
        return version;
    }
    public static getChromeVersion(): number {
        var userAgent = navigator.userAgent;
        var version: number = 0;
        if (/Chrome[\/\s](\d+\.\d+)/.test(userAgent)) {
            version = Number(RegExp.$1);
        }
        return version;
    }
    public static getOperaVersion(): number {
        var userAgent = navigator.userAgent;
        var version: number = 0;
        if (/Opera[\/\s](\d+\.\d+)/.test(userAgent)) {
            version = Number(RegExp.$1);
        }
        else if (/OPR\/(\d+\.\d+)/i.test(userAgent)) {
            version = Number(RegExp.$1);
        }
        return version;
    }
}

// Timing
class Timing {
    private _timeoutTimer: number;
    private _intervalTimer: number;

    constructor() {
        this._timeoutTimer = undefined;
        this._intervalTimer = undefined;
    }

    /**
     * Sleep
     * @param {number} milliseconds
     */
    public static sleep(milliseconds: number) {
        let time: number = new Date().getTime()
        while ((new Date().getTime() - time) < milliseconds);
    }

    /**
     * Start Delayed
     * @param {number} milliseconds
     * @param {Function} callback
     */
    public startDelayed(milliseconds: number, callback: Function) {
        this._timeoutTimer = window.setTimeout(callback, milliseconds);
    }

    /**
     * Stop Delayed
     */
    public stopDelayed() {
        if (this._timeoutTimer != undefined) {
            window.clearTimeout(this._timeoutTimer);
            this._timeoutTimer = undefined;
        }
    }

    /**
     * Start Timer
     * @param {number} milliseconds
     * @param {Function} callback
     */
    public startTimer(milliseconds: number, callback: Function) {
        this._intervalTimer = window.setInterval(callback, milliseconds);
    }
    /**
     * Stop Timer
     */
    public stopTimer() {
        if (this._intervalTimer != undefined) {
            window.clearInterval(this._intervalTimer);
            this._intervalTimer = undefined;
        }
    }
}

// Digital轉換
class DigitalConvert {
    /**
     * Number To Letters
     * @param {number} num
     * @returns {string} 
     */
    public numberToLetters(num: number): string {
        let letterCount = 26;
        let startLetterCode = 'A'.charCodeAt(0);
        let result = '';

        if (num < 0) return result;

        do {
            result = `${String.fromCharCode(startLetterCode + num % letterCount)}${result}`;
            num /= letterCount;
        }
        while (--num >= 0);
        return result;
    }

    /**
     * Letters To Number
     * @param {string} text
     * @returns {number}
     */
    public lettersToNumber(text: string): number {
        let letterCount = 26;
        let startLetterCode = 'A'.charCodeAt(0);

        if (!text.match(/^[a-zA-z]+$/)) return -1;

        let result = 0;
        let letters = text.toUpperCase();

        for (let i = 0; i < letters.length; i++) {
            let letterCode = letters.charCodeAt(i);
            result = result * letterCount + (letterCode - startLetterCode + 1);
        }

        return result - 1;
    }

    /**
     * Number To Roman Number
     * @param {number} num
     * @returns {string} 
     */
    public numberToRomanNumber(num: number): string {
        if (num <= 0) return '';

        let romanNumberMap = [
            { 1000000: 'm' },
            { 500000: 'd' },
            { 100000: 'c' },
            { 50000: 'l' },
            { 10000: 'x' },
            { 5000: 'v' },
            { 4000: 'Mv' },
            { 1000: 'M' },
            { 900: 'CM' },
            { 500: 'D' },
            { 400: 'CD' },
            { 100: 'C' },
            { 90: 'XC' },
            { 50: 'L' },
            { 40: 'XL' },
            { 10: 'X' },
            { 9: 'IX' },
            { 5: 'V' },
            { 4: 'IV' },
            { 1: 'I' }
        ];

        let roman = '';

        for (let i = 0; i < romanNumberMap.length; i++) {
            let item = romanNumberMap[i];
            let key = parseInt(Object.keys(item)[0]);
            while (num >= key) {
                roman += item[key];
                num -= key;
            }
        }

        return roman;
    }

    /**
     * Roman Number To Number
     * @param {string} roman
     * @returns {number}
     */
    public romanNumberToNumber(roman: string): number {
        if (!roman.match(/^[I|V|X|L|C|D|M|v|x|l|c|d|m]+$/)) return -1;

        let romanNumberMap = {
            'I': 1,
            'V': 5,
            'X': 10,
            'L': 50,
            'C': 100,
            'D': 500,
            'M': 1000,
            'v': 5000,
            'x': 10000,
            'l': 50000,
            'c': 100000,
            'd': 500000,
            'm': 1000000
        };
        let total = 0;

        let current = 0;
        let previous = 0;
        let currentRoman = '\0'
        let previousRoman = '\0';

        for (let i = 0; i < roman.length; i++) {
            currentRoman = roman.charAt(i);

            previous = (previousRoman != '\0') ? romanNumberMap[previousRoman] : '\0';
            current = romanNumberMap[currentRoman];

            if (previous != 0 && current > previous) {
                total = total - (2 * previous) + current;
            }
            else {
                total += current;
            }

            previousRoman = currentRoman;
        }

        return total;
    }
}

// Base64轉換
class Base64 {
    public static encode(text: string): string {
        return window.btoa(text);
    }

    public static decode(text: string): string {
        return window.atob(text)
    }
}