import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../components/Sidebar/SidebarAdmin";
import axios from "axios";
import Swal from "sweetalert2";

export default function HistoryPekerjaan() {
    const [pekerjaan, setPekerjaan] = useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [loading ,setLoading] = useState([]);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const AuthToken = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    
    // const melamarPekerjaan = (pekerjaanId) => {
    //     axios.post(`http://localhost:8080/api/lamar`, {
    //         pekerjaanId
    //     }).then((response) => {
    //         if (response.status === 200) {
    //             alert("Berhasil melamar pekerjaan.");
    //         } else {
    //             alert("Gagal melamar pekerjaan.");
    //         }
    //     }).catch((error) => {
    //         alert(error.message);
    //     });
    // };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/pekerjaan/user/${userId}`).then((res) => {
          setPekerjaan(res.data);
        });
      }, []);

      const deletePekerjaan = async (id) => {
        await Swal.fire({
          title: "Anda yakin?",
          text: "Yakin ingin menghapus data Pekerjaan ini?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, hapus!",
          cancelButtonText: "Batal",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await axios.delete(`http://localhost:8080/api/pekerjaan/${id}`);
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

    const showDetailModal = (id) => {
        const selectedDetail = pekerjaan.find((pekerjaan) => pekerjaan.id === id);
        setShowModal(true);
        setSelectedDetail(selectedDetail);
      };
  return (
    <>
      <SidebarAdmin />
      <div className="md:px-4   sm:mx-12 mt-24   ">
        <div className="flex justify-center w-[100%]">
          <main className="s-content w-[390px] md:w-[1125px]    md:px-10 mx-8 ">
          <div className="flex flex-wrap md:grid md:grid-cols-3 gap-3 ">
              {pekerjaan.map((pekerjaan) => (
                <div className="flex flex-nowrap lg:ml-12 md:ml-12 ml-5">
                  <div className="inline-block px-3 mb-1 relative border border-gray-300">
                    <img
                      className="w-64 h-64 my-2 max-w-xs overflow-hidden rounded-lg shadow-md"
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

                    <div className="flex justify-around items-center mt-2 mb-4">
                          <button
                            className="w-24 h-8 bg-blue-500 text-white active:bg-blue-200 font-bold uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                            onClick={() => showDetailModal(pekerjaan.id)}
                          >
                            Detail
                          </button>
                          <button
                            className="w-24 h-8 bg-rose-500 text-white active:bg-blue-200 font-bold uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                            onClick={() => deletePekerjaan(pekerjaan.id)}
                          >
                            Hapus
                          </button>
                          
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
                              Tentang Pekerjaan : {selectedDetail?.tentangPekerjaan}
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
