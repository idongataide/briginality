import { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import OnboardingLayout from "../layouts/OnboardingLayout";
import LoadingScreen from "@/layouts/LoadingScreen";
import MainRouter from "./mainRouter";
import ClubMembers from "@/pages/leadership/dashboard/clubMembers/clubMembers";

// Lazy load all leadership components
const LeadershipLogin = lazy(() => import("@/pages/leadership/login/login"));
const LeadershipAuthPath = lazy(() => import("@/pages/leadership/authPath"));
const DashboardIndex = lazy(() => import("@/pages/leadership/dashboard/dashboardIndex"));
const MeetingsPage = lazy(() => import("@/pages/leadership/dashboard/meetings/meetings"));
const CalendarPage = lazy(() => import("@/pages/leadership/dashboard/calendar/calendar"));
const ProfilePage = lazy(() => import("@/pages/leadership/dashboard/profile/profile"));
const NoticesPage = lazy(() => import("@/pages/leadership/dashboard/notices/notices"));
const GroupChat = lazy(() => import("@/pages/leadership/dashboard/chat/chat"));

const leadershipRoutes: RouteObject[] = [
  {
    path: "/leadership/signup",
    element: <OnboardingLayout type="leadership" />,
    children: [
      { 
        index: true, 
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <LeadershipAuthPath />
          </Suspense>
        ) 
      },
    ],
  },
  {
    path: "/leadership/login",
    element: <OnboardingLayout type="leadership" />,
    children: [
      { 
        index: true, 
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <LeadershipLogin />
          </Suspense>
        ) 
      },
    ],
  },
  {
    path: "/leadership",
    element: <OnboardingLayout type="leadership"/>,
    children: [
      { 
        index: true, 
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <LeadershipLogin />
          </Suspense>
        ) 
      },
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
        path: "/leadership/clubs",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ClubMembers />
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