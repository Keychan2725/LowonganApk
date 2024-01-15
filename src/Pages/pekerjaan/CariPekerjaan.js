import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function CariPekerjaan() {
  return (
    <>
      <Sidebar />
      <div className="md:px-4   sm:mx-12 mt-24   ">
        <div className="flex justify-center w-[100%]">
          <main className="s-content w-[390px] md:w-[1125px]    md:px-10 mx-8 ">
            
            <div className="flex flex-wrap md:grid md:grid-cols-3 gap-3 ">
              <div className="flex flex-nowrap lg:ml-12 md:ml-12 ml-5">
                <div className="inline-block px-3 mb-1 relative">
                  <img src="" className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md " />
                  <p>Bekerja di  </p>
                  <button className="w-24 h-8 rounded-lg text-white my-5 justify-self-end bg-lime-400 hover:bg-gray-100 hover:text-dark ">
                    Melamar
                  </button>
                </div>
              </div>
              <div className="flex flex-nowrap lg:ml-12 md:ml-12 ml-5">
                <div className="inline-block px-3 mb-1 relative">
                  <img className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md " />
                  <p>Bekerja di  </p>
                  <button className="w-24 h-8 rounded-lg text-white my-5 justify-self-end bg-lime-400 hover:bg-gray-300 hover:text-dark ">
                    Melamar
                  </button>
                </div>
              </div>
              <div className="flex flex-nowrap lg:ml-12 md:ml-12 ml-5">
                <div className="inline-block px-3 mb-1 relative">
                  <img className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md " />
                  <p>Bekerja di  </p>
                  <button className="w-24 h-8 rounded-lg text-white my-5 justify-self-end bg-lime-400 hover:bg-gray-300 hover:text-dark ">
                    Melamar
                  </button>
                </div>
              </div>
              <div className="flex flex-nowrap lg:ml-12 md:ml-12 ml-5">
                <div className="inline-block px-3 mb-1 relative">
                  <img className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md " />
                  <p>Bekerja di  </p>
                  <button className="w-24 h-8 rounded-lg text-white my-5 justify-self-end bg-lime-400 hover:bg-gray-300 hover:text-dark ">
                    Melamar
                  </button>
                </div>
              </div>
              <div className="flex flex-nowrap lg:ml-12 md:ml-12 ml-5">
                <div className="inline-block px-3 mb-1 relative">
                  <img className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md " />
                  <p>Bekerja di  </p>
                  <button className="w-24 h-8 rounded-lg text-white my-5 justify-self-end bg-lime-400 hover:bg-gray-300 hover:text-dark ">
                    Melamar
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
