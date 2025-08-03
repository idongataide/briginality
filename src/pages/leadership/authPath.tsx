import React from "react";
import { useLeadershipStore } from "../../global/leadershipStore";
import EnterEmail from "./forgot-password/enterEmail";
import Success from "./success/success";
import EnterOtp from "./enter-otp/enterOtp";
import EnterPassword from "./enter-password/enterPassword";
import ClubPreference from "./signup/ClubPreference";
import BasicInfo from "./signup/BasicInfo";
import Accommodations from "./signup/Accomodations";
import Availability from "./signup/Availability";
import Motivation from "./signup/Motivation";
import Experiences from "../students/signup/Experience";

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
      {navPath?.navPath === "leadership-accommodations" && <Accommodations />}
      {navPath?.navPath === "leadership-motivation" && <Motivation />}
      {navPath?.navPath === "leadership-experience" && <Experiences />}
    </div>
  );
};

export default LeadershipAuthPath; 