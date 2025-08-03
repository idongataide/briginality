import React from "react";
import { useOnboardingStore } from "../../global/store";
import EnterEmail from "./forgot-password/enterEmail";
import Success from "./success/success";
import EnterOtp from "./enter-otp/enterOtp";
import EnterPasspord from "./enter-password/enterPassword";
import ClubPrederence from "./signup/ClubPreference";
import BasicInfo from "./signup/BasicInfo";
import Experiences from "./signup/Experience";
import Accommodations from "./signup/Accomodations";

const AuthPath: React.FC = () => {
  const navPath = useOnboardingStore();


  return (
          <div>     
            {navPath?.navPath === "forgot-password" && <EnterEmail/>}   
            {navPath?.navPath === "enter-otp" && <EnterOtp/>}   
            {navPath?.navPath === "enter-password" && <EnterPasspord/>}   
            {navPath?.navPath === "success" && <Success/>}   
            {navPath?.navPath === "basic-info" && <BasicInfo/>}   
            {navPath?.navPath === "club-preference" && <ClubPrederence/>}   
            {navPath?.navPath === "experience" && <Experiences/>}   
            {navPath?.navPath === "accomodations" && <Accommodations/>}   
            {navPath?.navPath === "motivation" && <Accommodations/>}   
          </div>       
  );
};

export default AuthPath;
