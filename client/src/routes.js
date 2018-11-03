import Header from './component/Header';
import Home from './pages/Home';
import Building from './pages/Building';
import Floor from './pages/Floor';
import sensorStats from './pages/sensorStats';
import sensorNetwork from './pages/SensorNetwork';
import addBuilding from './pages/configManager/addBuilding';

const routes = {
  // base component (wrapper for the whole application).
  component: Header,
  childRoutes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/building/:building_id',
      component: Building,
    },
    {
      path: '/floor/:floor_id',
      component: Floor,
    },
    {
      path: '/sensor-data',
      component: sensorStats,
    },
    {
      path: '/sensor-network',
      component: sensorNetwork,
    },
    {
      path: 'buildings/add',
      component: addBuilding,
    }
  ]
};

export default routes;