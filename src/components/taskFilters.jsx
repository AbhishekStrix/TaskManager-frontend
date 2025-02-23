import { useState } from "react";

const TaskFilters = ({ setFiltersObj }) => {
    const [filters, setFilters] = useState({
        priority: "",
        status: "",
        dueDate: "",
        category: "",
    });

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const applyFilters = () => {
        setFiltersObj(filters);
    };

    const clearFilters = () => {
        const resetFilters = {
            priority: "",
            status: "",
            dueDate: "",
            category: "",
        };
        setFilters(resetFilters);
        setFiltersObj(resetFilters);
    };

    return (
        <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            {/* Priority Filter */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Priority</label>
                <select
                    name="priority"
                    value={filters.priority}
                    onChange={(e) => handleFilterChange("priority", e.target.value)}
                    className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                >
                    <option value="">--Select--</option>
                    <option value="normal">Normal</option>
                    <option value="low">Low</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                </select>
            </div>

            {/* Status Filter */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Status</label>
                <select
                    name="status"
                    value={filters.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                    className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                >
                    <option value="">--Select--</option>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>

            {/* Due Date Filter */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Due Date</label>
                <input
                    type="date"
                    value={filters.dueDate}
                    onChange={(e) => handleFilterChange("dueDate", e.target.value)}
                    className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>

            {/* Category Filter */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Category</label>
                <select
                    name="category"
                    value={filters.category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                    className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                >
                    <option value="">--Select--</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="others">Others</option>
                </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-3 mt-5">
                <button
                    onClick={applyFilters}
                    className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
                >
                    Apply Filters
                </button>
                <button
                    onClick={clearFilters}
                    className="w-1/2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg transition duration-300"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default TaskFilters;
