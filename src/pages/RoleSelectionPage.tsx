import Images from "@/components/images";
import React from "react";
import { Link } from "react-router-dom";

const RoleSelectionPage: React.FC = () => {
  return (
    <div className="!min-h-screen !px-4 md:!px-30 lg:!px-15 xl:!px-38 md:!py-10 !py-10 !flex !justify-center !flex-col !rounded-3xl !items-center !bg-[#f2f6f8]">
      <div className="!text-center !w-full md:!w-full lg:!w-[calc(90%)] xl:!w-[calc(100%)] pb-30! !h-[calc(100vh-10%)] !relative rounded-3xl bg-white lg:!p-8 xl:!p-10 md:!p-10 !p-5">
        <img
          src={Images.logo2}
          alt="logo"
          width={220}
          height={40}
          className="!mx-left !mb-3"
        />
        <h2 className="!text-3xl !font-[600] !mb-8 !text-center !text-gray-800 dark:!text-white">
          Let's Get Started
        </h2>

        <div className="!flex !flex-col mb-4">
          <div className="!flex !flex-wrap !justify-center !gap-10">
            {/* Leadership Card */}
            <Link
              to="/leadership/login"
              className="!w-full md:!w-full lg:!w-[47%] xl:!w-[36%] md:!p-8 !p-2 !py-10 !bg-white !rounded-3xl !transition !border !border-[#d6dadd] hover:!shadow-lg hover:!scale-105 !transform"
            >
              <img
                src={Images.features2}
                alt="Leadership"
                className="!mx-auto !w-[160px] md:!w-[200px]"
              />
              <h3 className="!text-xl md:!text-xl xl:!text-2xl !font-[500] !mt-4 !mb-2 !text-textDark !text-center">
                I am a Leader
              </h3>
              <p className="!text-[#7d8489] !text-[16px] dark:!text-gray-300 !text-center">
                Log in as a club president  or leader to manage your dashboard and members.
              </p>
            </Link>

            {/* Student Card */}
            <Link
              to="/student/login"
              className="!w-full md:!w-full lg:!w-[47%] xl:!w-[36%] md:!p-8 !p-2 !py-10 !bg-white !rounded-3xl !transition !border !border-[#d6dadd] hover:!shadow-lg hover:!scale-105 !transform"
            >
              <img
                src={Images.student}
                alt="Student"
                className="!mx-auto !w-[160px] md:!w-[200px]"
              />
              <h3 className="!text-xl md:!text-xl xl:!text-2xl !font-[500] !mt-4 !mb-2 !text-textDark !text-center">
                I am a Student
              </h3>
              <p className="!text-[#7d8489] !text-[16px] dark:!text-gray-300 !text-center">
                Log in as a student to access your dashboard, resources, and activities.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
