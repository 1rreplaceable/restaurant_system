import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard ";
import MenuManagement from "./pages/admin/MenuManagement";
import Login from "./pages/auth/Login";
import RestaurantSetup from "./pages/auth/RestaurantSetup";
import MenuSelection from "./pages/MenuSelection";
import OrderView from "./pages/OrderView";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/setup",
    element: <RestaurantSetup />,
  },
  {
    path: "/menu-selection",
    element: <PrivateRoute element={<MenuSelection />} />,
  },
  {
    path: "/order-view",
    element: <PrivateRoute element={<OrderView />} />,
  },
  {
    path: "/admin",
    element: <PrivateRoute element={<AdminDashboard />} />,
  },
  {
    path: "/admin/menu-management",
    element: <PrivateRoute element={<MenuManagement />} />,
  },
  {
    path: "/admin/table-status",
    // element: <PrivateRoute element={<TableStatus />} />,
  },
  {
    path: "/admin/settings",
    // element: <PrivateRoute element={<Settings />} />,
  },
];

export default routes;
