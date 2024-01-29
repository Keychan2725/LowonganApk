import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../components/Sidebar/SidebarAdmin";
import Swal from "sweetalert2";
import axios from "axios";
import ReactPaginate from "react-paginate";
import emailjs from "emailjs-com";

export default function NotifikasiPelamar() {
  const [pelamar, setPelamar] = useState([]);
  const [modal, setModal] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const form = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const pekerjaanId = localStorage.getItem("pekerjaanId");

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
      await axios.put(`http://localhost:8080/api/pelamar/terima/${id}`, {
        status: "Diterima",
      });
      Swal.fire({
        icon: "success",
        title: "Menerima pelamar",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response ? error.response.data.message : "Kesalahan",
      });
    }
  };
  const Batal = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/pelamar/batal/${id}`, {});
      Swal.fire({
        icon: "success",
        title: "Batal menerima pelamar",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
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
      text: "Yakin ingin menghapus data pelamar ini? Pastikan sudah memberikan pemberitahuan melalui email",
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

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_uvzh9ku",
        "template_bda84qt",
        form.current,
        "dF33S96RojNw8_rXn"
      )
      .then(
        (result) => {
          if (result) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Berhasil Dikirim",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              window.location.href = "/notifikasi-pelamar";
            }, 1000);
          }
        },
        (error) => {
          if (error) {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Gagal Dikirim",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      );
  };

  const cariPelamar = (term) => {
    if (term.trim() === "") {
      setFilteredUsers([...pelamar]);
    } else {
      const filteredResults = pelamar.filter(
        (user) =>
          user.namaLengkap &&
          user.namaLengkap.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredUsers(filteredResults);
    }
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    getAll();
  }, []);

  const offset = currentPage * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(offset, offset + itemsPerPage);
  return (
    <>
      <SidebarAdmin />
      <div className="md:px-4   sm:mx-12 mt-24   ">
        <div className="flex justify-center w-[100%]">
          <main className="s-content w-[390px] md:w-[1125px]    md:px-10 mx-8 ">
            <div className=" ">
              <div className="grid flex justify-between md:grid-cols-1  overflow-hidden overflow-x-auto  ">
                <div className="grid grid-cols-1 ">
                  <span className="text-center text-white w-auto add-siswa active:bg-slate-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"></span>
                </div>

                <div className="flex justify-between my-5 md:">
                  <button
                    onClick={() => setModal(true)}
                    className="text-white  bg-blue-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150 md:text-left"
                  >
                    Kirim Pemberitahuan
                  </button>
                  <label className="flex justify-around">
                    <input
                      type="text"
                      className="text-dark rounded-lg mx-2   active:bg-slate-300   text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                      placeholder="Cari nama pelamar"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        cariPelamar(e.target.value);
                      }}
                    />
                  </label>
                </div>
              </div>
              <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 p-5">
                <table
                  className="min-w-full divide-gray-200 text-center p-5"
                  id="example"
                >
                  <thead className="th-add">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                        No
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                        Nama Lengkap
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                        Email
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                        Status
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody >
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
                            <td className="border-blue-300 left-0 py-2">
                              {offset + idx + 1}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {val.namaLengkap}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {val.email}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {val.status}
                            </td>
                            <td className="whitespace-nowrap text-ceter py-2">
                              {val.status !== null &&
                              val.status === "melamar" ? (
                                <>
                                  <a
                                    className="text-white bg-blue-600 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                    href={"/detail-pelamar/" + val.id}
                                  >
                                    Detail
                                  </a>
                                  <button
                                    className="text-white bg-green-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                    onClick={() => Terima(val.id)}
                                  >
                                    Terima
                                  </button>
                                  <button
                                    className="text-white bg-red-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                    onClick={() => deleteUser(val.id)}
                                  >
                                    Hapus
                                  </button>
                                </>
                              ) : val.status !== null ? (
                                <>
                                  <button
                                    className="text-white bg-purple-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                    onClick={() => Batal(val.id)}
                                  >
                                  Batal
                                  </button>
                                  <button
                                    className="text-white bg-red-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                    onClick={() => deleteUser(val.id)}
                                  >
                                    Hapus
                                  </button>
                                </>
                              ) : (
                                <button
                                  className="text-white bg-purple-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                  onClick={() => Terima(val.id)}
                                >
                                  Aktifkan
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              <ReactPaginate
                className="flex justify-between mb-5"
                previousLabel={
                  <button
                    className="text-white bg-red-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                    aria-label="Previous"
                  >
                    Previous
                  </button>
                }
                nextLabel={
                  <button
                    className="text-white bg-blue-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                    aria-label="Next"
                  >
                    Next
                  </button>
                }
                breakLabel={<span className="pagination-ellipsis">...</span>}
                pageCount={Math.ceil(filteredUsers.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
                pageClassName={"pagination-item"}
                pageLinkClassName={"pagination-link"}
              />
            </div>
            {modal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-1 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Kirim Pemberitahuan
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 opacity-20 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setModal(false)}
                        >
                          <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative flex-auto">
                        <form
                          ref={form}
                          onSubmit={sendEmail}
                          className="space-y-4 p-3"
                        >
                          <div>
                            <div className="grid md:grid-cols-1 md:gap-6">
                              <div className="relative">
                                <label>Nama Perusahaan</label>
                                <input
                                  type="text"
                                  name="nama_perusahaan"
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                  placeholder="Masukan Nama Perusahaan  "
                                  required
                                />
                              </div>
                              <div className="relative">
                                <label>Email Perusahaan</label>
                                <input
                                  type="email"
                                  name="email_pekerjaan"
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                  placeholder="Masukan Email Perusahan "
                                  required
                                />
                              </div>
                              <div className="relative">
                                <label>Kirim Ke</label>
                                <input
                                  type="email"
                                  name="email_pelamar"
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                  placeholder="Masukan Email Pelamar  "
                                  required
                                />
                              </div>
                              <div className="relative">
                                <label>Isi Pesan</label>
                                <input
                                  type="textarea"
                                  name="message"
                                  rows={4}                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-5 p-3 border-t border-solid border-slate-200 rounded-b">
                            <button
                              className="text-white bg-red-700 font-bold uppercase px-6 py-3.5 rounded-md text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setModal(false)}
                            >
                              Batal
                            </button>
                            <button
                              className="bg-gradient-to-r from-[#0b409c] to-[#10316b] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="submit"
                            >
                              Kirim
                            </button>
                          </div>
                        </form>
                      </div>
                      {/*footer*/}
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
