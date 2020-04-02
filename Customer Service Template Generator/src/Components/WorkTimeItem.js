import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
function WorkTimeItem({ day, start, end, actived, remove }) {

    const [mouseOver, setMouseOver] = useState(false);

    const handleRemove = () => {
        let workTime = day.workTime.filter(e => e.start !== start || e.end !== end)
        day.workTime = workTime;
        remove();
    }


    return (
        <ButtonGroup aria-label="Basic example" style={{ marginTop: '2px', marginRight: '5px' }}
            onMouseEnter={() => { setMouseOver(true) }} onMouseLeave={() => { setMouseOver(false) }} onClick={handleRemove}>
            <Button variant={actived ? 'success' : 'dark'} disabled={!actived}>{start}</Button>
            <Button variant={actived ? 'danger' : 'dark'} disabled={!actived}>{end}
                <XCircleFill style={mouseOver && actived ? { display: '', marginLeft: '7px', marginBottom: '2px' } : { display: 'none', marginLeft: '7px', marginBottom: '2px' }} color="white" size={21} />
            </Button>
        </ButtonGroup >)
}


export default WorkTimeItem;