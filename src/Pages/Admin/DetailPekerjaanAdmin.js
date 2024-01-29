import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import SidebarAdmin from "../../components/Sidebar/SidebarAdmin";

export default function DetailPekerjaanAdmin() {
  const { id } = useParams();
  const AuthToken = localStorage.getItem("token");

  const [namaPekerjaan, setNamaPekerjaan] = useState("");
  const [alamatPekerjaan, setAlamatPekerjaan] = useState("");
  const [gajiPegawai, setGajiPegawai] = useState("");
  const [email, setEmail] = useState("");
  const [tentangPekerjaan, setTentangPekerjaan] = useState("");
  const [tanggalPost, setTanggalPost] = useState("");

  const detailPekerjaan = async () => {
    try {
      if (!id || id === null || id === undefined) {
        console.error("userId is null or undefined");
        return;
      }

      const token = await AuthToken;
      const response = await axios.get(
        `http://localhost:8080/api/pekerjaan/getBy/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const dataUser = response.data;
      setNamaPekerjaan(dataUser.namaPekerjaan);
      setAlamatPekerjaan(dataUser.alamatPekerjaan);
      setEmail(dataUser.email);
      setGajiPegawai(dataUser.gajiPegawai);
      setTentangPekerjaan(dataUser.tentangPekerjaan);
      setTanggalPost(dataUser.tanggalPost);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "warning",
        text: "Gagal Mengambil Data",
      });
    }
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

  useEffect(() => {
    detailPekerjaan();
  }, []);
  return (
    <>
      <SidebarAdmin />
      <div className="md:px-4 ml-5   sm:mx-12 mt-24   ">
        <div className="flex justify-center w-[100%]">
          <main className="s-content   md:w-[1800px] md:ml-56  md:px-10 mx-8 ">
            <div className="relative flex flex-col min-w-0 break-words w-full my-6  shadow-lg rounded-lg bg-blueGray-100 border-0">
              <div className="text-center flex justify-between items-center">
                <div className="flex items-center mx-4 my-5">
                  <h6 className="text-blueGray-700 text-xl font-bold">
                    Detail Pekerjaan
                  </h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
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
                        disabled
                        value={namaPekerjaan}
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
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        disabled
                        value={email}
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
                        disabled
                        value={alamatPekerjaan}
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
                        disabled
                        value={gajiPegawai}
                      />
                    </div>
                  </div>
                </div>

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
                        disabled
                        value={tentangPekerjaan}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <div className="flex justify-between no-wrap my-3">
                  <span
                    className=" text-dark text-gray-500   font-bosemibold uppercase text-xs px-4 py-2 "
                  >
                   {calculateTimeAgo(tanggalPost)}
                  </span>{" "}
                  <a
                  href="/history-pekerjaan"
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  >
                    Kembali
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
