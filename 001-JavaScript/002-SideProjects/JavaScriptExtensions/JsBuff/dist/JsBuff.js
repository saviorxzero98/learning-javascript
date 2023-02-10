//====================================================================================================
// Description：Collection.js
//====================================================================================================

/**
 * Description：Array Extend
 **/
(function () {

    //#region Static Method

    /** 
     * Array Empty
     * @returns {Array}
     */
    Array.empty = function () {
        return [];
    };

    //#endregion Static Method


    //#region Basic Method

    /** 
     * Array Is Empty
     * @returns {bool}
     */
    Array.prototype.isEmpty = function () {
        return (this.length === 0);
    };

    /** 
     * Array Length
     * @returns {index}
     */
    Array.prototype.count = function () {
        return this._list.length;
    };

    /** 
     * Array Length
     * @returns {index}
     */
    Array.prototype.size = function () {
        return this._list.length;
    };

    //#endregion Basic Method


    //#region Extend Item CRUD

    /**
     * Get First Item
     * @param {function} filter
     * @returns {object} 
     */
    Array.prototype.first = function (filter = null) {
        if (this.length === 0) {
            return null;
        }

        if (filter && typeof filter === 'function') {
            for (var i = 0; i < this.length; i++) {
                if (filter(this[i])) {
                    return this[i];
                }
            }
        }
        else {
            return this[0];
        }
    };

    /**
     * Get Last
     * @param {function} filter
     * @returns {object} 
     */
    Array.prototype.last = function (filter = null) {
        var length = this.length;

        if (length === 0) {
            return null;
        }

        if (filter && typeof filter === 'function') {
            for (var i = length - 1; i >= 0; i--) {
                if (filter(this[i])) {
                    return this[i];
                }
            }
        }
        else {
            return this[length - 1];
        }
    };
    /**
     * Get
     * @param {int} index
     */
    Array.prototype.get = function (index) {
        this._checkIndex(index);
        var array = this;
        return array[index];
    };

    /**
     * Set
     * @param {int} index
     * @param {object} item
     */
    Array.prototype.set = function (index, item) {
        this._checkIndex(index);
        var array = this;
        return array[index];
    };

    /** 
     * Add
     * @param {object} item
     */
    Array.prototype.add = function (item) {
        if (!Array.isArray(item)) {
            this.push(item);
        }
    };

    /** 
     * Add Range
     * @param {Array} array
     */
    Array.prototype.addRange = function (array) {
        if (Array.isArray(array)) {
            for (var i = 0; i < array.length; i++) {
                this.add(array[i]);
            }
        }
    };

    /**
     * Add All
     * @param {object..} item
     */
    Array.prototype.addAll = function () {
        this.addRange(arguments);
    };

    /** 
     * Remove
     * @param {int} index
     * @param {object} item
     */
    Array.prototype.insert = function (index, item) {
        this._checkIndex(index);
        if (!Array.isArray(item)) {
            this.splice(index, 0, item);
        }
    };

    /** 
     * Remove Range
     * @param {int} index
     * @param {Array} array
     */
    Array.prototype.insertRange = function (index, array) {
        this._checkIndex(index);
        if (Array.isArray(array)) {
            for (var i = 0; i < array.length; i++) {
                this.insert(index + i, array[i]);
            }
        }
    };

    /** 
     * Replace
     * @param {int} index
     * @param {object} item
     */
    Array.prototype.replace = function (index, item) {
        this._checkIndex(index);
        if (!Array.isArray(item)) {
            this.splice(index, 1, item);
        }
    };

    /** 
     * Replace Range
     * @param {int} index
     * @param {Array} array
     */
    Array.prototype.replaceRange = function (index, array) {
        this._checkIndex(index);
        if (Array.isArray(array)) {
            for (var i = 0; i < array.length; i++) {
                this.replace(index + i, array[i]);
            }
        }
    };

    /** 
     * Remove Range
     * @param {int} index
     * @param {int} length
     */
    Array.prototype.remove = function (index, length) {
        this._checkIndex(index);

        if (arguments == 2 && !isNaN(length)) {
            this.splice(index, length);
        }
        else {
            this.splice(index, 1);
        }
    };

    /** 
     * Clear Array
     */
    Array.prototype.clear = function () {
        this.length = 0;
    };

    //#endregion Extend Item CRUD


    //#region Search, Sort, And Compare

    /** 
     * Array Index
     * @param {object} item
     * @param {int} startIndex
     * @returns {Array}
     */
    Array.prototype.indexesOf = function (item, startIndex) {
        var length = this.length;
        var indexes = Array.empty();
        var currentIndex = startIndex || 0;

        while (currentIndex < length) {
            var searchIndex = this.indexOf(item, currentIndex);

            if (searchIndex == -1) {
                break;
            }
            indexes.add(searchIndex);
            currentIndex = searchIndex + 1;
        }
        return indexes;
    };

    /**
     * Array Last Index
     * @param {object} item
     * @param {int} )
     * @returns {Array}
     */
    Array.prototype.lastIndexesOf = function (item, endIndex) {
        var length = this.length;
        var indexes = Array.empty();
        var currentIndex = endIndex || length - 1;

        while (currentIndex >= 0) {
            var searchIndex = this.lastIndexOf(item, currentIndex);

            if (searchIndex == -1) {
                break;
            }
            indexes.add(searchIndex);
            currentIndex = searchIndex - 1;
        }
        return indexes;
    };

    /**
     * Is Contains
     * @param {type} item
     * @returns {type} 
     */
    Array.prototype.isContains = function (item) {
        var result = this.indexesOf(item, 0);
        return !result.isEmpty();
    };

    /** 
     * Sort Reverse
     * @param {Function} callback (Optional)
     */
    Array.prototype.reverseSort = function (callback) {
        this.sort(callback);
        this.reverse();
    };

    /**
     * Equals
     * @param {Array} array
     * @returns {bool} 
     */
    Array.prototype.equals = function (array) {
        if (!Array.isArray(array)) return false;
        if (this.length !== array.length) return false;
        if (this === array) return true;

        for (var i = 0; i < this.length && i < array.length; ++i) {
            if (this[i] !== array[i]) return false;
        }
        return true;
    };

    //#endregion Search, Sort, And Compare


    //#region Type Convert

    /**
     * From Json
     * @param {Json} json
     * @returns {Array} 
     */
    Array.fromJson = function (json) {
        var array = JSON.parse(json);

        if (!Array.isArray(array)) {
            console.error("json parse error!");
        }
        return array;
    };

    /**
     * To Json String
     * @returns {string} 
     */
    Array.prototype.toJson = function () {
        var json = JSON.stringify(this);
        return json;
    };

    //#endregion Type Convert


    //#region Private Method

    /**
     * Check Index
     * @private
     * @param {int} index
     */
    Array.prototype._checkIndex = function (index) {
        if (isNaN(index)) console.error("index is not Number");
        if (index >= this.length) console.error("Array index out of bound");
    };

    //#endregion Private Method

})();


/**
 * Description：List
 **/
var List = (function () {

    /**
     * @constructor 
     * @returns {List} 
     */
    function List() {
        var list = Object.create(Array.prototype);
        list = (Array.apply(list, arguments) || list);
        List.injectClassMethods(list);
        return (list);
    }

    /**
     * 
     * @param {List} list
     * @returns {List} 
     */
    List.injectClassMethods = function (list) {
        for (var method in List.prototype) {
            if (List.prototype.hasOwnProperty(method)) {
                list[method] = List.prototype[method];
            }
        }
        return list;
    };

    /**
     * From Array
     * @param {type} array
     * @returns {type} 
     */
    List.fromArray = function (array) {
        var list = List.apply(null, array);
        return list;
    };

    /**
     * From Json
     * @param {string} json
     * @returns {List} 
     */
    List.fromJson = function (json) {
        var list = List.apply(null, Array.fromJson(json));
        return list;
    };

    /**
     * Find All
     * @param {Object} item
     * @param {int} startIndex
     * @returns {List} 
     */
    List.prototype.findAll = function (item, startIndex) {
        var indexes = this.indexesOf(item, startIndex);

        var list = new List();
        for (var i = 0; i < indexes.length; i++) {
            var item = this[indexes[i]];
            list.add(item);
        }

        return list;
    };

    /**
     * Clone List
     * @returns {List} 
     */
    List.prototype.clone = function () {
        var list = new List();
        list.addRange(this);
        return list;
    };

    /**
     * To Array
     * @returns {Array} 
     */
    List.prototype.toArray = function () {
        var array = new Array();
        array.addRange(this);
        return array;
    };

    return List;
})();

/**
 * Description：Stack
 **/
var Stack = (function () {

    /**
     * @constructor 
     * @param {Array} array
     */
    function Stack(array) {
        this._stack = Array.empty();

        if (arguments.length == 1 && Array.isArray(array)) {
            this._stack = array;
        }
        else if (arguments.length > 0) {
            this._stack.addAll(arguments);
        }
    }

    //#region Static Method

    /** 
     * Array Empty
     * @returns {Array}
     */
    Stack.empty = function () {
        return new Stack();
    };

    //#endregion Static Method


    //#region Basic Method

    /** 
     * Stack Is Empty
     * @returns {bool}
     */
    Stack.prototype.isEmpty = function () {
        return (this._stack.length === 0);
    };

    /** 
     * Array Length
     * @returns {index}
     */
    Stack.prototype.count = function () {
        return this._stack.length;
    };

    /** 
     * Array Length
     * @returns {index}
     */
    Stack.prototype.size = function () {
        return this._stack.length;
    };

    //#endregion Basic Method


    //#region Item CRUD

    /**
     * Peek Item
     * @returns {object} 
     */
    Stack.prototype.peek = function () {
        var item = this._stack.getLast();
        return item;
    };

    /**
     * Push Item
     * @param {object} item
     */
    Stack.prototype.push = function (item) {
        this._stack.push(item);
    };

    /**
     * Pop Item
     * @returns {object} 
     */
    Stack.prototype.pop = function () {
        var item = this.peek();
        this._stack.pop();
        return item;
    };

    /**
     * Clear Stack
     */
    Stack.prototype.clear = function () {
        this._stack.clear();
    };

    /**
     * Clone
     * @returns {Stack} 
     */
    Stack.prototype.clone = function () {
        var stack = new Stack(this._stack);
        return stack;
    };

    //#endregion Item CRUD


    //#region Type Convert

    /**
     * From Json
     * @param {Json} json
     * @returns {Array} 
     */
    Stack.fromJson = function (json) {
        var array = JSON.parse(json);
        return new Stack(array);
    };

    /**
     * From Array
     * @param {Array} array
     * @returns {Stack} 
     */
    Stack.fromArray = function (array) {
        var stack = new Stack(array);
        return stack;
    };

    /**
     * To Json String
     * @returns {string} 
     */
    Stack.prototype.toJson = function () {
        var json = JSON.stringify(this._stack);
        return json;
    };

    /**
     * To Array
     * @returns {Array} 
     */
    Stack.prototype.toArray = function () {
        return this._stack;
    };

    /**
     * To String
     * @returns {string} 
     */
    Stack.prototype.toString = function () {
        return this._stack.toString();
    };

    //#endregion Type Convert

    return Stack;
})();

/**
 * @class {Dictionary} JavaScript Dictionary
 */
var Dictionary = (function () {
    /** 
     * 
     * @constructor 
     * @property {object} _dictionary
     * @property {boolean} _isAutoSort
     * @property {boolean} _isDescOrder
	 * @param {object} options (Optional) {isAutoSort: bool, isDescOrder: bool}
     */
    function Dictionary(options) {
        this._dictionary = {};
        this._isAutoSort = false;
        this._isDescOrder = false;

        if (options != null) {
            this._isAutoSort = options.isAutoSort || this._isAutoSort;
            this._isDescOrder = options.isDescOrder || this._isDescOrder;
        }
    }

    /** 
     * Add
     * @param {string} key
     * @param {object} value
     */
    Dictionary.prototype.add = function (key, value) {
        if (key == null || key.trim().length === 0) {
            throw "Key isn't String";
        }

        this._dictionary[key.toString()] = value;

        if (this._isAutoSort) {
            this.sort();
        }
    };

    /** 
     * Add More
     * @param {object[]} objectList (key-value Pair Array)
     */
    Dictionary.prototype.addMore = function (objectList) {
        for (var i = 0; i < objectList.length; i++) {
            this.add(objectList[i].key, objectList[i].value);
        }
    };

    /** 
     * Add Dictionary
     * @param {Dictionary} dictionary
     */
    Dictionary.prototype.addDictionary = function (dictionary) {
        var keys = dictionary.keys();

        for (var i = 0; i < keys.length; i++) {
            this.add(keys[i], dictionary.get(keys[i]));
        }
    };

    /** 
     * Get Value
     * @param {string} key
     * @returns {Object} 
     */
    Dictionary.prototype.get = function (key) {
        if (key == null || key.trim().length === 0) {
            throw "Key isn't String";
        }

        if (!this.isContainsKey(key)) {
            throw "Nothing";
        }

        return this._dictionary[key];
    };

    /** 
     * Remove
     * @param {string} key
     */
    Dictionary.prototype.remove = function (key) {
        if (this.isContainsKey(key)) {
            delete this._dictionary[key];
        }
    };

    /** 
     * Remove All
     */
    Dictionary.prototype.removeAll = function () {
        this._dictionary = {};
    };

    /** 
     * Is Contains Key
     * @param {string} key
     * @returns {bool} 
     */
    Dictionary.prototype.isContainsKey = function (key) {
        var keys = this.keys();

        var index = keys.indexOf(key);

        if (index === -1) {
            return false;
        }

        return true;
    };

    /** 
     * Is Contains Value 
     * @param {object} value
     * @returns {bool} 
     */
    Dictionary.prototype.isContainsValue = function (value) {
        var keys = this.keys();

        for (var i = 0; i < keys.length; i++) {
            if (this._dictionary[keys[i]] === value) {
                return true;
            }
        }

        return false;
    };

    /** 
     * Each
     * @param {function} func
     */
    Dictionary.prototype.each = function (func) {
        $.each(this._dictionary, func);
    };

    /** 
     * Get Keys
     * @returns {string[]} 
     */
    Dictionary.prototype.keys = function () {
        var keys = Object.keys(this._dictionary);

        return keys;
    };

    /** 
     * Dictionary Value To Array 
     * @returns {object[]} 
     */
    Dictionary.prototype.values = function () {
        var keys = this.keys();
        var array = [];

        for (var i = 0; i < keys.length; i++) {
            array.push(this._dictionary[keys[i]]);
        }
        return array;
    };

    /** 
     * Dictionary To Json String
     * @returns {string} 
     */
    Dictionary.prototype.toJson = function () {
        var json = JSON.stringify(this._dictionary);
        return json;
    };

    /** 
     * Add From Json
     * @param {string} json
     */
    Dictionary.prototype.fromJson = function (json) {
        this._dictionary = JSON.parse(json);
    };

    /** 
     * Clone Dictionary
     * @returns {Dictionary}
     */
    Dictionary.prototype.clone = function () {
        var newDictionary = new Dictionary();
        newDictionary.addMore(this);

        return newDictionary;
    };

    /** 
     * Sort Dictionary Key
     * @param {bool} json (Optional)
     */
    Dictionary.prototype.sort = function (isDescOrder) {
        this._isDescOrder = isDescOrder || this._isDescOrder;

        var keys = this.keys();

        keys.sort();

        if (this._isDescOrder) keys.reverse();

        var sortedDictionary = {};

        for (i = 0; i < keys.length; i++) {
            sortedDictionary[keys[i]] = this._dictionary[keys[i]];
        }

        this._dictionary = sortedDictionary;
    }

    return Dictionary;
})();


//====================================================================================================
// Description：Cryptos.js
//====================================================================================================

var Unicode = (function () {
    function Unicode() {
    }

    /**
     * Unicode Encode
     * @param {string} text
     * @returns {string} 
     */
    Unicode.prototype.encode = function (text) {
        var unicodeString = '';
        for (var i = 0; i < text.length; i++) {
            var theUnicode = text.charCodeAt(i).toString(16).toUpperCase();
            while (theUnicode.length < 4) {
                theUnicode = '0' + theUnicode;
            }
            theUnicode = '\\u' + theUnicode;
            unicodeString += theUnicode;
        }
        return unicodeString;
    };

    /**
     * Unicode Decode
     * @param {string} text
     * @returns {string} 
     */
    Unicode.prototype.decode = function (text) {
        return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
    };

    return Unicode;
})();

var Base64 = (function () {
    function Base64() {
    }

    /**
     * Base64 Encode
     * @param {string} text
     * @returns {string} 
     */
    Base64.prototype.encode = function (text) {
        return window.btoa(text);
    };

    /**
     * Base64 Decode
     * @param {string} text
     * @returns {string} 
     */
    Base64.prototype.decode = function (text) {
        return window.atob(text)
    };

    return Base64;
})();

var XOREncrypt = (function () {
    function XOREncrypt() {
    }

    /**
     * XOR Encrypt
     * @param {string} text
     * @param {string} key
     * @returns {string} 
     */
    XOREncrypt.prototype.encrypt = function (text, key) {
        var result = this._xor(text, key);
        return window.btoa(result);
    };

    /**
     * XOR Decrypt
     * @param {string} text
     * @param {string} key
     * @returns {string} 
     */
    XOREncrypt.prototype.decrypt = function (text, key) {
        var result = this._xor(window.atob(text), key);
        return result;
    };

    XOREncrypt.prototype._xor = function (text, key) {
        var ord = []
        var buf = ""

        for (z = 1; z <= 255; z++) { ord[String.fromCharCode(z)] = z }

        for (j = z = 0; z < text.length; z++) {
            buf += String.fromCharCode(ord[text.substr(z, 1)] ^ ord[key.substr(j, 1)])
            j = (j < key.length) ? j + 1 : 0
        }

        return buf
    };

    return XOREncrypt;
})();

var MD5 = (function () {
    function MD5() {
    }

    /**
     * MD5 Encrypt
     * @param {string} text
     * @returns {string} 
     */
    MD5.prototype.encrypt = function (text) {
        return this._md5(text);
    };

    MD5.prototype._md5 = function (s) { function L(k, d) { return (k << d) | (k >>> (32 - d)) } function K(G, k) { var I, d, F, H, x; F = (G & 2147483648); H = (k & 2147483648); I = (G & 1073741824); d = (k & 1073741824); x = (G & 1073741823) + (k & 1073741823); if (I & d) { return (x ^ 2147483648 ^ F ^ H) } if (I | d) { if (x & 1073741824) { return (x ^ 3221225472 ^ F ^ H) } else { return (x ^ 1073741824 ^ F ^ H) } } else { return (x ^ F ^ H) } } function r(d, F, k) { return (d & F) | ((~d) & k) } function q(d, F, k) { return (d & k) | (F & (~k)) } function p(d, F, k) { return (d ^ F ^ k) } function n(d, F, k) { return (F ^ (d | (~k))) } function u(G, F, aa, Z, k, H, I) { G = K(G, K(K(r(F, aa, Z), k), I)); return K(L(G, H), F) } function f(G, F, aa, Z, k, H, I) { G = K(G, K(K(q(F, aa, Z), k), I)); return K(L(G, H), F) } function D(G, F, aa, Z, k, H, I) { G = K(G, K(K(p(F, aa, Z), k), I)); return K(L(G, H), F) } function t(G, F, aa, Z, k, H, I) { G = K(G, K(K(n(F, aa, Z), k), I)); return K(L(G, H), F) } function e(G) { var Z; var F = G.length; var x = F + 8; var k = (x - (x % 64)) / 64; var I = (k + 1) * 16; var aa = Array(I - 1); var d = 0; var H = 0; while (H < F) { Z = (H - (H % 4)) / 4; d = (H % 4) * 8; aa[Z] = (aa[Z] | (G.charCodeAt(H) << d)); H++ } Z = (H - (H % 4)) / 4; d = (H % 4) * 8; aa[Z] = aa[Z] | (128 << d); aa[I - 2] = F << 3; aa[I - 1] = F >>> 29; return aa } function B(x) { var k = "", F = "", G, d; for (d = 0; d <= 3; d++) { G = (x >>> (d * 8)) & 255; F = "0" + G.toString(16); k = k + F.substr(F.length - 2, 2) } return k } function J(k) { k = k.replace(/rn/g, "n"); var d = ""; for (var F = 0; F < k.length; F++) { var x = k.charCodeAt(F); if (x < 128) { d += String.fromCharCode(x) } else { if ((x > 127) && (x < 2048)) { d += String.fromCharCode((x >> 6) | 192); d += String.fromCharCode((x & 63) | 128) } else { d += String.fromCharCode((x >> 12) | 224); d += String.fromCharCode(((x >> 6) & 63) | 128); d += String.fromCharCode((x & 63) | 128) } } } return d } var C = Array(); var P, h, E, v, g, Y, X, W, V; var S = 7, Q = 12, N = 17, M = 22; var A = 5, z = 9, y = 14, w = 20; var o = 4, m = 11, l = 16, j = 23; var U = 6, T = 10, R = 15, O = 21; s = J(s); C = e(s); Y = 1732584193; X = 4023233417; W = 2562383102; V = 271733878; for (P = 0; P < C.length; P += 16) { h = Y; E = X; v = W; g = V; Y = u(Y, X, W, V, C[P + 0], S, 3614090360); V = u(V, Y, X, W, C[P + 1], Q, 3905402710); W = u(W, V, Y, X, C[P + 2], N, 606105819); X = u(X, W, V, Y, C[P + 3], M, 3250441966); Y = u(Y, X, W, V, C[P + 4], S, 4118548399); V = u(V, Y, X, W, C[P + 5], Q, 1200080426); W = u(W, V, Y, X, C[P + 6], N, 2821735955); X = u(X, W, V, Y, C[P + 7], M, 4249261313); Y = u(Y, X, W, V, C[P + 8], S, 1770035416); V = u(V, Y, X, W, C[P + 9], Q, 2336552879); W = u(W, V, Y, X, C[P + 10], N, 4294925233); X = u(X, W, V, Y, C[P + 11], M, 2304563134); Y = u(Y, X, W, V, C[P + 12], S, 1804603682); V = u(V, Y, X, W, C[P + 13], Q, 4254626195); W = u(W, V, Y, X, C[P + 14], N, 2792965006); X = u(X, W, V, Y, C[P + 15], M, 1236535329); Y = f(Y, X, W, V, C[P + 1], A, 4129170786); V = f(V, Y, X, W, C[P + 6], z, 3225465664); W = f(W, V, Y, X, C[P + 11], y, 643717713); X = f(X, W, V, Y, C[P + 0], w, 3921069994); Y = f(Y, X, W, V, C[P + 5], A, 3593408605); V = f(V, Y, X, W, C[P + 10], z, 38016083); W = f(W, V, Y, X, C[P + 15], y, 3634488961); X = f(X, W, V, Y, C[P + 4], w, 3889429448); Y = f(Y, X, W, V, C[P + 9], A, 568446438); V = f(V, Y, X, W, C[P + 14], z, 3275163606); W = f(W, V, Y, X, C[P + 3], y, 4107603335); X = f(X, W, V, Y, C[P + 8], w, 1163531501); Y = f(Y, X, W, V, C[P + 13], A, 2850285829); V = f(V, Y, X, W, C[P + 2], z, 4243563512); W = f(W, V, Y, X, C[P + 7], y, 1735328473); X = f(X, W, V, Y, C[P + 12], w, 2368359562); Y = D(Y, X, W, V, C[P + 5], o, 4294588738); V = D(V, Y, X, W, C[P + 8], m, 2272392833); W = D(W, V, Y, X, C[P + 11], l, 1839030562); X = D(X, W, V, Y, C[P + 14], j, 4259657740); Y = D(Y, X, W, V, C[P + 1], o, 2763975236); V = D(V, Y, X, W, C[P + 4], m, 1272893353); W = D(W, V, Y, X, C[P + 7], l, 4139469664); X = D(X, W, V, Y, C[P + 10], j, 3200236656); Y = D(Y, X, W, V, C[P + 13], o, 681279174); V = D(V, Y, X, W, C[P + 0], m, 3936430074); W = D(W, V, Y, X, C[P + 3], l, 3572445317); X = D(X, W, V, Y, C[P + 6], j, 76029189); Y = D(Y, X, W, V, C[P + 9], o, 3654602809); V = D(V, Y, X, W, C[P + 12], m, 3873151461); W = D(W, V, Y, X, C[P + 15], l, 530742520); X = D(X, W, V, Y, C[P + 2], j, 3299628645); Y = t(Y, X, W, V, C[P + 0], U, 4096336452); V = t(V, Y, X, W, C[P + 7], T, 1126891415); W = t(W, V, Y, X, C[P + 14], R, 2878612391); X = t(X, W, V, Y, C[P + 5], O, 4237533241); Y = t(Y, X, W, V, C[P + 12], U, 1700485571); V = t(V, Y, X, W, C[P + 3], T, 2399980690); W = t(W, V, Y, X, C[P + 10], R, 4293915773); X = t(X, W, V, Y, C[P + 1], O, 2240044497); Y = t(Y, X, W, V, C[P + 8], U, 1873313359); V = t(V, Y, X, W, C[P + 15], T, 4264355552); W = t(W, V, Y, X, C[P + 6], R, 2734768916); X = t(X, W, V, Y, C[P + 13], O, 1309151649); Y = t(Y, X, W, V, C[P + 4], U, 4149444226); V = t(V, Y, X, W, C[P + 11], T, 3174756917); W = t(W, V, Y, X, C[P + 2], R, 718787259); X = t(X, W, V, Y, C[P + 9], O, 3951481745); Y = K(Y, h); X = K(X, E); W = K(W, v); V = K(V, g) } var i = B(Y) + B(X) + B(W) + B(V); return i.toLowerCase() };

    return MD5;
})();

var SHA1 = (function () {
    function SHA1() {
    }

    /**
     * SHA1 Encrypt
     * @param {string} text
     * @returns {string} 
     */
    SHA1.prototype.encrypt = function (text) {
        return this._sha1(text);
    };

    SHA1.prototype._sha1 = function SHA1(msg) { function rotate_left(n, s) { var t4 = (n << s) | (n >>> (32 - s)); return t4; }; function lsb_hex(val) { var str = ""; var i; var vh; var vl; for (i = 0; i <= 6; i += 2) { vh = (val >>> (i * 4 + 4)) & 0x0f; vl = (val >>> (i * 4)) & 0x0f; str += vh.toString(16) + vl.toString(16); } return str; }; function cvt_hex(val) { var str = ""; var i; var v; for (i = 7; i >= 0; i--) { v = (val >>> (i * 4)) & 0x0f; str += v.toString(16); } return str; }; function Utf8Encode(string) { string = string.replace(/\r\n/g, "\n"); var utftext = ""; for (var n = 0; n < string.length; n++) { var c = string.charCodeAt(n); if (c < 128) { utftext += String.fromCharCode(c); } else if ((c > 127) && (c < 2048)) { utftext += String.fromCharCode((c >> 6) | 192); utftext += String.fromCharCode((c & 63) | 128); } else { utftext += String.fromCharCode((c >> 12) | 224); utftext += String.fromCharCode(((c >> 6) & 63) | 128); utftext += String.fromCharCode((c & 63) | 128); } } return utftext; }; var blockstart; var i, j; var W = new Array(80); var H0 = 0x67452301; var H1 = 0xEFCDAB89; var H2 = 0x98BADCFE; var H3 = 0x10325476; var H4 = 0xC3D2E1F0; var A, B, C, D, E; var temp; msg = Utf8Encode(msg); var msg_len = msg.length; var word_array = new Array(); for (i = 0; i < msg_len - 3; i += 4) { j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 | msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3); word_array.push(j); } switch (msg_len % 4) { case 0: i = 0x080000000; break; case 1: i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000; break; case 2: i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000; break; case 3: i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80; break; } word_array.push(i); while ((word_array.length % 16) != 14) word_array.push(0); word_array.push(msg_len >>> 29); word_array.push((msg_len << 3) & 0x0ffffffff); for (blockstart = 0; blockstart < word_array.length; blockstart += 16) { for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i]; for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1); A = H0; B = H1; C = H2; D = H3; E = H4; for (i = 0; i <= 19; i++) { temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff; E = D; D = C; C = rotate_left(B, 30); B = A; A = temp; } for (i = 20; i <= 39; i++) { temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff; E = D; D = C; C = rotate_left(B, 30); B = A; A = temp; } for (i = 40; i <= 59; i++) { temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff; E = D; D = C; C = rotate_left(B, 30); B = A; A = temp; } for (i = 60; i <= 79; i++) { temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff; E = D; D = C; C = rotate_left(B, 30); B = A; A = temp; } H0 = (H0 + A) & 0x0ffffffff; H1 = (H1 + B) & 0x0ffffffff; H2 = (H2 + C) & 0x0ffffffff; H3 = (H3 + D) & 0x0ffffffff; H4 = (H4 + E) & 0x0ffffffff; } var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4); return temp.toLowerCase(); }

    return SHA1;
})();

var SHA256 = (function () {
    function SHA256() {
    }

    /**
     * SHA256 Encrypt
     * @param {string} text
     * @returns {string} 
     */
    SHA256.prototype.encrypt = function (text) {
        return this._sha256(text);
    };

    SHA256.prototype._sha256 = function (s) { var chrsz = 8; var hexcase = 0; function safe_add(x, y) { var lsw = (x & 0xFFFF) + (y & 0xFFFF); var msw = (x >> 16) + (y >> 16) + (lsw >> 16); return (msw << 16) | (lsw & 0xFFFF); } function S(X, n) { return (X >>> n) | (X << (32 - n)); } function R(X, n) { return (X >>> n); } function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); } function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); } function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); } function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); } function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); } function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); } function core_sha256(m, l) { var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2); var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19); var W = new Array(64); var a, b, c, d, e, f, g, h, i, j; var T1, T2; m[l >> 5] |= 0x80 << (24 - l % 32); m[((l + 64 >> 9) << 4) + 15] = l; for (var i = 0; i < m.length; i += 16) { a = HASH[0]; b = HASH[1]; c = HASH[2]; d = HASH[3]; e = HASH[4]; f = HASH[5]; g = HASH[6]; h = HASH[7]; for (var j = 0; j < 64; j++) { if (j < 16) W[j] = m[j + i]; else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]); T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]); T2 = safe_add(Sigma0256(a), Maj(a, b, c)); h = g; g = f; f = e; e = safe_add(d, T1); d = c; c = b; b = a; a = safe_add(T1, T2); } HASH[0] = safe_add(a, HASH[0]); HASH[1] = safe_add(b, HASH[1]); HASH[2] = safe_add(c, HASH[2]); HASH[3] = safe_add(d, HASH[3]); HASH[4] = safe_add(e, HASH[4]); HASH[5] = safe_add(f, HASH[5]); HASH[6] = safe_add(g, HASH[6]); HASH[7] = safe_add(h, HASH[7]); } return HASH; } function str2binb(str) { var bin = Array(); var mask = (1 << chrsz) - 1; for (var i = 0; i < str.length * chrsz; i += chrsz) { bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32); } return bin; } function Utf8Encode(string) { string = string.replace(/\r\n/g, "\n"); var utftext = ""; for (var n = 0; n < string.length; n++) { var c = string.charCodeAt(n); if (c < 128) { utftext += String.fromCharCode(c); } else if ((c > 127) && (c < 2048)) { utftext += String.fromCharCode((c >> 6) | 192); utftext += String.fromCharCode((c & 63) | 128); } else { utftext += String.fromCharCode((c >> 12) | 224); utftext += String.fromCharCode(((c >> 6) & 63) | 128); utftext += String.fromCharCode((c & 63) | 128); } } return utftext; } function binb2hex(binarray) { var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef"; var str = ""; for (var i = 0; i < binarray.length * 4; i++) { str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF); } return str; } s = Utf8Encode(s); return binb2hex(core_sha256(str2binb(s), s.length * chrsz)); }

    return SHA256;
})();

var SHA512 = (function () {
    function SHA512() {
    }

    /**
    * SHA512 Encrypt
    * @param {string} text
    * @returns {string} 
    */
    SHA512.prototype.encrypt = function (text) {
        return this._sha512(text);
    };

    SHA512.prototype._sha512 = function SHA512(str) { function int64(msint_32, lsint_32) { this.highOrder = msint_32; this.lowOrder = lsint_32; } var H = [new int64(0x6a09e667, 0xf3bcc908), new int64(0xbb67ae85, 0x84caa73b), new int64(0x3c6ef372, 0xfe94f82b), new int64(0xa54ff53a, 0x5f1d36f1), new int64(0x510e527f, 0xade682d1), new int64(0x9b05688c, 0x2b3e6c1f), new int64(0x1f83d9ab, 0xfb41bd6b), new int64(0x5be0cd19, 0x137e2179)]; var K = [new int64(0x428a2f98, 0xd728ae22), new int64(0x71374491, 0x23ef65cd), new int64(0xb5c0fbcf, 0xec4d3b2f), new int64(0xe9b5dba5, 0x8189dbbc), new int64(0x3956c25b, 0xf348b538), new int64(0x59f111f1, 0xb605d019), new int64(0x923f82a4, 0xaf194f9b), new int64(0xab1c5ed5, 0xda6d8118), new int64(0xd807aa98, 0xa3030242), new int64(0x12835b01, 0x45706fbe), new int64(0x243185be, 0x4ee4b28c), new int64(0x550c7dc3, 0xd5ffb4e2), new int64(0x72be5d74, 0xf27b896f), new int64(0x80deb1fe, 0x3b1696b1), new int64(0x9bdc06a7, 0x25c71235), new int64(0xc19bf174, 0xcf692694), new int64(0xe49b69c1, 0x9ef14ad2), new int64(0xefbe4786, 0x384f25e3), new int64(0x0fc19dc6, 0x8b8cd5b5), new int64(0x240ca1cc, 0x77ac9c65), new int64(0x2de92c6f, 0x592b0275), new int64(0x4a7484aa, 0x6ea6e483), new int64(0x5cb0a9dc, 0xbd41fbd4), new int64(0x76f988da, 0x831153b5), new int64(0x983e5152, 0xee66dfab), new int64(0xa831c66d, 0x2db43210), new int64(0xb00327c8, 0x98fb213f), new int64(0xbf597fc7, 0xbeef0ee4), new int64(0xc6e00bf3, 0x3da88fc2), new int64(0xd5a79147, 0x930aa725), new int64(0x06ca6351, 0xe003826f), new int64(0x14292967, 0x0a0e6e70), new int64(0x27b70a85, 0x46d22ffc), new int64(0x2e1b2138, 0x5c26c926), new int64(0x4d2c6dfc, 0x5ac42aed), new int64(0x53380d13, 0x9d95b3df), new int64(0x650a7354, 0x8baf63de), new int64(0x766a0abb, 0x3c77b2a8), new int64(0x81c2c92e, 0x47edaee6), new int64(0x92722c85, 0x1482353b), new int64(0xa2bfe8a1, 0x4cf10364), new int64(0xa81a664b, 0xbc423001), new int64(0xc24b8b70, 0xd0f89791), new int64(0xc76c51a3, 0x0654be30), new int64(0xd192e819, 0xd6ef5218), new int64(0xd6990624, 0x5565a910), new int64(0xf40e3585, 0x5771202a), new int64(0x106aa070, 0x32bbd1b8), new int64(0x19a4c116, 0xb8d2d0c8), new int64(0x1e376c08, 0x5141ab53), new int64(0x2748774c, 0xdf8eeb99), new int64(0x34b0bcb5, 0xe19b48a8), new int64(0x391c0cb3, 0xc5c95a63), new int64(0x4ed8aa4a, 0xe3418acb), new int64(0x5b9cca4f, 0x7763e373), new int64(0x682e6ff3, 0xd6b2b8a3), new int64(0x748f82ee, 0x5defb2fc), new int64(0x78a5636f, 0x43172f60), new int64(0x84c87814, 0xa1f0ab72), new int64(0x8cc70208, 0x1a6439ec), new int64(0x90befffa, 0x23631e28), new int64(0xa4506ceb, 0xde82bde9), new int64(0xbef9a3f7, 0xb2c67915), new int64(0xc67178f2, 0xe372532b), new int64(0xca273ece, 0xea26619c), new int64(0xd186b8c7, 0x21c0c207), new int64(0xeada7dd6, 0xcde0eb1e), new int64(0xf57d4f7f, 0xee6ed178), new int64(0x06f067aa, 0x72176fba), new int64(0x0a637dc5, 0xa2c898a6), new int64(0x113f9804, 0xbef90dae), new int64(0x1b710b35, 0x131c471b), new int64(0x28db77f5, 0x23047d84), new int64(0x32caab7b, 0x40c72493), new int64(0x3c9ebe0a, 0x15c9bebc), new int64(0x431d67c4, 0x9c100d4c), new int64(0x4cc5d4be, 0xcb3e42b6), new int64(0x597f299c, 0xfc657e2a), new int64(0x5fcb6fab, 0x3ad6faec), new int64(0x6c44198c, 0x4a475817)]; var W = new Array(64); var a, b, c, d, e, f, g, h, i, j; var T1, T2; var charsize = 8; function utf8_encode(str) { return unescape(encodeURIComponent(str)); } function str2binb(str) { var bin = []; var mask = (1 << charsize) - 1; var len = str.length * charsize; for (var i = 0; i < len; i += charsize) { bin[i >> 5] |= (str.charCodeAt(i / charsize) & mask) << (32 - charsize - (i % 32)); } return bin; } function binb2hex(binarray) { var hex_tab = "0123456789abcdef"; var str = ""; var length = binarray.length * 4; var srcByte; for (var i = 0; i < length; i += 1) { srcByte = binarray[i >> 2] >> ((3 - (i % 4)) * 8); str += hex_tab.charAt((srcByte >> 4) & 0xF) + hex_tab.charAt(srcByte & 0xF); } return str; } function safe_add_2(x, y) { var lsw, msw, lowOrder, highOrder; lsw = (x.lowOrder & 0xFFFF) + (y.lowOrder & 0xFFFF); msw = (x.lowOrder >>> 16) + (y.lowOrder >>> 16) + (lsw >>> 16); lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF); lsw = (x.highOrder & 0xFFFF) + (y.highOrder & 0xFFFF) + (msw >>> 16); msw = (x.highOrder >>> 16) + (y.highOrder >>> 16) + (lsw >>> 16); highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF); return new int64(highOrder, lowOrder); } function safe_add_4(a, b, c, d) { var lsw, msw, lowOrder, highOrder; lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) + (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF); msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (lsw >>> 16); lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF); lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) + (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (msw >>> 16); msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (lsw >>> 16); highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF); return new int64(highOrder, lowOrder); } function safe_add_5(a, b, c, d, e) { var lsw, msw, lowOrder, highOrder; lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) + (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF) + (e.lowOrder & 0xFFFF); msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (e.lowOrder >>> 16) + (lsw >>> 16); lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF); lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) + (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (e.highOrder & 0xFFFF) + (msw >>> 16); msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (e.highOrder >>> 16) + (lsw >>> 16); highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF); return new int64(highOrder, lowOrder); } function maj(x, y, z) { return new int64((x.highOrder & y.highOrder) ^ (x.highOrder & z.highOrder) ^ (y.highOrder & z.highOrder), (x.lowOrder & y.lowOrder) ^ (x.lowOrder & z.lowOrder) ^ (y.lowOrder & z.lowOrder)); } function ch(x, y, z) { return new int64((x.highOrder & y.highOrder) ^ (~x.highOrder & z.highOrder), (x.lowOrder & y.lowOrder) ^ (~x.lowOrder & z.lowOrder)); } function rotr(x, n) { if (n <= 32) { return new int64((x.highOrder >>> n) | (x.lowOrder << (32 - n)), (x.lowOrder >>> n) | (x.highOrder << (32 - n))); } else { return new int64((x.lowOrder >>> n) | (x.highOrder << (32 - n)), (x.highOrder >>> n) | (x.lowOrder << (32 - n))); } } function sigma0(x) { var rotr28 = rotr(x, 28); var rotr34 = rotr(x, 34); var rotr39 = rotr(x, 39); return new int64(rotr28.highOrder ^ rotr34.highOrder ^ rotr39.highOrder, rotr28.lowOrder ^ rotr34.lowOrder ^ rotr39.lowOrder); } function sigma1(x) { var rotr14 = rotr(x, 14); var rotr18 = rotr(x, 18); var rotr41 = rotr(x, 41); return new int64(rotr14.highOrder ^ rotr18.highOrder ^ rotr41.highOrder, rotr14.lowOrder ^ rotr18.lowOrder ^ rotr41.lowOrder); } function gamma0(x) { var rotr1 = rotr(x, 1), rotr8 = rotr(x, 8), shr7 = shr(x, 7); return new int64(rotr1.highOrder ^ rotr8.highOrder ^ shr7.highOrder, rotr1.lowOrder ^ rotr8.lowOrder ^ shr7.lowOrder); } function gamma1(x) { var rotr19 = rotr(x, 19); var rotr61 = rotr(x, 61); var shr6 = shr(x, 6); return new int64(rotr19.highOrder ^ rotr61.highOrder ^ shr6.highOrder, rotr19.lowOrder ^ rotr61.lowOrder ^ shr6.lowOrder); } function shr(x, n) { if (n <= 32) { return new int64(x.highOrder >>> n, x.lowOrder >>> n | (x.highOrder << (32 - n))); } else { return new int64(0, x.highOrder << (32 - n)); } } str = utf8_encode(str); strlen = str.length * charsize; str = str2binb(str); str[strlen >> 5] |= 0x80 << (24 - strlen % 32); str[(((strlen + 128) >> 10) << 5) + 31] = strlen; for (var i = 0; i < str.length; i += 32) { a = H[0]; b = H[1]; c = H[2]; d = H[3]; e = H[4]; f = H[5]; g = H[6]; h = H[7]; for (var j = 0; j < 80; j++) { if (j < 16) { W[j] = new int64(str[j * 2 + i], str[j * 2 + i + 1]); } else { W[j] = safe_add_4(gamma1(W[j - 2]), W[j - 7], gamma0(W[j - 15]), W[j - 16]); } T1 = safe_add_5(h, sigma1(e), ch(e, f, g), K[j], W[j]); T2 = safe_add_2(sigma0(a), maj(a, b, c)); h = g; g = f; f = e; e = safe_add_2(d, T1); d = c; c = b; b = a; a = safe_add_2(T1, T2); } H[0] = safe_add_2(a, H[0]); H[1] = safe_add_2(b, H[1]); H[2] = safe_add_2(c, H[2]); H[3] = safe_add_2(d, H[3]); H[4] = safe_add_2(e, H[4]); H[5] = safe_add_2(f, H[5]); H[6] = safe_add_2(g, H[6]); H[7] = safe_add_2(h, H[7]); } var binarray = []; for (var i = 0; i < H.length; i++) { binarray.push(H[i].highOrder); binarray.push(H[i].lowOrder); } return binb2hex(binarray); }

    return SHA512;
})();


//====================================================================================================
// Description：DateTime.js
//====================================================================================================

/**
 * Description：Date Extend
 **/
(function () {

    //#region Static

    Date.cultureInfo = {
        dayOfWeekShortName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayOfWeekLongName: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        monthShortName: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        monthLongName: ["January", "February", "March", "April", "May", "July", "August", "September", "October", "November", "December"],
        amName: "AM",
        pmName: "PM"
    }

    /**
     * Set Culture Info
     * @param {object} setting
     */
    Date.setCultureInfo = function (setting) {
        Date.cultureInfo = setting;
    }

    /**
     * Set Day Of Week Name (Short)
     * @param {Array} dayOfWeekShortName
     */
    Date.setDayOfWeekShortName = function (dayOfWeekShortName) {
        Date.cultureInfo["dayOfWeekShortName"] = dayOfWeekShortName;
    }

    /**
     * Set Day Of Week Name (Long)
     * @param {Array} dayOfWeekLongName
     */
    Date.setDayOfWeekLongName = function (dayOfWeekLongName) {
        Date.cultureInfo["dayOfWeekLongName"] = dayOfWeekLongName;
    }

    /**
     * Set Month Name (Short)
     * @param {Array} dayOfWeekLongName
     */
    Date.setMonthShortName = function (monthShortName) {
        Date.cultureInfo["monthShortName"] = monthShortName;
    }

    /**
     * Set Month Name (Long)
     * @param {Array} dayOfWeekLongName
     */
    Date.setMonthLongName = function (monthLongName) {
        Date.cultureInfo["monthLongName"] = monthLongName;
    }

    /**
     * Set AM Name And PM Name
     * @param {String} amName
     * @param {String} pmName
     */
    Date.setAmAndPmName = function (amName, pmName) {
        Date.cultureInfo["amName"] = amName;
        Date.cultureInfo["pmName"] = pmName;
    }

    /**
     * Get Now Date
     * @returns {Date} 
     */
    Date.now = function () {
        return new Date();
    };

    /**
     * Get Today Date
     * @returns {Date} 
     */
    Date.today = function () {
        return Date.now().clearTime();
    }

    //#endregion Static


    //#region Basic GET/SET

    /**
     * Set Date Time
     * @param {Object} date
     * @returns {Date} 
     */
    Date.prototype.set = function (date) {
        if (date == null) return this;

        if (!isNaN(date.year)) {
            this.year(date.year);
        }
        if (!isNaN(date.month)) {
            this.month(date.month);
        }
        if (!isNaN(date.day)) {
            this.day(date.day);
        }
        if (!isNaN(date.hours)) {
            this.hours(date.hours);
        }
        if (!isNaN(date.minutes)) {
            this.minutes(date.minutes);
        }
        if (!isNaN(date.seconds)) {
            this.seconds(date.seconds);
        }
        if (!isNaN(date.milliseconds)) {
            this.milliseconds(date.milliseconds);
        }
        return this;
    };

    /** 
     * SET date
     * @param {int} year
     * @param {int} month
     * @param {int} day
     * @returns {Date} 
     */
    Date.prototype.date = function (year, month, day) {
        this.year(year);
        this.month(month);
        this.day(day);
        return this;
    };

    /** 
     * SET date
     * @param {int} rocYear
     * @param {int} month
     * @param {int} day
     * @returns {Date} 
     */
    Date.prototype.rocDate = function (rocYear, month, day) {
        this.rocYear(year);
        this.month(month);
        this.day(day);
        return this;
    };

    /** 
     * SET time
     * @param {int} hours
     * @param {int} minutes
     * @param {int} seconds
     * @param {int} milliseconds
     * @returns {Date} 
     */
    Date.prototype.time = function (hours, minutes, seconds, milliseconds) {
        this.hours(hours);
        this.minutes(minutes);
        this.seconds(seconds);
        this.milliseconds(milliseconds);
        return this;
    };

    /**
     * SET datetime
     * @param {int} year
     * @param {int} month
     * @param {int} day
     * @param {int} hours
     * @param {int} minutes
     * @param {int} seconds
     * @param {int} milliseconds
     * @returns {Date} 
     */
    Date.prototype.datetime = function (year, month, day, hours, minutes, seconds, milliseconds) {
        this.date(year, month, day);
        this.time(hours, minutes, seconds, milliseconds);
        return this;
    }

    /**
     * SET datetime
     * @param {int} rocYear
     * @param {int} month
     * @param {int} day
     * @param {int} hours
     * @param {int} minutes
     * @param {int} seconds
     * @param {int} milliseconds
     * @returns {Date} 
     */
    Date.prototype.rocDatetime = function (rocYear, month, day, hours, minutes, seconds, milliseconds) {
        this.rocDate(rocYear, month, day);
        this.time(hours, minutes, seconds, milliseconds);
        return this;
    };

    /** 
     * GET/SET year
     * @param {int} year
     * @returns {int} 
     */
    Date.prototype.year = function (year) {
        if (!isNaN(year)) {
            this.setFullYear(year);
        }
        return this.getFullYear();
    };

    /**
     * GET/SET ROC year
     * @param {int} year
     * @returns {int} 
     */
    Date.prototype.rocYear = function (year) {
        if (!isNaN(year)) {
            this.setFullYear(year + 1911);
        }
        return this.getFullYear() - 1911;
    };

    /** 
     * GET/SET month
     * @param {int} month
     * @returns {int} 
     */
    Date.prototype.month = function (month) {
        if (!isNaN(month)) {
            this.setMonth(month);
        }
        return this.getMonth();
    };

    /** 
     * GET/SET date
     * @param {int} date
     * @returns {int} 
     */
    Date.prototype.day = function (day) {
        if (!isNaN(day)) {
            this.setDate(day);
        }
        return this.getDate();
    };

    /** 
     * GET day
     * @returns {int} 
     */
    Date.prototype.dayOfWeek = function () {
        return this.getDay();
    };

    /** 
    * GET/SET hours
    * @param {int} hours
    * @returns {int} 
    */
    Date.prototype.hours = function (hours) {
        if (!isNaN(hours)) {
            this.setHours(hours);
        }
        return this.getHours();
    };

    /** 
     * GET/SET minutes
     * @param {int} minutes
     * @returns {int} 
     */
    Date.prototype.minutes = function (minutes) {
        if (!isNaN(minutes)) {
            this.setMinutes(minutes);
        }
        return this.getMinutes();
    };

    /** 
     * GET/SET seconds
     * @param {int} seconds
     * @returns {int} 
     */
    Date.prototype.seconds = function (seconds) {
        if (!isNaN(seconds)) {
            this.setSeconds(seconds);
        }
        return this.getSeconds();
    };

    /** 
     * GET/SET milliseconds
     * @param {int} milliseconds
     * @returns {int} 
     */
    Date.prototype.milliseconds = function (milliseconds) {
        if (!isNaN(milliseconds)) {
            this.setMilliseconds(milliseconds);
        }
        return this.getMilliseconds();
    };

    /**
     * Get Month Name (Short)
     * @param {int} month
     * @returns {String} 
     */
    Date.prototype.getMonthShortName = function (month) {
        var monthValue = month || this.month();

        if (monthValue <= 0 || monthValue > 12) {
            return monthValue;
        }

        var monthName = Date.cultureInfo.monthShortName[monthValue - 1] || monthValue;
        return monthName;
    };

    /**
    * Get Month Name (Long)
    * @param {int} month
    * @param {boolean} isShort
    * @returns {String} 
    */
    Date.prototype.getMonthLongName = function (month) {
        var monthValue = month || this.month();

        if (monthValue <= 0 || monthValue > 12) {
            return monthValue;
        }

        var monthName = Date.cultureInfo.monthLongName[monthValue - 1] || monthValue;
        return monthName;
    };

    /**
     * Get Day of Week Name (Short)
     * @param {int} month
     * @returns {String} 
     */
    Date.prototype.getDayOfWeekShortName = function (day) {
        var dayOfWeek = day || this.dayOfWeek();

        if (dayOfWeek < 0 || dayOfWeek > 7) {
            return dayOfWeek;
        }

        var dayOfWeekName = Date.cultureInfo.dayOfWeekShortName[dayOfWeek] || dayOfWeek;
        return dayOfWeekName;
    };

    /**
    * Get Day of Week (Long)
    * @param {int} month
    * @returns {String} 
    */
    Date.prototype.getDayOfWeekLongName = function (day) {
        var dayOfWeek = day || this.dayOfWeek();

        if (dayOfWeek < 0 || dayOfWeek > 7) {
            return dayOfWeek;
        }

        var dayOfWeekName = Date.cultureInfo.dayOfWeekLongName[dayOfWeek] || dayOfWeek;
        return dayOfWeekName;
    };

    /**
     * Get AM Name or PM Name
     * @param {int} hours
     * @returns {String} 
     */
    Date.prototype.getAmPmName = function (hours) {
        var hoursValue = hours || this.hours();

        if (hoursValue < 0 || hoursValue >= 24) {
            return "";
        }

        if (hoursValue >= 12) {
            return Date.cultureInfo.pmName;
        }
        else {
            return Date.cultureInfo.amName;
        }

    };

    /**
     * Covert 12 Hour System To 24 Hour System
     * @param {int} hours
     * @param {boolean} isPM
     * @returns {int} 
     */
    Date.prototype.to24HourSystem = function (hours, isPM) {
        var newHours = hours || this.hours();

        if (isPM && newHours > 0) {
            newHours += 12;
        }
        return newHours;
    };

    /**
     * Covert 24 Hour System To 12 Hour System
     * @param {int} hours
     * @returns {int} 
     */
    Date.prototype.to12HourSystem = function (hours) {
        var newHours = hours || this.hours();

        if (newHours > 12) {
            newHours -= 12;
        }

        return newHours;
    };

    /**
     * AD Year To ROC Year
     * @param {int} year
     * @returns {iny} 
     */
    Date.prototype.toRocYear = function (year) {
        var newYear = year || this.year();

        return year - 1911
    };

    /**
     * ROC Year To AD Year
     * @param {int} year
     * @returns {iny} 
     */
    Date.prototype.toADYear = function (rocYear) {
        return rocYear + 1911;
    };

    //#endregion Basic GET/SET


    //#region Basic Operator

    /**
     * Clear Time
     * @returns {Date} 
     */
    Date.prototype.clearTime = function () {
        this.time(0, 0, 0, 0);
        return this;
    };

    //#endregion Basic Operator


    //#region Extend Operator

    /** 
     * Parse DateTimeString
     * @param {string} dateTimeString
     * @returns {Date} 
     */
    Date.prototype.parseDateTimeString = function (dateTimeString) {
        var date = new Date(Date.parse(dateTimeString));
        var dateTime = new Date(date.year(), date.month(), date.day(),
        						date.hours(), date.minutes(), date.seconds(),
        						date.milliseconds());
        this.setTime(dateTime.getTime());
        return this;
    };

    /** 
     * Parse DateString
     * @param {string} dateString
     * @returns {Date} 
     */
    Date.prototype.parseDateString = function (dateString) {
        var date = new Date(Date.parse(dateString));
        var dateTime = (new Date(date.year(), date.month(), date.day())).clearTime();
        this.setTime(dateTime.getTime());
        return this;
    };

    /** 
     * Parse Time
     * @param {string} timeString
     * @returns {Date} 
     */
    Date.prototype.parseTimeString = function (timeString) {
        var dateTimeString = (new Date().toFormatString("YYYY-MM-DD")) + " " + timeString;
        var date = new Date(Date.parse(dateTimeString));
        var dateTime = new Date(date.year(), date.month(), date.day(),
        						date.hours(), date.minutes(), date.seconds(),
        						date.milliseconds());
        this.setTime(dateTime.getTime());
        return this;
    };

    /**
     * To Format String
     * @param {String} format
     * @returns {String} 
     */
    Date.prototype.toFormatString = function (format) {
        var dateTimeString = format || "YYYY-MM-DD HH:mm:ss.fff";
        var self = this;

        /**
         * PreFix Integer
         * @param {String} text
         * @param {int} number
         * @returns {String} 
         */
        var prefixInteger = function (text, length) {
            return (Array(length).join('0') + text).slice(-length);
        }

        return dateTimeString.replace(/YY?Y?Y?|MM?M?M?|DD?D?D?|HH?|hh?|mm?|ss?|ff?f?/g, function (format) {
            switch (format) {
                case "YYYY": return prefixInteger(self.year(), format.length);
                case "YYY": return prefixInteger(self.year(), format.length);
                case "YY": return prefixInteger(self.year(), format.length);
                case "Y": return self.year();
                case "MMMM": return self.getMonthLongName(self.month() + 1);
                case "MMM": return self.getMonthShortName(self.month() + 1);
                case "MM": return prefixInteger(self.month() + 1, format.length);
                case "M": return self.month() + 1;
                case "DDDD": return self.getDayOfWeekLongName(self.dayOfWeek());
                case "DDD": return self.getDayOfWeekShortName(self.dayOfWeek());
                case "DD": return prefixInteger(self.day(), format.length);
                case "D": return self.day();
                case "HH": return prefixInteger(self.hours(), format.length);
                case "H": return self.hours();
                case "hh": return self.getAmPmName(self.hours()) + " " + prefixInteger(self.to12HourSystem(self.hours()), format.length);
                case "h": return self.getAmPmName(self.hours()) + " " + self.to12HourSystem(self.hours());
                case "mm": return prefixInteger(self.minutes(), format.length);
                case "m": return self.minutes();
                case "ss": return prefixInteger(self.seconds(), format.length);
                case "s": return self.seconds();
                case "fff": return prefixInteger(self.milliseconds(), format.length);
                case "ff": return prefixInteger(self.milliseconds(), format.length);
                case "f": return self.milliseconds();
            }
        });
    };

    /**
     * To Format String
     * @param {String} format
     * @returns {String} 
     */
    Date.prototype.toROCFormatString = function (format) {
        var dateTimeString = this.toFormatString(format || "民國y年M月D日 H時m分s秒");
        var self = this;

        /**
         * PreFix Integer
         * @param {String} text
         * @param {int} number
         * @returns {String} 
         */
        var prefixInteger = function (text, length) {
            return (Array(length).join('0') + text).slice(-length);
        }

        /**
         * Parse ROC Year
         * @param {int} year
         * @param {int} number
         *  @returns {String} 
         */
        var parseROCYear = function (year, number) {
            var rocYear = self.toRocYear(year);

            if (rocYear > 0) {
                if (number === 1) {
                    return rocYear;
                }
                else {
                    return prefixInteger(rocYear, number);
                }
            }
            else {
                if (number === 1) {
                    return "前" + ((rocYear - 1) * -1);
                }
                else {
                    return "前" + prefixInteger(((rocYear - 1) * -1), number);
                }
            }
        }

        return dateTimeString.replace(/yy?y?/g, function (format) {
            switch (format) {
                case "yyy": return parseROCYear(self.year(), format.length);
                case "yy": return parseROCYear(self.year(), format.length);
                case "y": return parseROCYear(self.year(), format.length);
            }
        });
    };

    //#endregion Extend Operator


    //#region Date Calculator

    /**
     * Add Date Duration
     * @param {Object} dateDuration
     * @returns {Date} 
     */
    Date.prototype.add = function (dateDuration) {
        if (dateDuration == null) return this;

        if (!isNaN(dateDuration.years)) {
            this.addYear(dateDuration.years);
        }
        if (!isNaN(dateDuration.months)) {
            this.addMonth(dateDuration.months);
        }
        if (!isNaN(dateDuration.days)) {
            this.addDay(dateDuration.days);
        }
        if (!isNaN(dateDuration.hours)) {
            this.addHours(dateDuration.hours);
        }
        if (!isNaN(dateDuration.minutes)) {
            this.addMinutes(dateDuration.minutes);
        }
        if (!isNaN(dateDuration.seconds)) {
            this.addSeconds(dateDuration.seconds);
        }
        if (!isNaN(dateDuration.milliseconds)) {
            this.addMilliseconds(dateDuration.milliseconds);
        }
        return this;
    };

    /** 
     * Year Calculator
     * @param {int} year
     * @returns {Date} 
     */
    Date.prototype.addYear = function (year) {
        this.year(this.year() + year);
        return this;
    };

    /** 
     * Month Calculator
     * @param {int} month
     * @returns {Date} 
     */
    Date.prototype.addMonth = function (month) {
        this.month(this.month() + month);
        return this;
    };

    /** 
     * Date Calculator
     * @param {int} date
     * @returns {Date} 
     */
    Date.prototype.addDay = function (day) {
        this.day(this.day() + day);
        return this;
    };

    /** 
     * Hours Calculator
     * @param {int} hours
     * @returns {Date} 
     */
    Date.prototype.addHours = function (hours) {
        this.hours(this.hours() + hours);
        return this;
    };

    /** 
     * Minutes Calculator
     * @param {int} minutes
     * @returns {Date} 
     */
    Date.prototype.addMinutes = function (minutes) {
        this.minutes(this.minutes() + minutes);
        return this;
    };

    /** 
     * Seconds Calculator
     * @param {int} seconds
     * @returns {Date} 
     */
    Date.prototype.addSeconds = function (seconds) {
        this.seconds(this.seconds() + seconds);
        return this;
    };

    /** 
     * Milliseconds Calculator
     * @param {int} milliseconds
     * @returns {Date} 
     */
    Date.prototype.addMilliseconds = function (milliseconds) {
        this.milliseconds(this.milliseconds() + milliseconds);
        return this;
    };

    /** 
     * Year+1
     * @returns {Date} 
     */
    Date.prototype.nextYear = function () {
        return this.addYear(1);
    };

    /** 
     * Year-1
     * @returns {Date} 
     */
    Date.prototype.lastYear = function () {
        return this.addYear(-1);
    };

    /** 
     * Month+1
     * @returns {Date} 
     */
    Date.prototype.nextMonth = function () {
        return this.addMonth(1);
    };

    /** 
     * Month-1
     * @returns {Date} 
     */
    Date.prototype.lastMonth = function () {
        return this.addMonth(-1);
    };

    Date.prototype.nextWeek = function () {
        return this.addMonth(7);
    };

    Date.prototype.lastWeek = function () {
        return this.addMonth(-7);
    };

    /** 
     * Day+1
     * @returns {Date} 
     */
    Date.prototype.nextDay = function () {
        return this.addDay(1);
    };

    /**
     * Date-1
     * @returns {Date} 
     */
    Date.prototype.lastDay = function () {
        return this.addDay(-1);
    };

    /** 
     * Hours+1
     * @returns {Date} 
     */
    Date.prototype.nextHours = function () {
        return this.addHours(1);
    };

    /** 
     * Hours-1
     * @returns {Date} 
     */
    Date.prototype.lastHours = function () {
        return this.addHours(-1);
    };

    /** 
     * Minutes+1
     * @returns {Date} 
     */
    Date.prototype.nextMinutes = function () {
        return this.addMinutes(1);
    };

    /** 
     * Minutes-1
     * @returns {Date} 
     */
    Date.prototype.lastMinutes = function () {
        return this.addMinutes(-1);
    };

    /** 
     * Seconds+1
     * @returns {Date} 
     */
    Date.prototype.nextSeconds = function () {
        return this.addSeconds(1);
    };

    /** 
     * Seconds-1
     * @returns {Date} 
     */
    Date.prototype.lastSeconds = function () {
        return this.addSeconds(-1);
    };

    /** 
     * 毫秒數+1
     * @returns {Date} 
     */
    Date.prototype.nextMilliseconds = function () {
        return this.addMilliseconds(1);
    };

    /** 
     * 毫秒數-1
     * @returns {Date} 
     */
    Date.prototype.lastMilliseconds = function () {
        return this.addMilliseconds(-1);
    };

    /**
     * Next Sunday
     * @returns {Date} 
     */
    Date.prototype.nextSunday = function () {
        return this.nextDayOfWeek(0);
    };

    /**
     * Last Sunday
     * @returns {Date} 
     */
    Date.prototype.lastSunday = function () {
        return this.lastDayOfWeek(0);
    };

    /**
     * Next Monday
     * @returns {Date} 
     */
    Date.prototype.nextMonday = function () {
        return this.nextDayOfWeek(1);
    };

    /**
     * Last Monday
     * @returns {Date} 
     */
    Date.prototype.lastMonday = function () {
        return this.lastDayOfWeek(1);
    };

    /**
     * Next Tuesday
     * @returns {Date} 
     */
    Date.prototype.nextTuesday = function () {
        return this.nextDayOfWeek(2);
    };

    /**
     * Last Tuesday
     * @returns {Date} 
     */
    Date.prototype.lastTuesday = function () {
        return this.lastDayOfWeek(2);
    };

    /**
     * Next Sunday
     * @returns {Date} 
     */
    Date.prototype.nextWednesday = function () {
        return this.nextDayOfWeek(3);
    };

    /**
     * Last Sunday
     * @returns {Date} 
     */
    Date.prototype.lastWednesday = function () {
        return this.lastDayOfWeek(3);
    };

    /**
     * Next Thursday 
     * @returns {Date} 
     */
    Date.prototype.nextThursday = function () {
        return this.nextDayOfWeek(4);
    };

    /**
     * Last Thursday 
     * @returns {Date} 
     */
    Date.prototype.lastThursday = function () {
        return this.lastDayOfWeek(4);
    };

    /**
     * Next Friday
     * @returns {Date} 
     */
    Date.prototype.nextFriday = function () {
        return this.nextDayOfWeek(5);
    };

    /**
     * Last Friday
     * @returns {Date} 
     */
    Date.prototype.lastFriday = function () {
        return this.lastDayOfWeek(5);
    };

    /**
     * Next Saturday
     * @returns {Date} 
     */
    Date.prototype.nextSaturday = function () {
        return this.nextDayOfWeek(6);
    };

    /**
     * Last Saturday
     * @returns {Date} 
     */
    Date.prototype.lastSaturday = function () {
        return this.lastDayOfWeek(6);
    };

    /**
     * Next Day Of Week
     * @param {int} dayofWeek
     * @returns {Date} 
     */
    Date.prototype.nextDayOfWeek = function (dayofWeek) {
        var today = this.dayOfWeek();

        var duaration = 7 + (dayofWeek - today);
        duaration = (duaration % 7 == 0) ? duaration : duaration % 7;
        this.addDay(duaration);
        return this;
    };

    /**
     * Last Day Of Week
     * @param {int} dayofWeek
     * @returns {Date} 
     */
    Date.prototype.lastDayOfWeek = function (dayofWeek) {
        var today = this.dayOfWeek();

        var duaration = -7 - (today - dayofWeek);
        duaration = (duaration % 7 == 0) ? duaration : duaration % 7;
        this.addDay(duaration);
        return this;
    };

    //#endregion Date Calculator


    //#region Compare

    /**
     * Compare
     * @returns {boolean} 
     */
    Date.prototype.isDayOfWeek = function (dayOffWeek) {
        return (this.dayOfWeek == dayOffWeek);
    };

    /**
     * Compare
     * @returns {boolean} 
     */
    Date.prototype.isSunday = function () {
        return this.isDayOfWeek(0);
    };

    /**
     * Compare
     * @returns {boolean} 
     */
    Date.prototype.isMonday = function () {
        return this.isDayOfWeek(1);
    };

    /**
     * Compare
     * @returns {boolean} 
     */
    Date.prototype.isTuesday = function () {
        return this.isDayOfWeek(2);
    };

    /**
     * Compare
     * @returns {boolean} 
     */
    Date.prototype.isWednesday = function () {
        return this.isDayOfWeek(3);
    };

    /**
     * Compare
     * @returns {boolean} 
     */
    Date.prototype.isThursday = function () {
        return this.isDayOfWeek(4);
    };

    /**
     * Compare
     * @returns {boolean} 
     */
    Date.prototype.isFriday = function () {
        return this.isDayOfWeek(5);
    };

    /**
     * Compare
     * @returns {boolean} 
     */
    Date.prototype.isSaturday = function () {
        return this.isDayOfWeek(6);
    };

    //#endregion Compare
})();


/**
 * @class {Dictionary} JavaScript Date CultureInfo
 **/
var DateCultureInfo = (function () {
    function DateCultureInfo() {
    }

    DateCultureInfo.en_US = function () {
        return {
            dayOfWeekShortName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayOfWeekLongName: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            monthShortName: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            monthLongName: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            amName: "AM",
            pmName: "PM"
        };
    };

    DateCultureInfo.zh_TW = function () {
        return {
            dayOfWeekShortName: ["日", "一", "二", "三", "四", "五", "六"],
            dayOfWeekLongName: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            monthShortName: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
            monthLongName: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            amName: "上午",
            pmName: "下午"
        };
    };

    return DateCultureInfo;
})();


/**
 * @class {Dictionary} JavaScript Date Period
 **/
var DatePeriod = (function () {

    //#region Constructor

    function DatePeriod() {
    }

    /**
     * Get Instance
     * @returns {DatePeriod} 
     */
    DatePeriod.getInstance = function () {
        return new DatePeriod();
    }

    //#endregion Constructor


    //#region Private Method

    /**
     * Get StartDate And EndDate
     * @param {Date} startDate
     * @param {Date} endDate
     * @returns {Object} 
     */
    DatePeriod.prototype._getDatePeriod = function (startDate, endDate) {
        var datePeriod = {
            start: startDate,
            end: endDate
        }
        return datePeriod;
    };


    //#endregion Private Method


    //#region Public Method

    /**
     * Get Year Period
     * @param {Date} date
     * @returns {Object} 
     */
    DatePeriod.prototype.getYearPeriod = function (date) {
        // Start Date
        var startDate = new Date(date);
        startDate.date(date.year(), 0, 0).nextDay();
        startDate.clearTime();

        // End Date
        var endDate = new Date(startDate);
        console.log(startDate.toFormatString());
        console.log(endDate.toFormatString());
        endDate.nextYear().lastMilliseconds();

        return this._getDatePeriod(startDate, endDate);
    };

    /**
     * Get Month Period
     * @param {Date} date
     * @returns {Object} 
     */
    DatePeriod.prototype.getMonthPeriod = function (date) {
        // Start Date
        var startDate = new Date(date);
        startDate.date(date.year(), date.month(), 0).nextDay();
        startDate.clearTime();

        // End Date
        var endDate = new Date(startDate);
        endDate.nextMonth().lastMilliseconds();

        return this._getDatePeriod(startDate, endDate);
    };

    /**
     * Get Week Period
     * @param {Date} date
     * @param {boolean} isMondayFirst
     * @returns {Object} 
     */
    DatePeriod.prototype.getWeekPeriod = function (date, isMondayFirst) {
        // Monday First
        var dayOfWeek = date.dayOfWeek();
        if (isMondayFirst !== undefined && isMondayFirst === true) {
            dayOfWeek--;
            if (dayOfWeek < 0) {
                dayOfWeek = 6;
            }
        }

        // Start Date
        var startDate = new Date(date);
        startDate.addDay(-dayOfWeek);
        startDate.clearTime();

        // End Date
        var endDate = new Date(date);
        endDate.clearTime();
        endDate.addDay(7 - dayOfWeek).lastMilliseconds();

        return this._getDatePeriod(startDate, endDate);
    };

    /**
     * Get Day Period
     * @param {Date} date
     * @returns {Object} 
     */
    DatePeriod.prototype.getDayPeriod = function (date) {
        // Start Date
        var startDate = new Date(date);
        startDate.date(date.year(), date.month(), date.day());
        startDate.clearTime();

        // End Date
        var endDate = new Date(startDate);
        endDate.nextDay().lastMilliseconds();

        return this._getDatePeriod(startDate, endDate);
    };

    /**
     * Get Hour Period
     * @param {Date} date
     * @returns {Object} 
     */
    DatePeriod.prototype.getHourPeriod = function (date) {
        // Start Date
        var startDate = new Date(date);
        startDate.date(date.year(), date.month(), date.day());
        startDate.time(date.hours(), 0, 0, 0);

        // End Date
        var endDate = new Date(startDate);
        endDate.nextHours().lastMilliseconds();

        return this._getDatePeriod(startDate, endDate);
    };

    /**
     * Get Minute Period
     * @param {Date} date
     * @returns {Object} 
     */
    DatePeriod.prototype.getMinutePeriod = function (date) {
        // Start Date
        var startDate = new Date(date);
        startDate.date(date.year(), date.month(), date.day());
        startDate.time(date.hours(), date.minutes(), 0, 0);

        // End Date
        var endDate = new Date(startDate);
        endDate.nextMinutes().lastMilliseconds();

        return this._getDatePeriod(startDate, endDate);
    };

    /**
     * Get Second Period
     * @param {Date} date
     * @returns {Object} 
     */
    DatePeriod.prototype.getSecondPeriod = function (date) {
        // Start Date
        var startDate = new Date(date);
        startDate.date(date.year(), date.month(), date.day());
        startDate.time(date.hours(), date.minutes(), date.seconds(), 0);

        // End Date
        var endDate = new Date(startDate);
        endDate.nextSeconds().lastMilliseconds();

        return this._getDatePeriod(startDate, endDate);
    };


    //#endregion Public Method


    return DatePeriod;
})();


/**
 * @class {Dictionary} JavaScript Date Duration
 **/
var DateDuration = (function () {

    //#region Constructor

    function DateDuration() {
    }

    DateDuration.getInstance = function () {
        return new DateDuration();
    }

    //#endregion Constructor


    //#region Public Method

    /**
     * @param {Date} fromDate
     * @param {Date} toDate
     * @returns {double}
     */
    DateDuration.prototype.durationSeconds = function (fromDate, toDate) {
        var diffMilliseconds = toDate - fromDate;
        return Number((diffMilliseconds / 1000).toFixed(1));
    };

    /**
     * @param {Date} fromDate
     * @param {Date} toDate
     * @returns {double}
     */
    DateDuration.prototype.durationMintues = function (fromDate, toDate) {
        var diffSeconds = this.durationSeconds(fromDate, toDate);
        return Number((diffSeconds / 60).toFixed(1));
    };

    /**
     * @param {Date} fromDate
     * @param {Date} toDate
     * @returns {double}
     */
    DateDuration.prototype.durationHours = function (fromDate, toDate) {
        var diffMintues = this.durationMintues(fromDate, toDate);
        return Number((diffMintues / 60).toFixed(1));
    };

    /**
     * @param {Date} fromDate
     * @param {Date} toDate
     * @returns {double}
     */
    DateDuration.prototype.durationDays = function (fromDate, toDate) {
        var diffHours = this.durationHours(fromDate, toDate);
        return Number((diffHours / 24).toFixed(1));
    };

    /**
     * @param {Date} fromDate
     * @param {Date} toDate
     * @returns {double}
     */
    DateDuration.prototype.durationWeeks = function () {
        var diffDays = this.durationDays(fromDate, toDate);
        return Number((diffDays / 7).toFixed(1));
    };

    /**
     * @param {Date} fromDate
     * @param {Date} toDate
     * @returns {double}
     */
    DateDuration.prototype.durationMonths = function (fromDate, toDate) {
        var diffDays = this.durationDays(fromDate, toDate);
        return Number((diffDays / 30).toFixed(1));
    };

    /**
     * @param {Date} fromDate
     * @param {Date} toDate
     * @returns {double}
     */
    DateDuration.prototype.durationYears = function (fromDate, toDate) {
        var diffDays = this.durationDays(fromDate, toDate);
        return Number((diffDays / 365).toFixed(1));
    };

    //#endregion Public Method

    return DateDuration;
})();


//====================================================================================================
// Description：DigitalConvert.js
//====================================================================================================

var DigitalConvert = (function () {
    function DigitalConvert() {
    }

    /**
     * Number To Letters
     * @param {int} num
     * @returns {string} 
     */
    DigitalConvert.numberToLetters = function (number) {
        var letterCount = 26;
        var startLetterCode = 'A'.charCodeAt(0);
        var result = "";

        if (number < 0) return result;

        do {
            result = String.fromCharCode(startLetterCode + number % letterCount) + result;
            number /= letterCount;
        }
        while (--number >= 0);
        return result;
    }

    /**
     * Letters To Number
     * @param {string} text
     * @returns {int} 
     */
    DigitalConvert.lettersToNumber = function (text) {
        var letterCount = 26;
        var startLetterCode = 'A'.charCodeAt(0);

        if (!text.match(/^[a-zA-z]+$/)) return -1;

        var result = 0;
        var letters = text.toUpperCase();

        for (var i = 0; i < letters.length; i++) {
            var letterCode = letters.charCodeAt(i);
            result = result * letterCount + (letterCode - startLetterCode + 1);
        }

        return result - 1;
    }

    /**
     * Number To Roman Number
     * @param {int} number
     * @returns {string} 
     */
    DigitalConvert.numberToRomanNumber = function (number) {
        if (number <= 0) return "";

        var romanNumberMap = [
            { 1000000: "m" },
            { 500000: "d" },
            { 100000: "c" },
            { 50000: "l" },
            { 10000: "x" },
            { 5000: "v" },
            { 4000: "Mv" },
            { 1000: "M" },
            { 900: "CM" },
            { 500: "D" },
            { 400: "CD" },
            { 100: "C" },
            { 90: "XC" },
            { 50: "L" },
            { 40: "XL" },
            { 10: "X" },
            { 9: "IX" },
            { 5: "V" },
            { 4: "IV" },
            { 1: "I" }
        ];

        var roman = "";

        for (var i = 0; i < romanNumberMap.length; i++) {
            var item = romanNumberMap[i];
            var key = parseInt(Object.keys(item)[0]);
            while (number >= key) {
                roman += item[key];
                number -= key;
            }
        }

        return roman;
    }

    /**
     * Roman Number To Number
     * @param {string} roman
     * @returns {int} 
     */
    DigitalConvert.romanNumberToNumber = function (roman) {
        if (!roman.match(/^[I|V|X|L|C|D|M|v|x|l|c|d|m]+$/)) return -1;

        var romanNumberMap = {
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
        var total = 0;

        var current = 0;
        var previous = 0;
        var currentRoman = '\0'
        var previousRoman = '\0';

        for (var i = 0; i < roman.length; i++) {
            currentRoman = roman.charAt(i);

            previous = previousRoman != '\0' ? romanNumberMap[previousRoman] : '\0';
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

    return DigitalConvert;
})();


//====================================================================================================
// Description：String.js
//====================================================================================================

/**
 * Description：String Extend
 **/
(function () {
    /** 
     * String Format (C#)
     * @returns {string}
     */
    String.format = function () {
        var s = arguments[0];
        for (var i = 0; i < arguments.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, arguments[i + 1]);
        }
        return s;
    };

    /** 
     * String Format (Java、C++、PHP)
     * @returns {string}
     */
    String.sprintf = function () {
        var args = arguments;
        var text = args[0];
        var index = 1;
        return text.replace(/%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd])/g, function (exp, p0, p1, p2, p3, p4) {
            if (exp == '%%') return '%';
            if (index >= args.length) return exp;
            var exp = p2 ? parseInt(p2.substr(1)) : undefined;
            var base = p3 ? parseInt(p3.substr(1)) : undefined;
            var val;
            switch (p4) {
                case 's': val = args[index++]; break;
                case 'c': val = args[index++][0]; break;
                case 'f': val = parseFloat(args[index++]).toFixed(exp); break;
                case 'p': val = parseFloat(args[index++]).toPrecision(exp); break;
                case 'e': val = parseFloat(args[index++]).toExponential(exp); break;
                case 'x': val = parseInt(args[index++]).toString(base ? base : 16); break;
                case 'd': val = parseFloat(parseInt(args[index++], base ? base : 10).toPrecision(exp)).toFixed(0); break;
            }
            val = typeof (val) == 'object' ? JSON.stringify(val) : val.toString(base);
            var sz = parseInt(p1); /* padding size */
            var ch = p1 && p1[0] == '0' ? '0' : ' '; /* isnull? */
            while (val.length < sz) val = p0 !== undefined ? val + ch : ch + val; /* isminus? */
            return val;
        });
    };

    /** 
     * String Empty
     * @returns {string}
     */
    String.empty = function () {
        return "";
    };

    /** 
     * String Is Empty
     * @returns {bool}
     */
    String.prototype.isEmpty = function () {
        return (this === undefined || this.length === 0);
    };

    /**
     * String Is Null
     * @returns {boolean} 
     */
    String.prototype.isNull = function () {
        return this === undefined;
    };

    /**
     * Strgin Equals
     * @param {String} text
     */
    String.prototype.equals = function (text) {
        return (this === text);
    };

    /**
     * Strgin Equals Ignore Case
     * @param {String} text
     */
    String.prototype.equalsIgnoreCase = function (text) {
        return (this.toUpperCase() === text.toUpperCase());
    };

    /**
     * Trim String
     * @param {String} trimStr
     * @returns {String}
     */
    String.prototype.trim = function (trimStr) {
        return this.trimStart(trimStr).trimEnd(trimStr);
    };

    /**
     * Trim String (Start)
     * @param {String} trimStr
     * @returns {String}
     */
    String.prototype.trimStart = function (trimStr) {
        var newtempStr = (trimStr) ? trimStr : " ";
        var tempStr = this;

        while (true) {
            if (tempStr.substr(0, newtempStr.length) != newtempStr) {
                break;
            }
            tempStr = tempStr.substr(newtempStr.length);
        }

        return tempStr;
    };

    /**
     * Trim String (End)
     * @param {String} trimStr
     * @returns {String}
     */
    String.prototype.trimEnd = function (trimStr) {
        var newtempStr = (trimStr) ? trimStr : " ";
        var tempStr = this;

        while (true) {
            if (tempStr.substr(tempStr.length - newtempStr.length, newtempStr.length) != newtempStr) {
                break;
            }
            tempStr = tempStr.substr(0, tempStr.length - newtempStr.length);
        }
        return tempStr;
    };
})();

//====================================================================================================
// Description：Timing.js
//====================================================================================================

var Timing = (function () {
    function Timing() {
        this._timeoutTimer = undefined;
        this._intervalTimer = undefined;
    }

    /**
     * Sleep
     * @param {int} milliseconds
     */
    Timing.sleep = function (milliseconds) {
        var time = new Date().getTime();
        while (new Date().getTime() - time < milliseconds);
    };

    /**
     * Start Delayed
     * @param {function} callback
     * @param {int} milliseconds
     */
    Timing.prototype.startDelayed = function (callback, milliseconds) {
        this._timeoutTimer = window.setTimeout(callback, milliseconds);
    };

    /**
     * Stop Delayed
     */
    Timing.prototype.stopDelayed = function () {
        if (this._timeoutTimer != undefined) {
            window.clearTimeout(this._timeoutTimer);
            this._timeoutTimer = undefined;
        }
    };

    /**
     * Start Timer
     * @param {function} callback
     * @param {int} milliseconds
     */
    Timing.prototype.startTimer = function (callback, milliseconds) {
        this._intervalTimer = window.setInterval(callback, milliseconds);
    };

    /**
     * Stop Timer
     */
    Timing.prototype.stopTimer = function () {
        if (this._intervalTimer != undefined) {
            window.clearInterval(this._intervalTimer);
            this._intervalTimer = undefined;
        }
    };

    return Timing;
})();



//====================================================================================================
// Description：UidGenerator.js
//====================================================================================================

var UidGenerator = (function () {

    function UidGenerator() {
    }

    /**
     * Get Guid
     * @returns {String} 
     */
    UidGenerator.newGuid = function () {
        var text = "";
        var possible = "0123456789ABCDEF";

        for (var i = 0; i < 35; i++) {

            switch (i) {
                case 8:
                case 13:
                case 18:
                    text += "-";
                    break;
                case 14:
                    text += "4";
                default:
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                    break;
            }
        }

        return text;
    };

    /**
     * Get Uuid
     * @returns {String} 
     */
    UidGenerator.newUuid = function () {
        var text = "";
        var possible = "0123456789ABCDEF";

        for (var i = 0; i < 36; i++) {

            switch (i) {
                case 8:
                case 13:
                case 18:
                case 23:
                    text += "-";
                    break;
                case 14:
                    text += "4";
                default:
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                    break;
            }
        }

        return text;
    };

    /**
     * Get Uid
     * @param {int} length
     * @param {String} charSet
     * @returns {String} 
     */
    UidGenerator.newUid = function (length, charSet) {
        var text = "";
        var uidLength = length || 16;
        var possible = charSet || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < uidLength; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    };

    /**
     * Get Decimal Uid
     * @param {int} length
     * @returns {string} 
     */
    UidGenerator.newDecUid = function (length) {
        var charSet = "0123456789";
        return UidGenerator.newUid(length, charSet);
    };

    /**
     * Get Hex Uid
     * @param {int} length
     * @returns {string} 
     */
    UidGenerator.newHexUid = function (length) {
        var charSet = "0123456789ABCDEF";
        return UidGenerator.newUid(length, charSet);
    };

    /**
     * Get Letter Uid
     * @param {type} length
     */
    UidGenerator.newLetterUid = function (length) {
        var charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        return UidGenerator.newUid(length, charSet);
    };

    return UidGenerator;
})();



//====================================================================================================
// Description：Uri.js
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
        if (isHttpsOnly) config["secure"] = isHttpsOnly;
        if (path) config["path"] = path;
        if (domain) config["domain"] = domain;

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
            cookieString += (key + "=" + cookieConfig[key]);
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
                    var key = pairKeyValue[0].trim();
                    var value = pairKeyValue[1];
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