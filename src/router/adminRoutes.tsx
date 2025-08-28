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
import ClubGroups from "@/pages/admin/dashboard/clubs/ClubGroups";
import Clubs from "@/pages/admin/dashboard/clubs/Clubs";
import RegionalClubs from "@/pages/admin/dashboard/regionalClub/regionalClub";
import Waitlist from "@/pages/admin/dashboard/waitlist/waitlist";
import ProfilePage from "@/pages/leadership/dashboard/profile/profile";
import RegionalClubMembers from "@/pages/admin/dashboard/regionalClub/RegionalClubMembers";

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