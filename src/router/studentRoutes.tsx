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
import GroupChat from "@/pages/students/dashboard/chat/chat";
import ProfilePage from "@/pages/students/dashboard/profile/profile";
import Notices from "@/pages/students/dashboard/notices/notices";
import ClubMembers from "@/pages/students/dashboard/clubMembers/clubMembers";

const studentRoutes: RouteObject[] = [
  {
    path: "student/login",
    element: <OnboardingLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "forgot-password", element: <AuthPath /> },
    ],
  },
  {
    path: "/login",
    element: <OnboardingLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "forgot-password", element: <AuthPath /> },
    ],
  },
  {
    path: "/student/signup",
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
        path: "/students/clubs",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ClubMembers />
          </Suspense>
        ),
      },   
      {
        path: "/students/chat",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <GroupChat />
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
        path: "/students/notices",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Notices />
          </Suspense>
        ),
      },
      {
        path: "/students/profile",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ProfilePage />
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