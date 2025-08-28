import { useOnboardingStore } from "@/global/store";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DashboadLoadingScreen: React.FC = () => {
  const { pathname } = useLocation();
  const { setNavPath } = useOnboardingStore();

  useEffect(() => {
    setNavPath(pathname.replace("/overview", "deshboard"));
  }, []);

  return (
    <div className="w-full">
      <main id="div.w-full" className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="h-[100px] border-gray-500 rounded-md  bg-zinc-300 animate-pulse"></div>
        <div className="h-[100px] border-gray-500 rounded-md  bg-zinc-300 animate-pulse"></div>
        <div className="h-[100px] border-gray-500 rounded-md  bg-zinc-300 animate-pulse"></div>
        <div className="h-[100px] border-gray-500 rounded-md  bg-zinc-300 animate-pulse"></div>
      </main>

      <main className="grid grid-cols-1 md:grid-cols-5 mt-30 gap-5">
        <div className="h-[600px] border-gray-500 rounded-md  bg-zinc-300 animate-pulse col-span-1 md:col-span-3"></div>
        <div className="h-[600px] border-gray-500 rounded-md  bg-zinc-300 animate-pulse col-span-1 md:col-span-2"></div>
      </main>
    </div>
  );
};

export default DashboadLoadingScreen;
