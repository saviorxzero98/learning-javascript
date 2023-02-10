
var ArrayEx = (function () {
    function ArrayEx() {
        var array = Object.create(Array.prototype);
        array = (Array.apply(array, arguments) || array);
        ArrayEx.injectClassMethods(array);
        return (array);
    }

    /**
     * 
     * @param {ArrayEx} list
     * @returns {ArrayEx} 
     */
    ArrayEx.injectClassMethods = function (array) {
        for (var method in ArrayEx.prototype) {
            if (ArrayEx.prototype.hasOwnProperty(method)) {
                array[method] = ArrayEx.prototype[method];
            }
        }
        return array;
    };

    /**
     * Clone ArrayEx
     * @returns {ArrayEx} 
     */
    ArrayEx.prototype.clone = function () {
        var array = new ArrayEx();

        for (var i = 0; i < this.length; i++) {
            array.push(this[i]);
        }

        return array;
    };

    return ArrayEx;
})();