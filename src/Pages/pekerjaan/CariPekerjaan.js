import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CariPekerjaan() {
  const [pekerjaan, setPekerjaan] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);

  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000,
  //     easing: "ease-in-out",
  //   });
  // }, [])
  useEffect(() => {
    axios.get(`http://localhost:8080/api/pekerjaan/all`).then((res) => {
      setPekerjaan(res.data);
    });
  }, []);

  const handleLamar = () => {
    Swal.fire({
      title: "Konfirmasi Lamar",
      text: "Apakah Anda ingin melamar pekerjaan ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Berhasil!", "Pekerjaan telah dilamar.", "success");
        window.location.href = "/dashboard";
      }
    });
  };

  const calculateTimeAgo = (timestamp) => {
    const currentDate = new Date();
    const postDate = new Date(timestamp);

    const timeDifference = currentDate - postDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years} tahun yang lalu`;
    } else if (months > 0) {
      return `${months} bulan yang lalu`;
    } else if (days > 0) {
      return `${days} hari yang lalu`;
    } else if (hours > 0) {
      return `${hours} jam yang lalu`;
    } else if (minutes > 0) {
      return `${minutes} menit yang lalu`;
    } else {
      return `${seconds} detik yang lalu`;
    }
  };

  const showDetailModal = (id) => {
    const selectedDetail = pekerjaan.find((pekerjaan) => pekerjaan.id === id);
    setShowModal(true);
    setSelectedDetail(selectedDetail);
  };

  return (
    <>
      <Sidebar />
      <div className="md:px-4   sm:mx-12 mt-44   ">
        <div className="flex justify-center w-[100%]">
          <main className="s-content   md:w-[1800px] md:ml-56    md:px-10 mx-8 ">
            <div className="flex flex-wrap md:grid md:grid-cols-3 gap-3 ">
              {pekerjaan.map((pekerjaan) => (
                <div className="col-span-1 flex flex-nowrap lg:ml-12 md:ml-12 ml-5 mb-5" >
                  <div className="inline-block px-3 mb-1 relative border border-gray-300 rounded-lg">
                    <img
                      className="w-64 h-64 my-2 max-w-xs overflow-hidden rounded-lg shadow-md"
                      src={pekerjaan.fotoPekerjaan}
                      alt=""
                    />

                    <div className="block p-4">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        {pekerjaan.namaPekerjaan}
                      </h3>
                      <div className="flex gap-2 mb-1">
                        <svg
                          className="w-5 h-5 text-gray-500 transition duration-75 hover:text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                        >
                          <path
                            fill="#f45757"
                            d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                          />
                        </svg>
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
                          href={"/lamar-pekerjaan/" + pekerjaan.userId}
                        >
                          Lamar
                        </a>
                      </div>
                    </div>
                    <hr className="font-semibold" />
                    <div className="flex gap-2 my-5 mx-3">
                      <svg
                        className="w-5 h-5 text-gray-500 transition duration-75 hover:text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        {" "}
                        <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                      </svg>

                      <p className="text-gray-600">
                        {" "}
                        {calculateTimeAgo(pekerjaan.tanggalPost)}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
                            <p className="text-xl mb-2 text-white">
                              Email : {selectedDetail?.email}
                            </p>
                            <p className="text-xl mb-2 text-white">
                              Alamat : {selectedDetail?.alamatPekerjaan}
                            </p>
                            <p className="text-xl mb-2 text-white">
                              Gaji Pegawai : {selectedDetail?.gajiPegawai}
                            </p>
                            <p className="text-xl mb-2 text-white">
                              Tentang Pekerjaan :{" "}
                              {selectedDetail?.tentangPekerjaan}
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
