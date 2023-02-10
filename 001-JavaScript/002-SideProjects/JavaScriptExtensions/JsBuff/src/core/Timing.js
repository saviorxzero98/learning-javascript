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
        while(new Date().getTime() - time < milliseconds);
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
        if(this._timeoutTimer != undefined) {
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
        if(this._intervalTimer != undefined) {
            window.clearInterval(this._intervalTimer);
            this._intervalTimer = undefined;
        }
    };

    return Timing;
})();