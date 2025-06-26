import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useEffect } from "react";
import Header from "../../other/Header";
import TaskList from "../TaskList/TaskList";
import TaskListNumber from "../../other/TaskListNumber";
const EmployeeDasboard = ({ data, changeUser }) => {
  const [userData, setUserData] = useContext(AuthContext);

  useEffect(() => {
    if (userData) {
      const updatedEmployee = userData.find((emp) => emp.id === data.id);
      if (updatedEmployee) {
        const updatedData = { role: "employee", data: updatedEmployee };
        localStorage.setItem("loggedInUser", JSON.stringify(updatedData));
      }
    }
  }, [userData, data.id]);

  const currentEmployeeData =
    userData?.find((emp) => emp.id === data.id) || data;
  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6 md:p-10">
      <Header data={currentEmployeeData} changeUser={changeUser} />
      <TaskListNumber data={currentEmployeeData} />
      <TaskList data={currentEmployeeData} />
    </div>
  );
};

export default EmployeeDasboard;
