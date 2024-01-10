import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar/Sidebar";
import "../App.css";

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="md:px-4   sm:mx-12 mt-24   ">
        <div className="flex justify-center w-[100%]">
          <main className="s-content w-[390px] md:w-[1125px]   md:px-10 mx-8 py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex flex-col bg-white m-auto p-auto">
                <h1 class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800">
               Lowongan 
                </h1>
                <div class="flex overflow-x-scroll pb-10 hide-scroll-bar">
                  <div class="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
                    <div class="inline-block px-3 mb-1 relative">
                      <div class="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-black hover:shadow-xl transition-shadow duration-300 ease-in-out"></div>
                      <p>Bekerja di PT Indofood</p>
                      <button className="  absolute-end bg-lime-400 hover:bg-gray-100 hover:text-dark ">Melamar</button>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
