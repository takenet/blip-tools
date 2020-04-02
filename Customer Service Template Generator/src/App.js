import React, { useState } from 'react';
import DayList from './Components/DayList.js';
import DayForm from './Components/DayForm.js';
import CodeBox from './Components/CodeBox.js';
import TemplateBox from './Components/TemplateBox.js';
import { data } from './Base/DaysBase.js';
import { Button, Card } from 'react-bootstrap'
import { CodeSlash, LayersHalf, BoxArrowLeft } from 'react-bootstrap-icons';
import { labelPanelButton } from './Base/Labels.js';

import './App.css';

function App() {
  const [daysWeek, setDaysWeek] = useState(data);
  const [control, setControl] = useState({ form: true, code: false, template: false });


  const handleRemove = () => {
    setDaysWeek({ ...daysWeek });
  }


  const styleFunc = (actived) => {
    return actived ? { margin: '10px', display: '' } : { margin: '10px', display: 'none' }
  }


  return (
    <Card style={{ margin: '5px' }}>
      <Card.Body>
        <div className="App" style={styleFunc(control.form)} >
          <DayForm daysWeek={daysWeek} setDaysWeek={setDaysWeek} />
          <hr />
          <DayList daysWeek={daysWeek} setDaysWeek={setDaysWeek} remove={handleRemove} />
          <hr />
          <Button style={{ float: 'right', marginLeft: '5px' }} onClick={() => { setControl({ form: false, code: false, template: true }) }}>
            <LayersHalf size={25} /> {labelPanelButton.generateTemplate}
          </Button>
          <Button variant='dark' style={{ float: 'right' }} onClick={() => { setControl({ form: false, code: true, template: false }) }}>
            <CodeSlash size={25} /> {labelPanelButton.generateCode}
          </Button>
        </div >

        <div className="App" style={styleFunc(control.code)}>
          <CodeBox data={daysWeek} />
          <Button style={{ margin: '4px' }} variant='dark' onClick={() => { setControl({ form: true, code: false, template: false }) }}>
            <BoxArrowLeft size={25} /> {labelPanelButton.return}
          </Button>
        </div>

        <div className="App" style={styleFunc(control.template)}>
          <TemplateBox data={daysWeek} />
          <Button style={{ margin: '4px' }} variant='dark' onClick={() => { setControl({ form: true, code: false, template: false }) }}>
            <BoxArrowLeft size={25} /> {labelPanelButton.return}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default App;
