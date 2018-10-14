import React from './../../src/react';
import ReactDOM from './../../src/react-dom';

function renderTime() {
  const time = (
    <h2>Current time is: {new Date().toLocaleTimeString()}</h2>
  );
  ReactDOM.render(time, document.getElementById('app'));
}

setInterval(renderTime, 1000);
