import React, { useEffect, useState } from "react";

// components

import CardSettings from "../../components/CardsAdmin/CardSettingsAdmin.js";
import CardProfile from "../../components/CardsAdmin/CardProfileAdmin.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import SidebarAdmin from "../../components/Sidebar/SidebarAdmin.js";

export default function SettingsAdmin() {
  return (
    <>
      <SidebarAdmin />
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
