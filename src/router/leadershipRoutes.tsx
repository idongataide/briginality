import { RouteObject } from "react-router-dom";
import OnboardingLayout from "../layouts/OnboardingLayout";
import LeadershipLogin from "@/pages/leadership/login/login";
import LeadershipAuthPath from "@/pages/leadership/authPath";
import { Suspense } from "react";
import DashboardIndex from "@/pages/leadership/dashboard/dashboardIndex";
import LoadingScreen from "@/layouts/LoadingScreen";
import MainRouter from "./mainRouter";
import MeetingsPage from "@/pages/leadership/dashboard/meetings/meetings";
import CalendarPage from "@/pages/leadership/dashboard/calendar/calendar";
import ProfilePage from "@/pages/leadership/dashboard/profile/profile";
import NoticesPage from "@/pages/leadership/dashboard/notices/notices";
import GroupChat from "@/pages/leadership/dashboard/chat/chat";

const leadershipRoutes: RouteObject[] = [
  {
    path: "/leadership/signup",
    element: <OnboardingLayout type="leadership" />,
    children: [
      { index: true, element: <LeadershipAuthPath /> },
    ],
  },
  {
    path: "/leadership/login",
    element: <OnboardingLayout type="leadership" />,
    children: [
      { index: true, element: <LeadershipLogin /> },
    ],
  },
  {
    path: "/leadership",
    element: <OnboardingLayout type="leadership"/>,
    children: [
      { index: true, element: <LeadershipLogin /> },
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
        path: "/leadership/dashboard",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <DashboardIndex />
          </Suspense>
        ),
      },
      {
        path: "/leadership/meetings",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <MeetingsPage />
          </Suspense>
        ),
      },     
      {
        path: "/leadership/chat",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <GroupChat />
          </Suspense>
        ),
      }, 
      {
        path: "/leadership/calendar",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <CalendarPage />
          </Suspense>
        ),
      },
      {
        path: "/leadership/profile",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: "/leadership/notices",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <NoticesPage />
          </Suspense>
        ),
      },
      {
        path: "leadership/*",
        element: <div>Work in Progress</div>,
      },
    ],
  },
  
];

export default leadershipRoutes; 