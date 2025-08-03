import { createBrowserRouter } from "react-router-dom";
import MainRouter from "./mainRouter";
import adminRoutes from "./adminRoutes";
import studentRoutes from "./studentRoutes";
import leadershipRoutes from "./leadershipRoutes";

export const routes = createBrowserRouter([
  ...adminRoutes,
  ...studentRoutes,
  ...leadershipRoutes,
  {
    path: "/",
    element: <MainRouter />,
    children: [
      {
        path: "*",
        element: <div>Work in Progress</div>,
      },
    ],
  },
  {
    path: "*",
    element: <>Invalid Route</>,
  },
]);

