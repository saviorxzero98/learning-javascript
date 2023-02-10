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
    String.prototype.trim = function(trimStr) {
        return this.trimStart(trimStr).trimEnd(trimStr);
    };

    /**
     * Trim String (Start)
     * @param {String} trimStr
     * @returns {String}
     */
    String.prototype.trimStart = function(trimStr) {
        var newtempStr = (trimStr) ? trimStr : " ";
        var tempStr = this;

        while(true) {
            if(tempStr.substr(0, newtempStr.length) != newtempStr) {
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
    String.prototype.trimEnd = function(trimStr){
        var newtempStr = (trimStr) ? trimStr : " ";
        var tempStr = this;

        while(true) {
            if (tempStr.substr(tempStr.length - newtempStr.length, newtempStr.length) != newtempStr) {
                break;
            }
            tempStr = tempStr.substr(0, tempStr.length-newtempStr.length);
        }
        return tempStr;
    };
})();