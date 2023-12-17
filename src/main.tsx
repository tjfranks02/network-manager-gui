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
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import WorkflowEditor from "./pages/workflows/WorkflowEditor";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// CSS stylings
import "./styles/index.module.css";
import CreateWorkflow from "./pages/workflows/CreateWorkflow";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/workflow",
        element: <WorkflowEditor />
      },
      {
        path: "/workflow/create",
        element: <CreateWorkflow />
      },
      {
        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/signup",
        element: <SignUp />
      }
    ]
  }
]);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "contacts/:contactId",
//         element: <Contact />,
//       },
//     ],
//   },
// ]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
