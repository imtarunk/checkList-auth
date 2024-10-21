import React, { useState } from 'react';
import LeftBar from './leftBar';
import { CiLocationArrow1 } from "react-icons/ci";
import { MdOutlinePushPin } from "react-icons/md";
import { nanoid } from 'nanoid';

const Dashboard = () => {
  const [todos, setTodos] = useState([
    {
      id: nanoid(),
      task: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      date: "12:00"
    },
    {
      id: nanoid(),
      task: "Another task description here.",
      date: "12:30"
    }
  ]);

  const [todo, setTodo] = useState("");
  const [editingId, setEditingId] = useState(null); // State to keep track of which todo is being edited

  // Add Todo to the list
  const handleAddTodo = () => {
    if (todo.trim() === "") return;  // Prevent adding empty todos

    const newTodo = {
      id: nanoid(),
      task: todo,
      date: new Date().toLocaleTimeString()  // Set the current time as the date
    };

    setTodos([...todos, newTodo]);
    setTodo('');  // Clear the input after adding
  };

  // Edit todo by ID
  const handleEditTodo = (id) => {
    const taskToEdit = todos.find((task) => task.id === id);
    setTodo(taskToEdit.task);  // Set the input field to the task's current content
    setEditingId(id); // Set the id of the task being edited
  };

  // Save edited todo
  const handleSaveEdit = () => {
    if (editingId === null || todo.trim() === "") return;

    const updatedTodos = todos.map((task) =>
      task.id === editingId ? { ...task, task: todo } : task
    );

    setTodos(updatedTodos);  // Update the todos list with the edited task
    setTodo('');  // Clear the input after saving
    setEditingId(null);  // Clear the editing id
  };

  return (
    <div className='flex flex-col min-h-screen border-t top-gray-900 rounded-xl'>
      <div className='flex'>
        <div className='w-[4.5%]'>
          <LeftBar />
        </div>
        <div className='w-full'>
          <div className='flex justify-start px-5'>
            <h1 className='text-6xl font-semibold mt-5'>Hi welcome Tarun!</h1>

          </div>
          <div className='flex flex-col items-center flex-wrap'>
            {/* Add Todo input */}

            <div className='flex space-x-2 mt-10 border rounded-lg p-10 w-[50%]'>
              <input
                type="text"
                placeholder='Add your todo here'
                className='border-2 px-2 py-2 rounded-lg w-full'
                onChange={(e) => setTodo(e.target.value)}
                value={todo}
              />
              {editingId === null ? (
                <button
                  className='bg-green-200 px-5 py-2 rounded-lg text-2xl hover:bg-green-400'
                  onClick={handleAddTodo}
                >
                  <CiLocationArrow1 />
                </button>
              ) : (
                <button
                  className='bg-blue-200 px-5 py-2 rounded-lg text-2xl hover:bg-blue-400'
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
              )}
            </div>

            {/* List of todos */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full '>
              {todos.map((task) => (
                <div key={task.id} className="card flex items-start justify-between p-6 bg-green-100 rounded-lg shadow-lg hover:bg-blue-50 border-2 border-transparent hover:border-blue-500 transition duration-200 m-4 h-auto">
                  <div className="container flex space-x-4 w-full h-auto">
                    {/* Left Side - Status Indicator */}
                    <div className="flex">
                      <MdOutlinePushPin className="text-red-500 rounded-full text-xl hover:cursor-pointer" />
                    </div>

                    {/* Right Side - Task and Buttons */}
                    <div className="right flex flex-col w-full">
                      <div className="text-wrap">
                        <p className="text-content text-sm text-gray-800">
                          {task.task} {/* Correctly referencing the task */}
                        </p>
                        <p className="time text-xs text-gray-500">{task.date}</p> {/* Display the date */}
                      </div>

                      <div className="button-wrap flex space-x-4 mt-2">
                        {/* Edit button */}
                        <button
                          className="primary-cta bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                          onClick={() => handleEditTodo(task.id)} // Use task.id for the edit
                        >
                          Edit
                        </button>
                        {/* Mark as done button */}
                        <button className="secondary-cta bg-transparent text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200">
                          Mark as done
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Dashboard;
