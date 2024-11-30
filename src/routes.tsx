import { RouteObject } from 'react-router-dom';
import Login from './pages/auth/Login';
import RestaurantSetup from './pages/auth/RestaurantSetup';
import MenuSelection from './pages/MenuSelection';
import OrderView from './pages/OrderView';

const routes: RouteObject[] = [
    { path: '/login', element: <Login /> },
    { path: '/setup', element: <RestaurantSetup /> },
    { path: '/menu', element: <MenuSelection /> },
    { path: '/order', element: <OrderView /> },
];

export default routes;
