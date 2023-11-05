import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// React components
import Dashboard from "./pages/Dashboard/Dashboard";
import Counter from "./pages/Counter";
import GridTutorial from "./pages/GridTutorial";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// CSS stylings
import "./styles/index.module.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/counter",
    element: <Counter />
  },
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/gridtut",
    element: <GridTutorial />
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
