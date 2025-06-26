import React from "react";
import AuthProvider from "../context/AuthProvider";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const TaskListNumber = ({ data }) => {
  const [userData, setUserData] = useContext(AuthContext);
  const [counts, setCounts] = useState(data.taskCounts);

  useEffect(
    () => {
      if (userData) {
        const currentEmployee = userData.find((emp) => emp.id === data.id);
        if (currentEmployee) {
          setCounts(currentEmployee.taskCounts);
        }
      }
    },
    [userData],
    data.id
  );
  return (
    <div className="flex screen mt-10 justify-between overflow-x-auto gap-5 text-3xl">
      <div className="rounded-xl py-8 px-8 p-10 w-[45%] bg-blue-500">
        <h2 className="text-2xl font-semibold">{counts.newTask}</h2>
        <h3 className="text-xl font-medium">New Task</h3>
      </div>
      <div className="rounded-xl py-6 px-9 p-10 w-[45%] bg-green-500">
        <h2 className="text-2xl font-semibold">{counts.completed}</h2>
        <h3 className="text-xl font-medium">Completed Task</h3>
      </div>
      <div className="rounded-xl py-6 px-9 p-10 w-[45%] bg-violet-500">
        <h2 className="text-2xl font-semibold">{counts.active}</h2>
        <h3 className="text-xl font-medium">Active Task</h3>
      </div>
      <div className="rounded-xl py-6 px-9 p-10 w-[45%] bg-red-500">
        <h2 className="text-2xl font-semibold">{counts.failed}</h2>
        <h3 className="text-xl font-medium">Failed Task</h3>
      </div>
    </div>
  );
};

export default TaskListNumber;
