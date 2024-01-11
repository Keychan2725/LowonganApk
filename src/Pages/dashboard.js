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
          <main className="s-content w-[390px] md:w-[1125px]    md:px-10 mx-8 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col bg-white m-auto p-auto">
                <h3 className="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-2xl text-gray-800">
                    Pekerjaan
                </h3>
                <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                  <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
                    <div className="inline-block px-3 mb-1 relative">
                      <div className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-black hover:shadow-xl transition-shadow duration-300 ease-in-out"></div>
                      <p>Bekerja di PT Indofood</p>
                      <button className="  absolute-end bg-lime-400 hover:bg-gray-100 hover:text-dark ">
                        Melamar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 mr-24 md:grid-cols-2 gap-4">
              <div className="flex flex-col bg-white m-auto p-auto">
                <h3 className="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-2xl text-gray-800">
                  Pegawai
                </h3>
                <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                  <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
                    <div className="inline-block px-3 mb-1 relative">
                      <div className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-black hover:shadow-xl transition-shadow duration-300 ease-in-out"></div>
                      <p>Mencari Perusahan minyak</p>
                      <button className="  absolute-end bg-lime-400 hover:bg-gray-100 hover:text-dark ">
                        Melamar
                      </button>
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
