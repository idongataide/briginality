import { RouteObject } from "react-router-dom";
import AdminLogin from "@/pages/admin/auth/login/login";
import OnboardingLayout from "@/layouts/OnboardingLayout";
import MainRouter from "./mainRouter";
import { Suspense } from "react";
import DashboadLoadingScreen from "@/pages/admin/dashboard/dashboardScreen";
import LoadingScreen from "@/layouts/LoadingScreen";
import Students from "@/pages/admin/dashboard/students/students";
import StudentsDetails from "@/pages/admin/dashboard/students/studentsDetails";
import LeadershipList from "@/pages/admin/dashboard/leaderships/leadershipList";
import LeadershipDetails from "@/pages/admin/dashboard/leaderships/leadershipDetails";

const adminRoutes: RouteObject[] = [
    {
        path: "/",
        element: <MainRouter />,
        children: [
          {
            index: true,
            element: (
                <Suspense fallback={<LoadingScreen />}>
                  <DashboadLoadingScreen />
                </Suspense>
            ),
           },
           {
            path: "/admin/dashboard",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <DashboadLoadingScreen />
                {/* <p>Home</p> */}
              </Suspense>
            ),
          },
          {
            path: "/admin/students",
            element: (
                 <Suspense fallback={<LoadingScreen />}>
                 <Students />
              </Suspense>
            ),
          },
          {
            path: "/admin/students/:id",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <StudentsDetails />
              </Suspense>
            ),
          },
          {
            path: "/admin/leaderships",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <LeadershipList />
              </Suspense>
            ),
          },
          {
            path: "/admin/leadership/:id",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <LeadershipDetails /> 
              </Suspense>
            ),
          },
          {
            path: "*",
            element: <div>Work in Progress</div>,
          },
        ],
  },
  {
    path: "/admin/login",
    element: <OnboardingLayout />,
    children: [
      { index: true, element: <AdminLogin /> },
    ],
  },
  {
    path: "*",
    element: <div>Work in Progress</div>,
  },
];

export default adminRoutes; 