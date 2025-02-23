import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TaskList = ({ list = [], getData }) => {
    const [editTask, setEditTask] = useState(null);
    const [editObject, setEditObject] = useState({});
    const [showDone, setShowDone] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Ensuring `list` always has a valid value
    useEffect(() => {
        if (!Array.isArray(list)) {
            console.warn("⚠️ `list` is not an array. Defaulting to an empty array.");
        }
    }, [list]);

    const handleEditField = (key, value) => {
        setEditObject((prev) => ({ ...prev, [key]: value }));
    };

    const handleEditData = async (taskId) => {
        if (!taskId) return;
        try {
            const token = localStorage.getItem("token");
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`, {
                method: "PATCH",
                body: JSON.stringify(editObject),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            });

            const respObj = await resp.json();
            if (respObj.status === "success") {
                console.log("✅ Task Updated");
                handleCancel();
                getData();
            } else {
                alert(respObj.message);
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleCancel = () => {
        setEditTask(null);
        setEditObject({});
    };

    const handleDelete = async (taskId) => {
        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            if (resp.status === 204) {
                console.log("✅ Task Deleted");
                getData();
            } else {
                const data = await resp.json();
                alert(data.message || "Error deleting task");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleMarkAsDone = async (taskId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({ status: "done" }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Unknown error");

            console.log("✅ Task marked as done:", data);
            getData();
        } catch (error) {
            console.error("❌ Error marking task as done:", error.message);
        }
    };

    // Filtering logic with safety checks
    const filteredList = list?.filter((task) => {
        if (!task || !task.taskTitle) return false; // Prevent crashes
        const statusFilter = showDone ? task.status === "done" : true;
        const searchFilter = task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase());
        return statusFilter && searchFilter;
    }) || [];

    return (
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg w-full mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-300">
                    {showDone ? "Completed Tasks" : "To-Do List"}
                </h3>
                <button
                    onClick={() => setShowDone((prev) => !prev)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    {showDone ? "Show To-Do" : "Show Done"}
                </button>
            </div>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search tasks..."
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Task List Container */}
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                {filteredList.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center">No tasks found.</p>
                ) : (
                    filteredList.map((elem, idx) => (
                        <div key={elem._id} className="w-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                            <h5 className="text-gray-600 dark:text-gray-400 font-medium mb-1">#{idx + 1}</h5>
                            
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-300">
                                {elem.taskTitle}
                            </p>
                            
                            <p className="text-gray-600 dark:text-gray-400">Assigned by: {elem.assignor}</p>
                            <p className="text-gray-600 dark:text-gray-400">Assign to: {elem.assignee}</p>

                            {editTask === elem._id ? (
                                <>
                                    <label className="text-gray-700 dark:text-gray-200 block mt-2">Deadline:</label>
                                    <input
                                        type="datetime-local"
                                        className="border p-2 rounded-lg w-full bg-gray-200 dark:bg-gray-700 dark:text-white"
                                        value={editObject.deadline || ""}
                                        onChange={(e) => handleEditField("deadline", e.target.value)}
                                    />

                                    <label className="text-gray-700 dark:text-gray-200 block mt-2">Priority:</label>
                                    <select
                                        className="border p-2 rounded-lg w-full bg-gray-200 dark:bg-gray-700 dark:text-white"
                                        value={editObject.priority || elem.priority}
                                        onChange={(e) => handleEditField("priority", e.target.value)}
                                    >
                                        <option value="low">Low</option>
                                        <option value="normal">Normal</option>
                                        <option value="high">High</option>
                                        <option value="urgent">Urgent</option>
                                    </select>

                                    <div className="flex space-x-3 mt-3">
                                        <button onClick={() => handleEditData(elem._id)} className="bg-green-500 text-white px-4 py-2 rounded-lg">Save</button>
                                        <button onClick={handleCancel} className="bg-gray-300 dark:bg-gray-600 text-gray-700 px-4 py-2 rounded-lg">Cancel</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="text-gray-600 dark:text-gray-400">Priority: {elem.priority}</p>
                                    <p className="text-gray-600 dark:text-gray-400">Status: {elem.status}</p>

                                    <div className="flex space-x-2 mt-3">
                                        <button onClick={() => setEditTask(elem._id)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg">Edit</button>
                                        <button onClick={() => handleDelete(elem._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
                                        <button onClick={() => handleMarkAsDone(elem._id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Done</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskList;
