import React, { useEffect, useState } from "react";

// components

import CardSettings from "../components/Cards/CardSettings.js";
import CardProfile from "../components/Cards/CardProfile.js";
import Sidebar from "../components/Sidebar/Sidebar.js";

export default function Settings() {
  return (
    <>
      <Sidebar />
      <div className="md:px-4   sm:mx-12 mt-24   ">
        <div className="flex justify-center w-[100%]">
          <main className="s-content w-[390px] md:w-[1125px]    md:px-10 mx-8 ">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-8/12 px-4">
                <CardSettings />
              </div>
              <div className="w-full lg:w-4/12 px-4 ">
                <CardProfile />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
