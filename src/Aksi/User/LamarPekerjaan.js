import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function LamarPekerjaan() {
  const [namaLengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [permintaanGaji, setPermintaanGaji] = useState("");
  const [pengalamanBekerja, setPengalamanBekerja] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [pekerjaanId, setPekerjaanId] = useState(null);
  const {id} = useParams();


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pekerjaanIdFromUrl = urlParams.get("pekerjaanId");
    setPekerjaanId(pekerjaanIdFromUrl);
  }, []);
  
  const tambahPelamar = async (e) => {
    e.preventDefault();

    const tambah = {
      namaLengkap: namaLengkap,
      email: email,
      alamat: alamat,
      permintaanGaji: permintaanGaji,
      pengalamanBekerja: pengalamanBekerja,
      userId: userId,
      pekerjaanId:id
    };

    try {
      await axios.post(`http://localhost:8080/api/pelamar/add  `, tambah);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Berhasil melamar , Silahkan tunggu pesan dari email anda",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.href= "/dashboard";
      }, 1500);
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: "Mohon coba lagi",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Sidebar />
      <div className="md:px-4   sm:mx-12 mt-24   ">
        <div className="flex justify-center w-[100%]">
          <main className="s-content  md:w-[1800px] md:ml-56     md:px-10 mx-8 ">
            <form onSubmit={tambahPelamar}>
              <div className="relative flex flex-col min-w-0 break-words w-full my-6 mx-2 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="text-center flex justify-between items-center">
                  <div className="flex items-center mx-4 my-5">
                    <h6 className="text-blueGray-700 text-xl font-bold">
                      Surat Lamaran
                    </h6>
                  </div>
                  <button
                    type="submit"
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  >
                    Kirim
                  </button>
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
                          type="text"
                          value={namaLengkap}
                          onChange={(e) => setNamaLengkap(e.target.value)}
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
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
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
                          type="text"
                         
                         value={alamat}
                         onChange={(e) => setAlamat(e.target.value)}
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
                        value={permintaanGaji}
                        onChange={(e) => setPermintaanGaji(e.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
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
                          type="text"
                         
                         value={pengalamanBekerja}
                         onChange={(e) => setPengalamanBekerja(e.target.value)}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          rows="4"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
}
