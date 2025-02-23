import { useEffect, useState } from "react";
import TaskForm from "../components/taskForm";
import TaskList from "../components/taskList";
import TaskFilters from "../components/taskFilters";
import Navbar from "../components/navbar";

const TaskPage = ({ currUser, handleLogout }) => {
    const [list, setList] = useState([]);
    const [filtersObj, setFiltersObj] = useState({ priority: "" });
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);

        try {
            const queryParams = [];
            if (filtersObj.priority) {
                queryParams.push(`priority=${filtersObj.priority}`);
            }

            const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks${queryString}`, {
                credentials: "include",
            });

            const respBody = await resp.json();
            if (resp.ok) {
                setList(respBody.data.tasks);
            } else {
                console.error("Error fetching tasks:", respBody.message);
            }
        } catch (error) {
            console.error("Network error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [JSON.stringify(filtersObj)]);

    return (
        <div className="flex flex-col w-full h-screen p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300 overflow-auto">
            <Navbar currUser={currUser} handleLogout={handleLogout} />

            <div className="grid grid-cols-[1.5fr_0.5fr_2fr] gap-x-8 mt-6 flex-grow">
                {/* Left Section: Task Form with Filters Inside */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition duration-300">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Task</h2>
                    <TaskForm getData={getData} />
                    <div className="mt-4 border-t pt-4">
                        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">Filter Tasks</h3>
                        <TaskFilters setFiltersObj={setFiltersObj} />
                    </div>
                </div>

                {/* Spacer Column for 0.5fr */}
                <div></div>

                {/* Right Section: Task Lists */}
                <div className="grid gap-6 h-full">
                    {loading ? (
                        <p className="text-gray-700 dark:text-gray-400 text-center">Loading tasks...</p>
                    ) : (
                        <>
                            <TaskList list={list} getData={getData} filterObj={{ status: "todo" }} title="Todo List" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskPage;
