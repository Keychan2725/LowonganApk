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

  const Terima = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/users/status/terima/${id}`, {
        status: "Diterima",
      });
      Swal.fire({
        icon: "success",
        title: "Menerima users",
      });
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response ? error.response.data.message : "Kesalahan",
      });
    }
  };

  const non_aktif = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/users/status/non-aktif/${id}`,
        {
          status: null,
        }
      );
      Swal.fire({
        icon: "success",
        title: "Non Aktif users",
      });
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response ? error.response.data.message : "Kesalahan",
      });
    }
  };

  const deleteUser = async (id) => {
    await Swal.fire({
      title: "Anda yakin?",
      text: "Yakin ingin menghapus data users ini? Pastikan sudah memberikan pemberitahuan melalui email",
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <p className="text-xl text-black">Total Pekerjaan</p>
                    <p className="text-xl font-bold text-black">{numRows} </p>
                  </div>
                </div>
              </div>
            </div>
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
                      Nama Pelamar
                    </th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 text-center tracking-wider">
                      Email
                    </th>

                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 text-center tracking-wider">
                      Status
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
                        
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
