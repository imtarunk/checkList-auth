import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Signup, Login } from './components/login-page.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  }, {
    path: '/login',
    element: <Login />
  }, {
    path: '/register',
    element: <Signup />
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
