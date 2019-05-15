import React from './../../src/react';
import ReactDOM from './../../src/react-dom';

function renderTime() {
  const time = (
    <h2>Current time is: {new Date().toLocaleTimeString()}</h2>
  );
  ReactDOM.render(time, document.getElementById('app'));
}

const interval = setInterval(renderTime, 1000);

setTimeout(() => {
  clearInterval(interval);

  ReactDOM.unmountComponentAtNode(document.getElementById('app'));
}, 5000);
