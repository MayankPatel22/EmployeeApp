import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { updateTaskStatus } from "./taskUtils";
import { showSuccessToast } from "../../utils/toastConfig";
const NewTask = ({ element }) => {
  const [userData, setUserData] = useContext(AuthContext);

  const handleAcceptTask = () => {
    const updatedData = updateTaskStatus(userData, element, "active");
    setUserData(updatedData);
    localStorage.setItem("employees", JSON.stringify(updatedData));
    showSuccessToast("Task Accepeted Successfully!");
  };
  return (
    <div className="flex-shrink-0 w-[300px] bg-blue-500 border-2 border-indigo-900 rounded-xl p-5 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-center">
        <span className="px-3 py-1 bg-red-800 text-yellow-400 rounded-lg text-sm font-medium">
          {element.category}
        </span>
        <span className="text-sm text-yellow-300">{element.taskDate}</span>
      </div>
      <h2 className="mt-4 text-lg font-semibold text-gray-100">
        {element.taskTitle}
      </h2>
      <p className="mt-2 text-sm">{element.taskDescription}</p>
      <div className="mt-5">
        <button
          onClick={handleAcceptTask}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
        >
          Accept Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
