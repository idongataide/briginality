import React from "react";
import { useLeadershipStore } from "../../global/leadershipStore";
import EnterEmail from "./forgot-password/enterEmail";
import Success from "./success/success";
import EnterOtp from "./enter-otp/enterOtp";
import EnterPassword from "./enter-password/enterPassword";
import ClubPreference from "./signup/ClubPreference";
import BasicInfo from "./signup/BasicInfo";
import Availability from "./signup/Availability";
import Motivation from "./signup/Motivation";
import Experience from "./signup/Experience";
import CaseStudy from "./signup/CaseStudy";
import FinalNote from "./signup/FinalNote";

const LeadershipAuthPath: React.FC = () => {
  const navPath = useLeadershipStore();

  return (
    <div>
      {navPath?.navPath === "forgot-password" && <EnterEmail />}
      {navPath?.navPath === "enter-otp" && <EnterOtp />}
      {navPath?.navPath === "enter-password" && <EnterPassword />}
      {navPath?.navPath === "leadership-success" && <Success />}
      {navPath?.navPath === "leadership-basic-info" && <BasicInfo />}
      {navPath?.navPath === "leadership-club-preference" && <ClubPreference />}
      {navPath?.navPath === "leadership-availability" && <Availability />}
      {navPath?.navPath === "leadership-motivation" && <Motivation />}
      {navPath?.navPath === "leadership-experience" && <Experience />}
      {navPath?.navPath === "leadership-case-study" && <CaseStudy />}
      {navPath?.navPath === "leadership-final-notes" && <FinalNote />}
    </div>
  );
};

export default LeadershipAuthPath; 