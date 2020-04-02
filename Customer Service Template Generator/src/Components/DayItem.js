import React from 'react';
import { Button, Row, Col } from 'react-bootstrap'
import WorkTimeList from './WorkTimeList.js'

function DayItem({ day, handleClick, remove }) {

    const handleDisable = () => {
        day.active = !day.active;
        handleClick(day);

    }

    return (
        <Row style={{ margin: '10px' }}>
            <Col md='3'>
                <Button key={day.num} size="lg" variant={day.active ? 'primary' : 'secondary'} onClick={handleDisable} block>
                    <span style={day.active ? {} : { textDecoration: "line-through" }}> {day.name}</span>
                </Button>
            </Col>
            <Col md='9' >
                <WorkTimeList day={day} workTime={day.workTime} actived={day.active} remove={remove} />
            </Col>
        </Row>
    );
}

export default DayItem;