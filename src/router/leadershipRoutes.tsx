import { RouteObject } from "react-router-dom";
import OnboardingLayout from "../layouts/OnboardingLayout";
import LeadershipLogin from "@/pages/leadership/login/login";
import LeadershipAuthPath from "@/pages/leadership/authPath";

const leadershipRoutes: RouteObject[] = [
  {
    path: "/leadership/signup",
    element: <OnboardingLayout type="leadership" />,
    children: [
      { index: true, element: <LeadershipAuthPath /> },
    ],
  },
  {
    path: "/leadership",
    element: <OnboardingLayout type="leadership"/>,
    children: [
      { index: true, element: <LeadershipLogin /> },
    ],
  },
  
];

export default leadershipRoutes; 