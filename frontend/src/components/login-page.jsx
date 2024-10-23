import React, { useState } from "react";
import { CheckSquare } from "lucide-react";
import axios from "axios";
import { toast } from 'react-hot-toast';

export function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async (e) => {
    console.log('clicked');

    e.preventDefault(); // Prevent default form submission
    try {
      const res = await axios.post('http://localhost:3000/login', {
        email: email,
        password: pass // Use pass instead of password
      });
      if (res.status === 200) {
        console.log(res.data);
        toast.success("Logged in successfully!"); // Show success message
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed!"); // Show error message
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-center">
            <CheckSquare className="h-8 w-8 text-blue-600 mr-2" />
            <h2 className="text-3xl font-bold text-gray-900">Checklist</h2>
          </div>
          <p className="text-center text-gray-600">
            Enter your email and password to login to your account
          </p>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('');
  const [passConf, setPassConf] = useState('');

  const handleSignup = async (e) => {
    console.log('clicked');
    e.preventDefault();
    console.log(name, email, pass, passConf);

    if (pass === passConf) {
      try {
        const res = await axios.post('http://localhost:3000/signup', {
          name: name,
          email: email,
          password: pass
        });
        if (res.data.success === true) { // Fix typo here
          console.log(res);
          toast.success("Registered successfully!"); // Show success message
        }
      } catch (error) {
        console.log(error);
        toast.error("Registration failed!"); // Show error message
      }
    } else {
      toast.error("Passwords do not match!"); // Show password mismatch error
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-center">
            <CheckSquare className="h-8 w-8 text-blue-600 mr-2" />
            <h2 className="text-3xl font-bold text-gray-900">Checklist</h2>
          </div>
          <p className="text-center text-gray-600">
            Create an account to start using Checklist
          </p>
          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                onChange={(e) => setPassConf(e.target.value)}
                value={passConf}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
