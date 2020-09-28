import React from 'react';
import ButtonFrame from './ButtonFrame.js';

function MainFrame({sendEvent}) {
    return (
        <div className="main-frame" opacity={0.3}>
            <h1 className="main-frame-text">Esse artigo foi útil?</h1>
            <ButtonFrame   sendEvent={sendEvent}/>
        </div>
    )
}
export default MainFrame;