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
  const form = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const userId = localStorage.getItem("userId");

  const getAll = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/pelamar/byUserId${userId}`
      );
      setPelamar(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getAll();
  });

  useEffect(() => {
    // Mendapatkan timestamp hari ini
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Mengatur waktu ke awal hari
    const timestamp = today.getTime();

    // Mengambil data pekerjaan dari server dengan timestamp sebagai parameter
    axios
      .get(`http://localhost:8080/api/pekerjaan/random?timestamp=${timestamp}`)
      .then((res) => {
        setPekerjaan(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
    axios.get(`http://localhost:8080/api/pekerjaan/${id}`).then((res) => {
      setPekerjaanById(res.data);
    });
  }, []);

  const showDetailModal = (id) => {
    const selectedDetail = pekerjaan.find((pekerjaan) => pekerjaan.id === id);
    setShowModal(true);
    setSelectedDetail(selectedDetail);
  };

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

  const offset = currentPage * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(offset, offset + itemsPerPage);
  return (
    <>
      <Sidebar />
      <div className="md:px-4 ml-5   sm:mx-12 mt-24   ">
        <div className="flex justify-center w-[100%]">
          <main className="s-content   md:w-[1800px] md:ml-56  md:px-10 mx-8 ">
            <div
              className="flex flex-wrap md:grid md:grid-cols-3 mx-5"
              data-aos="fade-down"
            >
              {pekerjaan.slice(0, 3).map((pekerjaan) => (
                <div
                  className="flex flex-nowrap lg:ml-12 md:ml-12 ml-5 mb-5"
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
            <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 md:ml-12 mr-2 my-12">
              <table
                className="min-w-full divide-gray-200 text-center p-5"
                id="example"
              >
                <thead className="th-add">
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 text-center tracking-wider">
                      No
                    </th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 text-center tracking-wider">
                      Nama Lengkap
                    </th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 text-center tracking-wider">
                      Email
                    </th>

                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 text-center tracking-wider">
                      Status
                    </th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 text-center tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {paginatedUsers.map((val, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="border-blue-300 left-0 py-2 border-b border-black">
                          {offset + idx + 1}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 border-b border-black">
                          {val.namaLengkap}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 border-b border-black">
                          {val.email}
                        </td>
                        {val.status === "melamar" ? (
                          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm  ">
                            <span class="relative inline-block px-3 py-1 font-semibold text-green-900  ">
                              <span
                                aria-hidden
                                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              ></span>
                              <span class="relative text-xs">melamar</span>
                            </span>
                          </td>
                        ) : (
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700 border-b border-black">
                            Ditolak
                          </td>
                        )}
                        <td className="whitespace-nowrap text-center py-2 border-b border-black">
                          {val.status === "melamar" ? (
                            <>
                              <button
                                className="text-white bg-red-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                onClick={() => deleteUser(val.id)}
                              >
                                Hapus
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="text-white bg-red-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                onClick={() => deleteUser(val.id)}
                              >
                                Hapus
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {showModal && selectedDetail && (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-full md:w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-b from-gray-500 to-white border-solid border-blueGray-200 outline-none focus:outline-none">
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
