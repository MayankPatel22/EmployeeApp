import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import EmployeeDasboard from "../components/Dashboard/EmployeeDasboard";
import { useState } from "react";
const AllTask = () => {
  const [userData] = useContext(AuthContext);
  const [selectedEmp, setSelectedEmp] = useState(null);

  const handleDasboard = (employee) => {
    setSelectedEmp(employee);
  };
  const handleBackToAllTasks = () => {
    setSelectedEmp(null);
  };
  if (selectedEmp) {
    return (
      <EmployeeDasboard data={selectedEmp} changeUser={handleBackToAllTasks} />
    );
  }
  return (
    <div className="bg-[#1e1e1e] rounded-xl shadow-md shadow-black/10 p-6 mt-6">
      <h2 className="text-xl font-bold text-gray-100 mb-6">
        Task Overview - Click On Any Employee To Track Performance
      </h2>
      <div className="bg-black mb-4 py-3 px-6 flex justify-between rounded-lg border-2 border-red-500">
        <h2 className="w-1/5 font-semibold text-gray-300">Employee Name</h2>
        <h3 className="w-1/5 font-semibold text-center text-gray-300">
          New Task
        </h3>
        <h5 className="w-1/5 font-semibold text-center text-gray-300">
          Active Task
        </h5>
        <h5 className="w-1/5 font-semibold text-center text-gray-300">
          Completed
        </h5>
        <h5 className="w-1/5 font-semibold text-center text-gray-300">
          Failed
        </h5>
      </div>
      <div className="overflow-auto max-h-[300px]">
        {userData.map((element) => (
          <div
            onClick={() => handleDasboard(element)}
            key={element.id}
            className="bg-[#1e1e1e] border-gray-800 hover:bg-[#222222] mb-2 py-3 px-6 flex justify-between rounded-lg transition-all duration-200 border-2 border-violed-200"
          >
            <h2 className="w-1/5  text-gray-100">{element.firstName}</h2>
            <h3 className="w-1/5 text-center text-gray-300">
              {element.taskCounts.newTask}
            </h3>
            <h5 className="w-1/5 text-center text-gray-300">
              {element.taskCounts.active}
            </h5>
            <h5 className="w-1/5 text-center text-gray-300">
              {element.taskCounts.completed}
            </h5>
            <h5 className="w-1/5 text-center text-gray-300">
              {element.taskCounts.failed}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;
