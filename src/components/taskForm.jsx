import PropTypes from "prop-types";
import { useState } from "react";

const TaskForm = ({ getData }) => {
    const [formData, setFormData] = useState({
        taskTitle: "",
        assignee: "",
        deadline: "",
        priority: "normal",
    });

    const [error, setError] = useState("");

    const addTask = async (obj) => {
        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
                method: "POST",
                body: JSON.stringify(obj),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const respObj = await resp.json();
            if (respObj.status === "success") {
                console.log("Task added successfully");
                getData();
                setFormData({ taskTitle: "", assignee: "", deadline: "", priority: "normal" }); // Reset form
                setError("");
            } else {
                setError(respObj.message);
            }
        } catch (err) {
            setError("An error occurred while adding the task.");
        }
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!formData.taskTitle || !formData.assignee) {
            setError("Task Title and Assignee are required.");
            return;
        }

        addTask({ ...formData, assignor: "Subodh" });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 mt-4">
            <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white">Add Task</h2>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            <form onSubmit={handleAddTask} className="space-y-3">
                {/* Task Title */}
                <div>
                    <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium">Task Title</label>
                    <input
                        type="text"
                        name="taskTitle"
                        value={formData.taskTitle}
                        onChange={handleChange}
                        className="w-full px-3 py-1.5 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white text-sm"
                        required
                    />
                </div>

                {/* Assignee */}
                <div>
                    <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium">Assignee (Email)</label>
                    <input
                        type="email"
                        name="assignee"
                        value={formData.assignee}
                        onChange={handleChange}
                        className="w-full px-3 py-1.5 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white text-sm"
                        required
                    />
                </div>

                {/* Deadline */}
                <div>
                    <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium">Deadline</label>
                    <input
                        type="datetime-local"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="w-full px-3 py-1.5 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white text-sm"
                    />
                </div>

                {/* Priority */}
                <div>
                    <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium">Priority</label>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full px-3 py-1.5 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white text-sm"
                    >
                        <option value="normal">Normal</option>
                        <option value="low">Low</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-all"
                >
                    Add Task
                </button>
            </form>
        </div>
    );
};

TaskForm.propTypes = {
    getData: PropTypes.func.isRequired,
};

export default TaskForm;
