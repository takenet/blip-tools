import React from 'react';
import DayItem from './DayItem.js';

function DayList({ daysWeek, setDaysWeek, remove}) {

    const handleClick = (day) => {
        setDaysWeek({ ...daysWeek })
    }

    return (
        <>
            {
                Object.keys(daysWeek).map((key, i) => {
                    return (< DayItem key={i} day={daysWeek[key]} handleClick={handleClick} remove={remove}/>)
                })
            }
        </>);
}

export default DayList;