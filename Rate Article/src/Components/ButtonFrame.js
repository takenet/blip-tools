import React, { useState } from 'react';

function ButtonFrame({ sendEvent }) {
    const [imgs, setImgs] = useState({
        sad: { text: "Yes", active: false, disabled: "./imgs/disabled/disabled-yes.svg", actived: "./imgs/actived/active-yes.svg" },
        bored: { text: "No", active: false, disabled: "./imgs/disabled/disabled-no.svg", actived: "./imgs/actived/active-no.svg" },
        
       
    });
    const [clicked, setClicked] = useState({ commit: false, value: '' });


    const refresh = (item, value) => {
        if (!clicked.commit) {
            item.active = value;
            setImgs({ ...imgs });
        }


    }

    const handleClick = (item) => {
        if (!clicked.commit) {
            setClicked({ commit: true, value: item.text });
            sendEvent(item.text);
        }


    }



    return (
        <div className="button-frame">
            <img alt="Não" src={imgs.sad.active ? imgs.sad.actived : imgs.sad.disabled}
                onMouseOver={() => { refresh(imgs.sad, true) }} onMouseLeave={() => { refresh(imgs.sad, false) }}
                onClick={() => { handleClick(imgs.sad) }} />

            <img alt="Sim" src={imgs.bored.active ? imgs.bored.actived : imgs.bored.disabled}
                onMouseOver={() => { refresh(imgs.bored, true) }} onMouseLeave={() => { refresh(imgs.bored, false) }}
                onClick={() => { handleClick(imgs.bored) }} />


        </div>
    )
}
export default ButtonFrame;