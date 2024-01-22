import React, { useState } from "react";
import SidebarAdmin from "../../components/Sidebar/SidebarAdmin";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TambahPekerjaan() {
  const [namaPekerjaan, setNamaPekerjaan] = useState("");
  const [email, setEmail] = useState("");
  const [alamatPekerjaan, setAlamatPekerjaan] = useState("");
  const [gajiPegawai, setGajiPegawai] = useState("");
  const userId = localStorage.getItem("userId");
  const [tentangPekerjaan, setTentangPekerjaan] = useState("");
  const navigate = useNavigate();

  const tambahPekerjaan = async (e) => {
    e.preventDefault();

    const tambah = {
      namaPekerjaan: namaPekerjaan,
      email: email,
      alamatPekerjaan: alamatPekerjaan,
      gajiPegawai: gajiPegawai,
      tentangPekerjaan: tentangPekerjaan,
      userId: userId,
    };

    try {
      await axios.post(`http://localhost:8080/api/pekerjaan/add  `, tambah);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Berhasil ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
       navigate("/uploadFoto-pekerjaan")
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
      <SidebarAdmin />
      <div className="  my-5 mt-24   ">
        <div className="flex justify-center">
          <main className="s-content w-[400px] md:w-[1125px]    md:px-24 mx-8 ">
            <div className="relative flex flex-col min-w-0 break-words w-full my-6  shadow-lg rounded-lg bg-blueGray-100 border-0">
              <div className="text-center flex justify-between items-center">
                <div className="flex items-center mx-4 my-5">
                  <h6 className="text-blueGray-700 text-xl font-bold">
                    Tambah Pekerjaan
                  </h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={tambahPekerjaan}>
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Nama Pekerjaan
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={namaPekerjaan}
                          onChange={(e) => setNamaPekerjaan(e.target.value)}
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
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Alamat Pekerjaan
                        </label>
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={alamatPekerjaan}
                          onChange={(e) => setAlamatPekerjaan(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Gaji Pegawai
                        </label>
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={gajiPegawai}
                          onChange={(e) => setGajiPegawai(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="mt-6 border-b-1 border-blueGray-300" />

                  <div className="flex flex-col items-end justify-end">
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Tentang Pekerjaan
                        </label>
                        <textarea
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          rows="4"
                          value={tentangPekerjaan}
                          onChange={(e) => setTentangPekerjaan(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    >
                      Publikasi Pekerjaan
                    </button>
                  </div>
                </form>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
