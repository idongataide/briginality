import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Images from "../components/images";
import { useOnboardingStore } from "@/global/store";
import { useLeadershipStore } from "@/global/leadershipStore";


interface Props {
    children?: ReactNode;
    type?: "student" | "leadership";
}

const OnboardingLayout: React.FC<Props> = ({ children, type = "student" }) => {
    const onboardingNav = useOnboardingStore();
    const leadershipNav = useLeadershipStore();
    const navPath = type === "student" ? onboardingNav : leadershipNav;
    const bgImage =
    navPath?.navPath === "club-preference"
    ? Images.authbg2
    : navPath?.navPath === "experience"
    ? Images.authbg3
    : navPath?.navPath === "accomodations"
    ? Images.authbg4
    : navPath?.navPath === "success"
    ? Images.authbg5
    : navPath?.navPath === "leadership-basic-info"
    ? Images.authbg5
    : navPath?.navPath === "leadership-club-preference"
    ? Images.authbg6
    : navPath?.navPath === "leadership-experience"
    ? Images.authbg3
    : navPath?.navPath === "leadership-case-study"
    ? Images.authbg4
    : navPath?.navPath === "leadership-final-notes"
    ? Images.authbg5
    : navPath?.navPath === "leadership-success"
    ? Images.authbg5
    : Images.authbg;
  
    return (
        <main className="bg-[#f2f6f8] min-h-screen w-[100%]">
            <div className="flex  lg:w-full w-full min-h-screen">
                {/* Left image side */}
                <div className="hidden lg:block lg:w-[55%] min-h-screen overflow-hidden relative" 
                     style={{ 
                         backgroundImage: `url(${bgImage})`, 
                         backgroundSize: 'cover', 
                         backgroundPosition: 'center' 
                     }}>
                  <div className="overlay absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="flex flex-col justify-between h-full p-8">
                        <div className="text-white text-2xl font-bold"></div>
                        <div className="flex gap-6">
                        <div className="backdrop-blur-lg bg-[fff] bg-opacity-40 flex items-center min-h-[200px]  rounded-xl p-6 w-1/2 text-white gap-2">
                            <div className="">
                                <div className="w-9 h-9 bg-[#F9FAFB] rounded-full mb-5"></div>
                                    <div className="text-[19px] font-normal">Connect with global student leaders and build meaningful relationships</div>
                                </div>
                            </div>
                            <div className="backdrop-blur-lg  flex items-center bg-[fff] bg-opacity-40  min-h-[200px]  rounded-xl p-6 w-1/2 text-white gap-2">
                                <div className="">
                                     <div className="w-9 h-9 bg-[#F9FAFB] rounded-full mb-5 "></div>
                                     <div className="text-[19px] font-normal">Join regional clubs and participate in leadership development programs</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Right side for children (login form, etc.) */}
                <div className="lg:w-[45%]  min-h-screen w-full flex items-center justify-center bg-white">
                    <div className="w-full max-w-lg p-8">
                        {children ? children : <Outlet />}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default OnboardingLayout;