import { RouteObject } from "react-router-dom";
import OnboardingLayout from "../layouts/OnboardingLayout";
import Login from "@/pages/students/login/login";
import AuthPath from "@/pages/students/authPath";
import MainRouter from "./mainRouter";
import { Suspense } from "react";
import LoadingScreen from "@/layouts/LoadingScreen";
import DashboardIndex from "@/pages/students/dashboard/dashboardIndex";
import Meetings from "@/pages/students/dashboard/meetings/meetings";
import CalendarPage from "@/pages/students/dashboard/calendar/calendar";

const studentRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <OnboardingLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "forgot-password", element: <AuthPath /> },
    ],
  },
  {
    path: "/signup",
    element: <OnboardingLayout />,
    children: [
      { index: true, element: <AuthPath /> },
      // { path: "cub-preferences", element: <AuthPath /> },
    ],
  },
  {
    path: "/",
    element: <MainRouter />,
    children: [
      {
        index: true,
        element: (
            <Suspense fallback={<LoadingScreen />}>
              <DashboardIndex />
            </Suspense>
        ),
       },
       {
        path: "/students/dashboard",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <DashboardIndex />
            {/* <p>Home</p> */}
          </Suspense>
        ),
      },
      {
        path: "/students/meetings",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Meetings />
          </Suspense>
        ),
      },     
      {
        path: "/students/calendar",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <CalendarPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <div>Work in Progress</div>,
      },
    ],
  },
];

export default studentRoutes; 