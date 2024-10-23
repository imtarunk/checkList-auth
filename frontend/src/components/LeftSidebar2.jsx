import React, { useState } from 'react';
import { List, Plus, Home, Calendar, Settings, LogOut } from 'lucide-react';

const todoLists = [
  { id: 1, name: 'Personal', count: 5 },
  { id: 2, name: 'Work', count: 3 },
  { id: 3, name: 'Shopping', count: 2 },
  { id: 4, name: 'Fitness', count: 1 },
];

export default function LeftSidebar() {
  const [activeList, setActiveList] = useState(1);

  return (
    <div className="w-58 h-screen bg-green-100 border-r border-gray-200 flex flex-col my-3 rounded-r-xl text-sm shadow-md">
      <div className="p-2 flex justify-center">
        <h1 className="text-2xl font-bold text-gray-800">Todo App</h1>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-4">
          {todoLists.map((list) => (
            <li key={list.id}>
              <button
                onClick={() => setActiveList(list.id)}
                className={`w-full flex items-center justify-between p-2 rounded-md ${activeList === list.id ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-green-400'
                  }`}
              >
                <div className="flex items-center">
                  <List className="w-5 h-5 mr-3" />
                  <span>{list.name}</span>
                </div>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {list.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          <span>New List</span>
        </button>
      </div>

      <div className="p-4 border-t border-gray-200">
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-green-400 rounded-md">
              <Home className="w-5 h-5 mr-3" />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-green-400 rounded-md">
              <Calendar className="w-5 h-5 mr-3" />
              <span>Calendar</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-green-400 rounded-md">
              <Settings className="w-5 h-5 mr-3" />
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-green-400 rounded-md">
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}