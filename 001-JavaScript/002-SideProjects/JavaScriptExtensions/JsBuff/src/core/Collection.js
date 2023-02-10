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
     * Check Any
     * @param {function} filter
     * @returns {boolean} 
     */
    Array.prototype.any = function (filter = null) {
        if (this.length === 0) {
            return false;
        }

        if (filter && typeof filter === 'function') {
            for (var i = 0; i < this.length; i++) {
                if (filter(this[i])) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    }

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
            if (this[i] !== array[i])    return false;
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