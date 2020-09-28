import React, { useEffect } from 'react';
import MainFrame from './Components/MainFrame.js';
import ReactGA from 'react-ga';
import { config } from './config.js';

import './App.css';

function App() {

  useEffect(() => { ReactGA.initialize(config.baseGa); }, [])

  let url = '';
  try {
    url = window.location.search.split(".ai")[1].replace("%22", "")
  } catch (error) {
    url = ''
  }


  const sendEvent = (rating) => {
    if (url !== '')
      ReactGA.event({
        label: 'Help Center Rating',
        category: url,
        action: rating
      });

  }

  return (
      <div className="App">
        <MainFrame sendEvent={sendEvent} />
      </div>
  );
}

export default App;
