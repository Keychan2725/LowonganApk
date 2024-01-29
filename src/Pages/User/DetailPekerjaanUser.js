import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DetailPekerjaanUser() {
    const { userId } = useParams();
    const AuthToken = localStorage.getItem("token");
    const [pekerjaan, setPekerjaan] = useState(null);
  console.log(userId );
    useEffect(() => {
      const detailPekerjaan = async () => {
        try {
          const token = await AuthToken;
          const response = await axios.get(
            `http://localhost:8080/api/pekerjaan/pelamar/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
  
          const dataUser = response.data;
          console.log("API Response:", dataUser);

          if (Array.isArray(dataUser) && dataUser.length > 0) {
            setPekerjaan(dataUser[0]);
          } else {
            console.error("Invalid data structure or empty data:", dataUser);
            Swal.fire({
              icon: "warning",
              text: "Data user tidak ditemukan atau tidak sesuai format yang diharapkan",
            });
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          Swal.fire({
            icon: "warning",
            text: "Gagal Mengambil Data",
          });
        }
      };
  
      detailPekerjaan();
    }, [userId]);
  

  
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

  return (
    <>
      <Sidebar />
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
                        value={pekerjaan?.namaPekerjaan}
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
                        value={pekerjaan?.email}
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
                        value={pekerjaan?.alamatPekerjaan}
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
                        value={pekerjaan?.gajiPegawai}
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
                        value={pekerjaan?.tentangPekerjaan}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <div className="flex justify-between no-wrap my-3">
                  <span className=" text-dark text-gray-500   font-bosemibold uppercase text-xs px-4 py-2 ">
                    {calculateTimeAgo(pekerjaan?.tanggalPost)  }
                  </span>{" "}
                  <a
                    href="/dashboard"
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
