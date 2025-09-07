import { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
// import OnboardingLayout from "@/layouts/OnboardingLayout";
import MainRouter from "./mainRouter";
import LoadingScreen from "@/layouts/LoadingScreen";

// Lazy load all components
const AdminLogin = lazy(() => import("@/pages/admin/auth/login/login"));
const Students = lazy(() => import("@/pages/admin/dashboard/students/students"));
const StudentsDetails = lazy(() => import("@/pages/admin/dashboard/students/studentsDetails"));
const LeadershipList = lazy(() => import("@/pages/admin/dashboard/leaderships/leadershipList"));
const LeadershipDetails = lazy(() => import("@/pages/admin/dashboard/leaderships/leadershipDetails"));
const ClubGroups = lazy(() => import("@/pages/admin/dashboard/clubs/ClubGroups"));
const Clubs = lazy(() => import("@/pages/admin/dashboard/clubs/Clubs"));
const RegionalClubs = lazy(() => import("@/pages/admin/dashboard/regionalClub/regionalClub"));
const Waitlist = lazy(() => import("@/pages/admin/dashboard/waitlist/waitlist"));
const ProfilePage = lazy(() => import("@/pages/admin/dashboard/profile/profile"));
const RegionalClubMembers = lazy(() => import("@/pages/admin/dashboard/regionalClub/RegionalClubMembers"));
const DashboardStats = lazy(() => import("@/pages/admin/dashboard/dashboardIndex"));

const adminRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MainRouter />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <DashboardStats />
          </Suspense>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <DashboardStats />
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
        path: "/admin/waitlist",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Waitlist />
          </Suspense>
        ),
      },
      {
        path: "/admin/clubs",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Clubs />
          </Suspense>
        ),
      },
      {
        path: "/admin/club-groups/:region_id",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ClubGroups />
          </Suspense>
        ),
      },
      {
        path: "/admin/regions/:region_id/members",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <RegionalClubMembers />
          </Suspense>
        ),
      },
      {
        path: "/admin/regional-clubs",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <RegionalClubs />
          </Suspense>
        ),
      },
      {
        path: "/admin/profile",
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
  {
    path: "/admin/login",
    // element: <OnboardingLayout />,
    children: [
      { 
        index: true, 
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <AdminLogin />
          </Suspense>
        ) 
      },
    ],
  },
  {
    path: "*",
    element: <div>Work in Progress</div>,
  },
];

export default adminRoutes;