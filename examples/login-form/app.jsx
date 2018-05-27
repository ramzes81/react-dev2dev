import React from './../../src/react';
import ReactDOM from './../../src/react-dom';

import './style.scss';

const onSubmit = () => alert('submit');

const app = (
  <form className="form" onSubmit={onSubmit}>
    <input type="text" />
    <input type="password" />
    <input type="submit" value="submit" />
  </form>
);

ReactDOM.render(app, document.getElementById('app'));