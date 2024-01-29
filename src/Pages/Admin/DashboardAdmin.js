import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../components/Sidebar/SidebarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faGraduationCap,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

export default function DashboardAdmin() {
  const [pelamar, setPelamar] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [numRows, setNumRows] = useState(0);
  const [numPelamar, setNumPelamar] = useState(0);
  const userId = localStorage.getItem("userId");
  const pekerjaanId = localStorage.getItem("pekerjaanId");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const totalPekerjaan = (
    <FontAwesomeIcon
      icon={faClockRotateLeft}
      className="text-4xl text-black-600 mr-4"
      style={{ color: "gray" }}
    />
  );
  const userIcon = (
    <FontAwesomeIcon
      icon={faUsers}
      className="text-4xl text-black-600 mr-4"
      style={{ color: "gray" }}
    />
  );

  const getAll = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/pelamar/getBy/${pekerjaanId}`
      );
      setPelamar(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/pekerjaan/user/${userId}`)
      .then((res) => {
        const numDataRows = res.data.length;

        setNumRows(numDataRows);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/pelamar/getBy/${pekerjaanId}`)
      .then((res) => {
        const numDataRows = res.data.length;

        setNumPelamar(numDataRows);
      });
    getAll();
  }, []);

  const offset = currentPage * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(offset, offset + itemsPerPage);
  return (
    <>
      <SidebarAdmin />
      <div className="  my-5 mt-24   ">
        <div className="flex justify-center">
          <main className="s-content w-[400px] md:w-[1125px]    md:px-24 mx-8 ">
            <div className="grid grid-cols-1 md:mx-auto md:grid-cols-2  gap-4">
              <div className="rounded-xl bg-white p-1 flex  border-gray-500 border-2">
                <div className="rounded-xl p-4 h-[120px] flex items-center">
                  <div className="flex items-start">
                    <div className="self-start">
                      {" "}
                      {/* Tambahkan class self-start untuk ikon */}
                      {userIcon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-xl text-black">Total Pelamar</p>
                    <p className="text-xl font-bold text-black">{numPelamar}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white p-1 flex  border-gray-500 border-2">
                <div className="rounded-xl p-4 h-[120px] flex items-center">
                  <div className="flex items-start">
                    <div className="self-start">
                      {" "}
                      {/* Tambahkan class self-start untuk ikon */}
                      {totalPekerjaan}
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-xl text-black">Total Pekerjaan Saya</p>
                    <p className="text-xl font-bold text-black">{numRows} </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 px-2 md:grid-cols-3 rounded-t-lg py-2.5 bg-sky-900 text-white text-xl mt-12">
              <div className="flex justify-center mb-2 md:justify-start md:pl-6">
                Rekap Pelamar
              </div>
              <div className="flex flex-wrap justify-center col-span-2 gap-2 md:justify-end"></div>
            </div>
            <div className="overflow-x-auto w-full px-4 bg-white rounded-b-lg shadow">
              <table className="my-4 w-full divide-y divide-gray-300 text-center">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-xs text-center text-gray-500">
                      No
                    </th>
                    <th className="px-3 py-2 text-xs text-center text-gray-500">
                      Nama Pelamar
                    </th>
                    <th className="px-3 py-2 text-xs text-center text-gray-500">
                      Email
                    </th>
                    <th className="px-3 py-2 text-xs text-center text-gray-500">
                      Status
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
                          <p className="text-sm">Pelamar tidak ditemukan.</p>
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
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
