import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import 'semantic-ui-css/semantic.min.css';
import moment from 'moment-timezone';

import './index.css';
import routes from './routes.js';
import configureStore from './configureStore';

const store = configureStore();

var tz = moment.tz.guess();
console.log("tz is>>>", tz);

console.log(moment().tz(tz).format("ddd MMM DD hh:mm:ss zz YYYY"));

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
), document.getElementById('root'));
