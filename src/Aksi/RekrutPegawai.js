import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Swal from "sweetalert2";
import axios from "axios";

export default function RekrutPegawai() {

      const [formValues, setFormValues] = useState({
        namaPerusahaan: "",
        kontakPerusahaan: "",
        alamatPerusahaan: "",
        gajiPegawai: "",
        inginBekerjaDi: "",
        tentangPerusahaan: "",
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
      };
    
      const handleRekrut = () => {
        // Validasi formulir sebelum mengirim request (contoh: pastikan semua field diisi)
        if (
          !formValues.namaPerusahaan ||
          !formValues.kontakPerusahaan ||
          !formValues.alamatPerusahaan ||
          !formValues.gajiPegawai ||
          !formValues.inginBekerjaDi ||
          !formValues.tentangPerusahaan
        ) {
          Swal.fire("Error", "Semua field harus diisi", "error");
          return;
        }
    
        // Kirim data formulir ke backend
        axios
          .post("http://localhost:8080/api/pegawai/rekrut", formValues) 
          .then((response) => {
            // Tanggapan dari backend (misalnya, pesan sukses atau ID pegawai yang direkrut)
            console.log(response.data);
            Swal.fire("Berhasil!", "Pegawai telah direkrut.", "success");
            // Redirect atau lakukan tindakan lain setelah rekrut berhasil
            // window.location.href = "/notifikasi";
          })
          .catch((error) => {
            Swal.fire("Error", "Gagal merekrut pegawai.", "error");
            console.error(error);
          });
      };
    
  return (
    <>
      <Sidebar />
      <div className="md:px-4   sm:mx-12 mt-24   ">
        <div className="flex justify-center w-[100%]">
          <main className="s-content w-[390px] md:w-[1125px]    md:px-10 mx-8 ">
          <div className="relative flex flex-col min-w-0 break-words w-full my-6 mx-2 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="text-center flex justify-between items-center">
          <div className="flex items-center mx-4 my-5">
            
            <h6 className="text-blueGray-700 text-xl font-bold">Surat Perekrutan</h6>
          </div>
          <button
           onClick={()=> handleRekrut()}
           className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          >
            Rekrut
          </button>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nama Perusahaan
                  </label>
                  <input
                    type="text"
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
                    Kontak Perusahaan
                  </label>
                  <input
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
                   Alamat Perusahaan
                  </label>
                  <input
                    type="text"
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
                      Gaji Pegawai
                  </label>
                  <input
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                   Menginginkan Pegawai Bekerja Di
                  </label>
                  <input
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
                Teentang Perusahaan
                  </label>
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
           
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>
            
          </form>
        </div>
      </div>

          </main>
        </div>
      </div>
    </>
  );
}
