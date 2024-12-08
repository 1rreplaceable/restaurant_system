import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import routes from "./routes";

const App = () => {
  const token = localStorage.getItem("token");
  const defaultPath = token ? "/menu" : "/login";

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-800">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={defaultPath} replace />} />
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
