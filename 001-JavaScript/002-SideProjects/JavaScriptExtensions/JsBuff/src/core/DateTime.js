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
                case "YYYY":    return prefixInteger(self.year(), format.length);
                case "YYY":     return prefixInteger(self.year(), format.length);
                case "YY":      return prefixInteger(self.year(), format.length);
                case "Y":       return self.year();
                case "MMMM":    return self.getMonthLongName(self.month() + 1);
                case "MMM":     return self.getMonthShortName(self.month() + 1);
                case "MM":      return prefixInteger(self.month() + 1, format.length);
                case "M":       return self.month() + 1;
                case "DDDD":    return self.getDayOfWeekLongName(self.dayOfWeek());
                case "DDD":     return self.getDayOfWeekShortName(self.dayOfWeek());
                case "DD":      return prefixInteger(self.day(), format.length);
                case "D":       return self.day();
                case "HH":      return prefixInteger(self.hours(), format.length);
                case "H":       return self.hours();
                case "hh":      return self.getAmPmName(self.hours()) + " " + prefixInteger(self.to12HourSystem(self.hours()), format.length);
                case "h":       return self.getAmPmName(self.hours()) + " " + self.to12HourSystem(self.hours());
                case "mm":      return prefixInteger(self.minutes(), format.length);
                case "m":       return self.minutes();
                case "ss":      return prefixInteger(self.seconds(), format.length);
                case "s":       return self.seconds();
                case "fff":     return prefixInteger(self.milliseconds(), format.length);
                case "ff":      return prefixInteger(self.milliseconds(), format.length);
                case "f":       return self.milliseconds();
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

    
    return DatePeriod ;
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


