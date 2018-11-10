import Header from './component/Header';
import Home from './pages/Home';
import Building from './pages/building';
import Floor from './pages/floor';
import Node from './pages/node';
import sensorStats from './pages/sensorStats';
import sensorNetwork from './pages/SensorNetwork';
import addBuilding from './pages/configManager/addBuilding';
import addSensorData from './pages/dataManager/addSensorData';

import Login from './pages/Login';

import Auth from './modules/Auth';

const routes = {
  // base component (wrapper for the whole application).
  component: Header,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, Home);
        } else {
          callback(null, Login);
        }
      }
    },
    {
      path: '/building/:building_id',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, Building);
        } else {
          callback(null, Login);
        }
      }
    },
    {
      path: '/floor/:floor_id',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, Floor);
        } else {
          callback(null, Login);
        }
      }
    },
    {
      path: '/node/:node_id',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, Node);
        } else {
          callback(null, Login);
        }
      }
    },
    {
      path: '/data-manager',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, addSensorData);
        } else {
          callback(null, Login);
        }
      }
    },
    {
      path: '/sensor/:sensor_id',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, sensorStats);
        } else {
          callback(null, Login);
        }
      }
    },
    {
      path: '/sensor-network',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, sensorNetwork);
        } else {
          callback(null, Login);
        }
      }
    },
    {
      path: 'infra-manager',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, addBuilding);
        } else {
          callback(null, Login);
        }
      }
    },
    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        // change the current URL to /
        replace('/');
      }
    }
  ]
};

export default routes;