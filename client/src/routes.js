import Header from './component/Header';
import Home from './pages/Home';
import Building from './pages/Building';
import Floor from './pages/Floor';
import sensorStats from './pages/sensorStats';
import sensorNetwork from './pages/SensorNetwork';

const routes = {
  // base component (wrapper for the whole application).
  component: Header,
  childRoutes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/building',
      component: Building,
    },
    {
      path: '/floor',
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
  ]
};

export default routes;