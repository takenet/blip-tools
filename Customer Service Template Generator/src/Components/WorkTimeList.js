import React from 'react';
import WorkTimeItem from './WorkTimeItem.js';

function WorkTimeList({ day, workTime, actived, remove }) {

    return (
        <div style={{ margin: '4px' }}>
            {
                workTime.map((e, i) => {
                    return (
                        <WorkTimeItem key={i} day={day} start={e.start} end={e.end} actived={actived} remove={remove} />
                    )
                })
            }
        </div>
    )
}


export default WorkTimeList;