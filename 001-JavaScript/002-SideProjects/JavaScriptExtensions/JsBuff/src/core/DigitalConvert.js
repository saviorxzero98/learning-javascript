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
        if (number <= 0) return"";

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

        for (var i = 0; i < romanNumberMap.length; i++)
        {
            var item = romanNumberMap[i];
            var key = parseInt(Object.keys(item)[0]);
            while (number >= key)
            {
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
            'I': 1 ,
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
            else
            {
                total += current;
            }

            previousRoman = currentRoman;
        }

    return total;
    }

    return DigitalConvert;
})();