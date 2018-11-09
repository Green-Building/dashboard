import Header from './component/Header';
import Home from './pages/Home';
import Building from './pages/building';
import Floor from './pages/floor';
import Node from './pages/node';
import sensorStats from './pages/sensorStats';
import sensorNetwork from './pages/SensorNetwork';
import addBuilding from './pages/configManager/addBuilding';
import addSensorData from './pages/dataManager/addSensorData';

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
      path: '/building/:building_id/floor/:floor_id',
      component: Floor,
    },
    {
      path: '/building/:building_id/cluster/:cluster_id/node/:node_id',
      component: Node,
    },
    {
      path: 'sensor-data/add',
      component: addSensorData,
    },
    {
      path: '/sensor-data/:sensor_id',
      component: sensorStats,
    },
    {
      path: '/sensor-network',
      component: sensorNetwork,
    },
    {
      path: 'buildings/add',
      component: addBuilding,
    },
  ]
};

export default routes;