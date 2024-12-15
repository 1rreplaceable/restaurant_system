import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard ";
import CategoryManagement from "./pages/admin/CategoryManagement";
import MenuManagement from "./pages/admin/MenuManagement";
import Login from "./pages/auth/Login";
import RestaurantSetup from "./pages/auth/RestaurantSetup";
import MenuSelection from "./pages/client/MenuSelection";
import OrderView from "./pages/kitchen/OrderView";

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
    path: "/menu",
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
    path: "/admin/category-management",
    element: <PrivateRoute element={<CategoryManagement />} />,
  },
  {
    path: "/admin/settings",
    // element: <PrivateRoute element={<Settings />} />,
  },
];

export default routes;
