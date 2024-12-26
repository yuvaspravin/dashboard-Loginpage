import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./components/DashboardPage";
import { useEffect } from "react";

import users from "./user.json";
import { setUserData } from "./redux/action/action";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (users) {
      dispatch(setUserData(users)); // Use the action creator function
    }
  }, [dispatch]);
  return (
    <div className="App" style={{}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
