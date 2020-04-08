import React, { useState } from 'react';

function ButtonFrame({ sendEvent }) {
    const [imgs, setImgs] = useState({
        sad: { text: "Bad", active: false, disabled: "./imgs/disabled/sad.svg", actived: "./imgs/actived/sad.svg" },
        bored: { text: "Okay", active: false, disabled: "./imgs/disabled/bored.svg", actived: "./imgs/actived/bored.svg" },
        smiley: { text: "Good", active: false, disabled: "./imgs/disabled/smiley.svg", actived: "./imgs/actived/smiley.svg" },
        shy: { text: "Excellent", active: false, disabled: "./imgs/disabled/shy.svg", actived: "./imgs/actived/shy.svg" },
       
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

            <img alt="Um pouco" src={imgs.bored.active ? imgs.bored.actived : imgs.bored.disabled}
                onMouseOver={() => { refresh(imgs.bored, true) }} onMouseLeave={() => { refresh(imgs.bored, false) }}
                onClick={() => { handleClick(imgs.bored) }} />

            <img alt="Bastante" src={imgs.smiley.active ? imgs.smiley.actived : imgs.smiley.disabled}
                onMouseOver={() => { refresh(imgs.smiley, true) }} onMouseLeave={() => { refresh(imgs.smiley, false) }}
                onClick={() => { handleClick(imgs.shy) }} />


            <img alt="Sim" src={imgs.shy.active ? imgs.shy.actived : imgs.shy.disabled}
                onMouseOver={() => { refresh(imgs.shy, true) }} onMouseLeave={() => { refresh(imgs.shy, false) }}
                onClick={() => { handleClick(imgs.shy) }} />

        </div>
    )
}
export default ButtonFrame;