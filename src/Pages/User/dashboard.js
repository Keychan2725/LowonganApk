import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../App.css";
import axios from "axios";
import AOS from "aos";

export default function Dashboard() {
  const [pekerjaan, setPekerjaan] = useState([]);
  const [pekerjaanById, setPekerjaanById] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const id = localStorage.getItem("id");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/pekerjaan/all`).then((res) => {
      setPekerjaan(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`http://localhost:8080/api/pekerjaan/${id}`).then((res) => {
      setPekerjaanById(res.data);
    });
  }, []);

  const showDetailModal = (id) => {
    const selectedDetail = pekerjaan.find((pekerjaan) => pekerjaan.id === id);
    setShowModal(true);
    setSelectedDetail(selectedDetail);
  };

  return (
    <>
      <Sidebar />
      <div className="md:px-4   sm:mx-12 mt-24   ">
        <div className="flex justify-center w-[100%]">
          <main className="s-content w-[390px] md:w-[1125px]    md:px-10 mx-8 ">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col bg-white m-auto p-auto ">
                <h3 className="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-2xl text-gray-800">
                  Pekerjaan
                </h3>
                <div className="flex flex-column justify-around pb-10 md:justify-around">
                  {pekerjaan.map((pekerjaan) => (
                    <div className="w-full md:w-1/4 lg:w-1/4 p-4">
                      <div className="inline-block px-3 mb-1 relative border border-gray-300">
                        <img
                          className="w-64 h-64 my-2 max-w-xs overflow-hidden rounded-lg shadow-md"
                          src={pekerjaan.fotoPekerjaan}
                          alt=""
                        />
                        <div className="block p-4">
                          <h3 className="text-xl font-bold mb-2 text-gray-800">
                            {pekerjaan.namaPekerjaan}
                          </h3>
                          <p className="text-gray-600">
                            {pekerjaan.alamatPekerjaan}
                          </p>
                        </div>
                        <div className="flex justify-around items-center mt-2">
                          <button
                            className="w-24 h-8 bg-blue-500 text-white active:bg-blue-200 font-bold uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                            onClick={() => showDetailModal(pekerjaan.id)}
                          >
                            Detail
                          </button>
                          <a
                            className="w-24 h-8 rounded-lg text-center text-white my-5 font-bold uppercase justify-self-end bg-lime-400 hover:bg-gray-300 hover:text-dark"
                            href={"/lamar-pekerjaan"}
                          >
                            Lamar
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {showModal && selectedDetail && (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-full md:w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-b from-black to-white border-solid border-blueGray-200 outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-lg">
                        <h3 className="text-3xl font-semibold text-white">
                          Detail
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-white opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-white opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-around">
                          <div className="mb-4 md:mb-0">
                            <img
                              src=""
                              alt=""
                              className="w-64 h-64 max-w-xs rounded-lg"
                            />
                          </div>
                          <div className="md:mx-5">
                            <h3 className="text-xl font-bold mb-2 text-white">
                              {/* Data here */}
                              Nama Pekerjaan : {selectedDetail?.namaPekerjaan}
                            </h3>
                            <p className="text-xl text-white">
                              Kontak: 086356237
                            </p>
                            <p className="text-xl text-white">
                              Alamat: {selectedDetail?.alamatPekerjaan}
                            </p>
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
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            )}

        
          </main>
        </div>
      </div>
    </>
  );
}
