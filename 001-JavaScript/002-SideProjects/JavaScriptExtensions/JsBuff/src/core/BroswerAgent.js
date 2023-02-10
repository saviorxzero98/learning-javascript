
var BroswerAgent = (function () {
    function BroswerAgent() {
    }

    BroswerAgent.isIE = function () {
        var userAgent = navigator.userAgent;
        var version = 0;
        if (/MSIE (\d+\.\d+);/.test(userAgent)) {
            version = new Number(RegExp.$1);
        }
        else if (/Trident.*rv[ :]*(\d+\.\d+)/.test(userAgent)) {
            version = new Number(RegExp.$1);
        }
        else if (/Windows NT.*Edge\/(\d+\.\d+)/.test(userAgent)) {
            version = new Number(RegExp.$1);
        }
        return version;
    }
    BroswerAgent.isIE6 = function () {
        return navigator.userAgent.indexOf("MSIE 6") != -1;
    }
    BroswerAgent.isIE7 = function () {
        return navigator.userAgent.indexOf("MSIE 7") != -1;
    }
    BroswerAgent.isIE8 = function () {
        return navigator.userAgent.indexOf("MSIE 8") != -1;
    }
    BroswerAgent.isIE9 = function () {
        return navigator.userAgent.indexOf("MSIE 9") != -1;
    }
    BroswerAgent.isIE10 = function () {
        return navigator.userAgent.indexOf("MSIE 10") != -1;
    }
    BroswerAgent.isIE11 = function () {
        return (new RegExp("Trident.*rv[ :]*(\d+\.\d+)").exec(navigator.userAgent) != null);
    };
    BroswerAgent.isEdge = function () {
        return (new RegExp("Windows NT.*Edge\/(\d+\.\d+)").exec(navigator.userAgent) != null);
    };

    BroswerAgent.isMobile = function () {
        return BroswerAgent.isAndroid() || BroswerAgent.isiOS() || BroswerAgent.isWindowsPhone();
    };
    BroswerAgent.isAndroid = function () {
        var userAgent = navigator.userAgent;
        return userAgent.indexOf("Android") != -1 && userAgent.indexOf("Windows") == -1;
    }
    BroswerAgent.isAndroidPhone = function () {
        var userAgent = navigator.userAgent;
        return userAgent.indexOf("Android") != -1 && userAgent.indexOf("Mobile") != -1 && userAgent.indexOf("Windows") == -1;
    }
    BroswerAgent.isAndroidTablet = function () {
        var userAgent = navigator.userAgent;
        return userAgent.indexOf("Android") != -1 && userAgent.indexOf("Mobile") == -1 && userAgent.indexOf("Windows") == -1;
    }
    BroswerAgent.isiOS = function () {
        return BroswerAgent.isiPad() || BroswerAgent.isiPhone();
    }
    BroswerAgent.isiPhone = function () {
        var userAgent = navigator.userAgent;
        return userAgent.indexOf("iPhone") != -1 && userAgent.indexOf("Windows") == -1;
    }
    BroswerAgent.isiPad = function () {
        var userAgent = navigator.userAgent;
        return userAgent.indexOf("iPad") != -1 && userAgent.indexOf("Windows") == -1;
    }
    BroswerAgent.isWindowsPhone = function () {
        var userAgent = navigator.userAgent;
        return userAgent.indexOf("Windows Phone") != -1;
    }

    BroswerAgent.isSafari = function () {
        var userAgent = navigator.userAgent;
        return userAgent.indexOf("Macintosh") != -1 && userAgent.indexOf("Safari") != -1 && userAgent.indexOf("Windows") == -1;
    }
    BroswerAgent.isFirefox = function () {
        var userAgent = navigator.userAgent;
        var version = 0;
        if (/Firefox[\/\s](\d+\.\d+)/.test(userAgent)) {
            version = new Number(RegExp.$1);
        }
        return version;
    };
    BroswerAgent.isChrome = function () {
        var userAgent = navigator.userAgent;
        var version = 0;
        if (/Chrome[\/\s](\d+\.\d+)/.test(userAgent)) {
            version = new Number(RegExp.$1);
        }
        return version;
    };
    BroswerAgent.isOpera = function () {
        var userAgent = navigator.userAgent;
        var version = 0;
        if (/Opera[\/\s](\d+\.\d+)/.test(userAgent)) {
            version = new Number(RegExp.$1);
        }
        else if (/OPR\/(\d+\.\d+)/i.test(userAgent)) {
            version = new Number(RegExp.$1);
        }
        return version;
    };

    return BroswerAgent;
})();