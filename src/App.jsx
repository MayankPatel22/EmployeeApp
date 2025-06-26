import { useState } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Login from "./components/Auth/Login";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import EmployeeDasboard from "./components/Dashboard/EmployeeDasboard";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import { useEffect } from "react";
import { validateCredentials } from "./utils/authUtils";

function App() {
  const [user, setUser] = useState("");
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData] = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData.role);
      setLoggedInUserData(userData.data);
    }
  }, []);

  const handleLogin = (email, password) => {
    const result = validateCredentials(email, password, userData);

    if (result.isValid) {
      setUser(result.role);
      setLoggedInUserData(result.data);
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          role: result.role,
          data: result.data,
        })
      );
      return true;
    }
    return false;
  };

  const renderDashboard = () => {
    if (!user) return <Login handleLogin={handleLogin} />;
    if (user === "admin") return <AdminDashboard changeUser={setUser} />;
    if (user == "employee")
      return <EmployeeDasboard changeUser={setUser} data={loggedInUserData} />;
    return null;
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Toaster />
      {renderDashboard()}
    </div>
  );
}

export default App;
