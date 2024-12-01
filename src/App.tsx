import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";

const App = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-800">
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
