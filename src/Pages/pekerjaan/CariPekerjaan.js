import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";

export default function CariPekerjaan() {

  const [pekerjaan, setPekerjaan] = useState([]);
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/pekerjaan/all`).then((res) => {
      setPekerjaan(res.data);
    });
  }, []);
  return (
    <>
      <Sidebar />
      <div className="md:px-4   sm:mx-12 mt-44   ">
        <div className="flex justify-center w-[100%]">
          <main className="s-content w-[390px] md:w-[1125px]    md:px-10 mx-8 ">
            
            <div className="flex flex-wrap md:grid md:grid-cols-3 gap-3 ">
            {pekerjaan.map((pekerjaan) => (
                <div className="flex flex-nowrap lg:ml-12 md:ml-12 ml-5">
                  <div className="inline-block px-3 mb-1 relative border border-gray-300">
                    <img
                      className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md"
                      src={pekerjaan.fotoPekerjaan}
                      alt=""
                    />

                    <div className="block p-4">
                      <h3 className="text-xl font-bold mb-2 text-gray-800  ">
                        {pekerjaan.namaPekerjaan}
                      </h3>
                      <p className="text-gray-600  ">
                        {pekerjaan.alamatPekerjaan}
                      </p>
                    </div>

                    <div className="flex justify-around items-center mt-2">
                      <button
                        className="w-24 h-8 bg-blue-500 text-white active:bg-blue-200 font-bold uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                        onClick={() => setShowModal(true)}
                      >
                        Detail
                      </button>
                      <button
                        // onClick={() => rekrut()}
                        className="w-24 h-8 rounded-lg text-white my-5 font-bold uppercase justify-self-end bg-lime-400 hover:bg-gray-300 hover:text-dark"
                      >
                        Rekrut
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {showModal ? (
  <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-full md:w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">Detail</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowModal(false)}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-around">
              <div className="mb-4 md:mb-0">
                <img src="" alt="" className="w-64 h-64 max-w-xs" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  {/* Data here */}
                </h3>
                <p>adas</p>
                <p>asdasd</p>
                <p>ajhsdkjsad </p>
                <p>ajhsdkjsad </p>
          
              </div>
            </div>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
) : null}
          </main>
        </div>
      </div>
    </>
  );
}
