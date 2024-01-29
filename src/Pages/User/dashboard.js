import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../App.css";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Dashboard() {
  const [pekerjaan, setPekerjaan] = useState([]);
  const [pekerjaanById, setPekerjaanById] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const id = localStorage.getItem("id");
  const [pelamar, setPelamar] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const userId = localStorage.getItem("userId");
  const [shuffledPekerjaan, setShuffledPekerjaan] = useState([]);

  const getByUserId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/pelamar/user/${userId}`
      );
      if (response.data.length === 0) {
        console.log("No data found");
      } else {
        setPelamar(response.data);
        setFilteredUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getByUserId();
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/pekerjaan/all`).then((res) => {
      setPekerjaan(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`http://localhost:8080/api/pekerjaan/getBy/${id}`).then((res) => {
      setPekerjaanById(res.data);
    });
  }, []);

  const deleteUser = async (id) => {
    await Swal.fire({
      title: "Anda yakin?",
      text: "Yakin ingin menghapus data lamar ini? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/api/pelamar/${id}`);
          await Swal.fire({
            position: "center",
            icon: "success",
            title: "Berhasil Menghapus!",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload();
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Terjadi kesalahan saat menghapus data",
          });
        }
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

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    const shuffledArray = shuffleArray(pekerjaan);
    setShuffledPekerjaan(shuffledArray);
  }, [pekerjaan]);

  const offset = currentPage * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(offset, offset + itemsPerPage);
  return (
    <>
      <Sidebar />
      <div className="md:px-4 ml-5 sm:mx-12 mt-24">
        <div className="flex justify-center w-[100%]">
          <main className="s-content md:w-[1800px] md:ml-56 md:px-10 mx-8 ">
            <div
              className="flex flex-wrap md:grid md:grid-cols-3 mx-5"
              data-aos="fade-down"
            >
              {shuffledPekerjaan.slice(0, 3).map((pekerjaan) => (
                <div
                  className="flex flex-nowrap lg:ml-12 mx-auto md:ml-12 ml-5 mb-5 md:mb-10"
                  key={pekerjaan.id}
                >
                  <div className="relative inline-block px-3 mb-1 relative border border-gray-300 rounded-lg">
                    <img
                      className="w-64 h-64 my-2 max-w-xs overflow-hidden rounded-lg shadow-md"
                      src={pekerjaan.fotoPekerjaan}
                      alt=""
                    />

                    <div className="block p-4">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        {pekerjaan.namaPekerjaan}
                      </h3>
                      <div className="flex gap-2">
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
                        <a
                          className="text-center pt-1  w-24 h-8 bg-blue-500 text-white active:bg-blue-200 font-bold uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                          href={"/detail-pekerjaan/" + pekerjaan.id}
                        >
                          Detail
                        </a>
                        <a
                          className="w-24 h-8 pt-1 rounded-lg text-center text-white my-5 font-bold uppercase justify-self-end bg-lime-400 hover:bg-gray-300 hover:text-dark"
                          href={"/lamar-pekerjaan/" + pekerjaan.userId}
                        >
                          Lamar
                        </a>
                      </div>
                    </div>
                    <hr />
                    <div className="flex gap-2 py-5 pr-5">
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
            {/* tabel history melamar */}
            <div className="grid grid-cols-1 px-2 md:grid-cols-3 rounded-t-lg py-2.5 bg-sky-900 text-white text-xl mt-12">
              <div className="flex justify-center mb-2 md:justify-start md:pl-6">
                Pekerjaan Yang DiLamar
              </div>
              <div className="flex flex-wrap justify-center col-span-2 gap-2 md:justify-end"></div>
            </div>
            <div className="overflow-x-auto grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1">
                <table className="w-full table-auto divide-y divide-gray-300 text-center sm:table-fixed">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-xs text-center text-gray-500">
                        No
                      </th>
                      <th className="px-3 py-2 text-xs text-center text-gray-500">
                        Nama
                      </th>
                      <th className="px-3 py-2 text-xs text-center text-gray-500">
                        Email
                      </th>
                      <th className="px-3 py-2 text-xs text-center text-gray-500">
                        Status
                      </th>
                      <th className="px-3 py-2 text-xs text-center text-gray-500">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-300">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-4 whitespace-nowrap text-gray-500"
                        >
                          <div className="flex flex-col items-center">
                            <svg
                              className="w-12 h-12 text-gray-400 mb-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              ></path>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2 17.555V19a1 1 0 001 1h18a1 1 0 001-1v-1.445a3.97 3.97 0 00-1.105-2.788 3.97 3.97 0 00-2.789-1.105 3.97 3.97 0 00-2.788 1.105 3.97 3.97 0 00-1.105 2.788 3.97 3.97 0 00-1.105-2.788 3.97 3.97 0 00-2.788-1.105 3.97 3.97 0 00-2.789 1.105 3.97 3.97 0 00-1.105 2.788z"
                              ></path>
                            </svg>
                            <p className="text-sm">Pekerjaan tidak ditemukan.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginatedUsers.map((val, idx) => {
                        return (
                          <tr key={idx}>
                            <td className="px-3 py-4 text-center">
                              <div className="text-sm text-gray-900 ">
                                {offset + idx + 1}
                              </div>
                            </td>
                            <td className="px-3 py-4 text-center text-gray-700  ">
                              <div className="text-sm text-gray-900">
                                {val.namaLengkap}
                              </div>
                            </td>
                            <td className="px-3 py-4 text-center text-gray-700  ">
                              <div className="text-sm text-gray-900">
                                {val.email}
                              </div>
                            </td>
                            {val.status === "melamar" ? (
                              <>
                                <td className="px-3 py-4 text-center text-gray-700   text-sm  ">
                                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900  ">
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-orange-400 opacity-50 rounded-full"
                                    ></span>
                                    <span className="relative text-xs">
                                      melamar
                                    </span>
                                  </span>
                                </td>
                              </>
                            ) : val.status === "diterima" ? (
                              <>
                                <td className="px-3 py-4 text-center text-gray-700   text-sm  ">
                                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900  ">
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-green-400 opacity-50 rounded-full"
                                    ></span>
                                    <span className="relative text-xs">
                                      Diterima
                                    </span>
                                  </span>
                                </td>
                              </>
                            ) : val.status === "ditolak" ? (
                              <>
                                <td className="px-3 py-4 text-center text-gray-700   text-sm  ">
                                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900  ">
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-green-400 opacity-50 rounded-full"
                                    ></span>
                                    <span className="relative text-xs">
                                      Diterima
                                    </span>
                                  </span>
                                </td>
                              </>
                            ) : null}
                            <td className="whitespace-nowrap text-center py-2 ">
                              {val.status === "melamar" ? (
                                <>
                                  <button
                                    className="text-white bg-red-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                    onClick={() => deleteUser(val.id)}
                                  >
                                    Hapus
                                  </button>
                                  {/* <a
                                    className="text-white bg-blue-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                    href={`/detail-pekerjaan-user/${val.pekerjaanId} `}
                                  >
                                    Detail
                                  </a> */}
                                </>
                              ) : (
                                <>
                                  <button
                                    className="text-white bg-red-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                    onClick={() => deleteUser(val.id)}
                                  >
                                    Hapus
                                  </button>
                                  {/* <a
                                    className="text-white bg-blue-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                    href={`/detail-pekerjaan-user/${val.pekerjaanId} `}
                                  >
                                    Detail
                                  </a> */}
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
