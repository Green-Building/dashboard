import Header from './component/Header';
import Home from './pages/Home';
import Building from './pages/Building';

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
  ]
};

export default routes;