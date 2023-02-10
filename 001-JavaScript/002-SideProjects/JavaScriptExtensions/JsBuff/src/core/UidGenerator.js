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