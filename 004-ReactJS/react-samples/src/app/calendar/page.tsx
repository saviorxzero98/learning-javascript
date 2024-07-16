'use client'
import { DateTime } from 'luxon';
import { useState } from 'react';
import './style.scss';

const dayOfWeek = [
    '週日', '週一', '週二', '週三', '週四', '週五', '週六'
]

const Calendar = () => {
    const [ selectedDate, setSelectedDate ] = useState<DateTime | undefined>();
    const [ currentDate, setCurrentDate ] = useState(DateTime.local());
    const [ calendar, setCalendar ] = useState(getCalendarDays(currentDate));
    const dateFormat = 'yyyy-MM-dd';

    const onClickLastMonth = () => {
        const lastMonth = currentDate.minus({ month: 1 });
        setCurrentDate(lastMonth);
        const calendar = getCalendarDays(lastMonth);
        setCalendar(calendar);
    }
    const onClickNextMonth = () => {
        const nextMonth = currentDate.plus({ month: 1 });
        setCurrentDate(nextMonth);
        const calendar = getCalendarDays(nextMonth);
        setCalendar(calendar);
    }

    const selectDate = (event: any) => {
        console.log(DateTime.fromFormat(event.target.value, dateFormat).toJSDate());
        setSelectedDate(DateTime.fromFormat(event.target.value, dateFormat));
    }

    const getDateClassName = (datetime: DateTime, isCurrentMonth: boolean) => {
        let classNames: string[] = [];

        if (isCurrentMonth) {
            classNames.push('calendar-item-current');
        }
        else {
            classNames.push('calendar-item-last-next');
        }

        if (selectedDate && datetime.toFormat(dateFormat) === selectedDate.toFormat(dateFormat)) {
            classNames.push('calendar-item-selected');
        }

        return classNames.join(' ');
    }

    return (
        <>
            <div className='calendar-header'>
                <button onClick={onClickLastMonth}>上個月</button>
                <div className='calendar-header-title'>
                    <span>{currentDate.year}年</span>
                    <span>{currentDate.month}月</span>
                </div>
                <button onClick={onClickNextMonth}>下個月</button>
            </div>
            <div className='calendar-container'>
                {
                    dayOfWeek && dayOfWeek.map((name: string, index: number) => (
                        <span className='calendar-item-day-of-week'>{name}</span>
                    ))
                }
                {
                    calendar && calendar.map((day: { date: DateTime, monthOffset: number }, index: number) => (
                        <>
                            <button className={getDateClassName(day.date, day.monthOffset === 0)}
                                value={day.date.toFormat(dateFormat)}
                                onClick={(e) => selectDate(e)}>
                            {day.date.day}
                            </button>
                        </>
                    ))
                }
            </div>
        </>
    );
}


const getCalendarDays = (date: Date | DateTime, weekOfMonth: number = 0) => {
    let dateTime;

    // 判斷是否為 JSDate 還是 Luxon DateTime
    if (date instanceof Date) {
        dateTime = DateTime.fromJSDate(date);
    }
    else {
        dateTime = date;
    }

    // 取得前一個月剩餘日期
    const startOfMonth = dateTime.startOf('month');
    let diff = startOfMonth.weekday - weekOfMonth;
    if (diff < 0) {
        diff = 7;
    }
    const lastMonthDays = [];
    for (let dayOfLastMonth = 0; dayOfLastMonth < diff; dayOfLastMonth++) {
        lastMonthDays.push({
            date: startOfMonth.minus({ days: diff - dayOfLastMonth }),
            monthOffset: -1
        });
    }

    // 取得當月的所有日期
    const currentMonthDays = [];
    const daysInMonth: number = dateTime.daysInMonth ?? 0;
    for (let dayOfMonth = 1; dayOfMonth < daysInMonth + 1; dayOfMonth++) {
        currentMonthDays.push({
            date: DateTime.local(dateTime.year, dateTime.month, dayOfMonth),
            monthOffset: 0
        });
    }

    // 取得下個月剩餘日期
    const daysAdded = lastMonthDays.length + currentMonthDays.length - 1;
    const nextMonthDays = [];
    let dayOfNextMonth = 1;
    while ((daysAdded + dayOfNextMonth) % 7 !== 0) {
        nextMonthDays.push({
            date: currentMonthDays[currentMonthDays.length - 1].date.plus({ days: dayOfNextMonth }),
            monthOffset: 1
        });
        dayOfNextMonth = dayOfNextMonth + 1;
    }

    return [...lastMonthDays, ...currentMonthDays, ...nextMonthDays];
}

export default Calendar;