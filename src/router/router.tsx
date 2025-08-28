import { createBrowserRouter } from "react-router-dom";
import MainRouter from "./mainRouter";
import adminRoutes from "./adminRoutes";
import studentRoutes from "./studentRoutes";
import leadershipRoutes from "./leadershipRoutes";
import RoleSelectionPage from "../pages/RoleSelectionPage";

export const routes = createBrowserRouter([
  {
    path: "/onboarding",
    element: <RoleSelectionPage />,
  },
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

