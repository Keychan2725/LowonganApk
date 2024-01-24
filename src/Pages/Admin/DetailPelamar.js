import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../components/Sidebar/SidebarAdmin";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function DetailPelamar() {
  const { id } = useParams();

  const [namaLengkap, setNamaLengkap] = useState("");
  const [alamat, setAlamat] = useState("");
  const [permintaanGaji, setPermintaanGaji] = useState("");
  const [pengalamanBekerja, setPengalamanBekerja] = useState("");
  const [email, setEmail] = useState("");

  const AuthToken = localStorage.getItem("token");

  useEffect(() => {
    getDataUser();
  }, [id]);

  const getDataUser = async () => {
    try {
      const token = await AuthToken;
      const response = await axios.get(
        `http://localhost:8080/api/pelamar/byId/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const dataUser = response.data;

      // Check if dataUser exists and has the expected structure
      if (dataUser?.namaLengkap) {
        setNamaLengkap(dataUser.namaLengkap);
        setAlamat(dataUser.alamat);
        setPermintaanGaji(dataUser.permintaanGaji);
        setPengalamanBekerja(dataUser.pengalamanBekerja);
        setEmail(dataUser.email);
      } else {
        console.error("Invalid data structure from API:", dataUser);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "warning",
        text: "Gagal Mengambil Data",
      });
    }
  };

  return (
    <>
      <SidebarAdmin />
      <div className="md:px-4   sm:mx-12 mt-24   ">
        <div className="flex justify-center w-[100%]">
          <main className="s-content   md:w-[1800px] md:ml-56    md:px-10 mx-8 ">
            <div className="relative flex flex-col min-w-0 break-words w-full my-6 mx-2 shadow-lg rounded-lg bg-blueGray-100 border-0">
              <div className="text-center flex justify-between items-center">
                <div className="flex items-center mx-4 my-5">
                  <h6 className="text-blueGray-700 text-xl font-bold">
                   Detail Pelamar
                  </h6>
                </div>
                <a
                  href="/notifikasi-pelamar"
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                >
                  Kembali
                </a>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        disabled
                        type="text"
                        value={namaLengkap}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        disabled
                        type="email"
                        value={email}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Alamat
                      </label>
                      <input
                        disabled
                        type="text"
                        value={alamat}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Permintaan Gaji
                      </label>
                      <input
                        disabled
                        value={permintaanGaji}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase"></h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Pengalaman Bekerja
                      </label>
                      <textarea
                        disabled
                        type="text"
                        value={pengalamanBekerja}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
