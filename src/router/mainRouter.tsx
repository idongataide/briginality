import React, { Suspense, useEffect } from "react";
import { useOnboardingStore } from "../global/store";
import { useLeadershipStore } from "@/global/leadershipStore";
import { useNavigate } from "react-router-dom";
import RoleSelectionPage from "@/pages/RoleSelectionPage";
import DashboardLayout from "@/layouts/dashboardLayout";
import LoadingScreen from "@/layouts/LoadingScreen";


const MainRouter: React.FC = () => {
  const { token: onboardingToken, role: onboardingRole } = useOnboardingStore();
  const { token: leadershipToken, role: leadershipRole } = useLeadershipStore();
  const navigate = useNavigate();


  useEffect(() => {
   if (onboardingToken || leadershipToken) {
      if (onboardingRole?.includes("club-member")) {
        navigate("/students/dashboard", { replace: true });
      } else if (
        leadershipRole?.includes("club-president") || 
        leadershipRole?.includes("leader")||
        leadershipRole?.includes("club-vice-president")
      ) {
        navigate("/leadership/dashboard", { replace: true });
      } else if (onboardingRole?.includes("admin")) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/role-selection", { replace: true });
      }
    }

  }, [onboardingToken, leadershipToken, onboardingRole, leadershipRole, navigate]);

  if (!onboardingToken && !leadershipToken) {
    return (
      <RoleSelectionPage/>
    );
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <DashboardLayout />
    </Suspense> 
  );
};

export default MainRouter;
