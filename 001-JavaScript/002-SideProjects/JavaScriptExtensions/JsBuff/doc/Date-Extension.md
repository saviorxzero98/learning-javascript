# Date擴充

## ● Locale Setting

```javascript
// en-US (Default) [Option]
Date.setCultureInfo(DateCultureInfo.en_US());

// zh-TW
Date.setCultureInfo(DateCultureInfo.zh_TW());
```

---
# Date Basic GET/SET

## ● Date.today / Date.now

#### Date.today() / Date.now()

```javascript
// Reture Today Date
var todayDate = Date.today();

// Reture Now Date
var nowDate = Date.now();
```

## ● Date.set

#### Date.set(object)

```javascript
// Now Date
var date = new Date();

// Date: 2016-09-30 18:30:00.000
date.set({year: 2016, month: 9, day: 30, hours: 18, minutes: 30, seconds: 0, milliseconds: 0 })
```

## ● Date.date

#### Date.date(year, month, day)

```javascript
// Now Date
var date = new Date();

// Date: 2016-09-30
date.date(2016, 9, 30);
```

## ● Date.rocDate

#### Date.rocDate(rocYear, month, day)

```javascript
// Now Date
var date = new Date();

// Date: 2016-09-30 (民國105年9月30日)
date.rocDate(105, 9, 30);
```

## ● Date.time

#### Date.time(hours, minutes, seconds, milliseconds)

```javascript
// Now Date
var date = new Date();

// Date: 18:30:00.000
date.time(18, 30, 0, 0);

// Date: 18:30:00.xxx
date.time(18, 30, 0);
```

## ● Date.datetime

#### Date.datetime(year, month, day, hours, minutes, seconds, milliseconds)

```javascript
// Now Date
var date = new Date();

// Date: 2016-09-30 18:30:00.000
date.datetime(2016, 9, 30, 18, 30, 0, 0);
```

## ● Date.rocDatetime

#### Date.rocDatetime(rocYear, month, day, hours, minutes, seconds, milliseconds)

```javascript
// Now Date
var date = new Date();

// Date: 2016-09-30 18:30:00.000 (民國105年9月30日 下午6時30分0秒)
date.datetime(105, 9, 30, 18, 30, 0, 0);
```

## ● Date.year / Date.rocYear / Date.month / Date.day / Date.hours / Date.minutes / Date.seconds / Date.milliseconds 

```javascript
// Now Date (If Date is 2015-06-30 12:25:30.123)
var date = new Date();

// Date: 2016-06-30 12:25:30.123
date.year(2016);
// Return: 2016
var year = date.year();

// Date: 2016-06-30 12:25:30.123
date.rocYear(105);
// Return: 105
var rocYear = date.rocYear();

// Date: 2016-09-30 12:25:30.123
date.month(9);
// Return: 9
var month = date.month();

// Date: 2016-09-25 12:25:30.123
date.day(25);
// Return: 25
var day = date.day();

// Date: 2016-09-25 12:25:30.123
// Return: 0 (Sunday)
var dayOfWeek = date.dayOfWeek();

// Date: 2016-09-25 18:25:30.123
date.hours(18);
// Return: 18
var hours = date.hours();

// Date: 2016-09-25 18:30:30.123
date.minutes(30);
// Return: 30
var minutes = date.minutes();

// Date: 2016-09-25 18:30:00.123
date.seconds(0);
// Return: 0
var seconds = date.seconds();

// Date: 2016-09-25 18:30:00.000
date.milliseconds(0);
// Return: 0
var milliseconds = date.milliseconds();
```

---
# Date Format

## ● Date.today / Date.now

#### Date.today() / Date.now()

```javascript
// Date: 2016-09-30 18:30:00.000
var date = new Date();
date.datetime(2016, 9, 30, 18, 30, 0, 0);

// Return: 2016/09/30 18:30:00.000
var format1 = date.toFormatString("YYYY/MM/DD HH:mm:ss.fff");
```

|      | Before     | After                          |
|------|------------|--------------------------------|
| YYYY | 2016 900   | 2016 0900                      |
| YY   | 2016       | 16                             |
| Y    | 2016       | 2016                           |
| MMMM | 7          | June (en-US)、七月 (zh-TW)     |
| MMM  | 7          | Jun (en-US)、七 (zh-TW)        |
| MM   | 7          | 07                             |
| M    | 12         | 12                             |
| DDDD | 2016-09-25 | Sunday (en-US)、星期日 (zh-TW) |
| DDD  | 2016-09-25 | Sun (en-US)、日 (zh-TW)        |
| DD   | 8          | 08                             |
| D    | 25         | 25                             |
| HH   | 8          | 08                             |
| H    | 18         | 18                             |
| hh   | 8          | AM 8 (en-US)、上午 8 (zh-TW)   |
| h    | 18         | PM 6 (en-US)、下午 6 (zh-TW)   |
| mm   | 6          | 06                             |
| m    | 30         | 30                             |
| ss   | 5          | 05                             |
| s    | 20         | 20                             |
| fff  | 10         | 010                            |
| ff   | 1          | 01                             |
| f    | 55         | 55                             |











