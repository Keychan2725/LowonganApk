import React, { useState } from "react";
import SidebarAdmin from "../../components/Sidebar/SidebarAdmin";
import Swal from "sweetalert2";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";


export default function UploadFotoPekerjaan(){
  const [fotoPekerjaan, setFotoPekerjaan] = useState(null);
  const userId = localStorage.getItem("userId");
    const AuthToken = localStorage.getItem("token");
   const {id} = useParams();



    const handleImageChange = (event ) => {
        const imageFile = event.target.files[0];
    
        // Validate file format (according to backend)
        const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
        const fileExtension = imageFile.name.split(".").pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
          Swal.fire({
            icon: "warning",
            text: "Format gambar tidak didukung",
          });
          return;
        }
    
        // Validate file size (according to backend)
        if (imageFile.size > 50_000_000) {
          Swal.fire({
            icon: "warning",
            text: "Ukuran gambar terlalu besar (maksimum 50 MB)",
          });
          return;
        }
    
        // Read file content using FileReader
        const reader = new FileReader();
    
        reader.onload = (event) => {
          const formData = new FormData();
          formData.append("image", imageFile);
    
          // Display loading indicator
          Swal.fire({
            title: "Sedang Mengupload File",
            icon: "loading",
            showConfirmButton: false,
            allowOutsideClick: false,
          });
          const token =  AuthToken;

          axios
          .put(
            `http://localhost:8080/api/pekerjaan/${id}/uploadImage`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          )
            .then((response) => {
               Swal.close();
              Swal.fire({
                icon: "success",
                text: "Gambar berhasil diupload",
                showConfirmButton: false,

              });
              console.log("Response Data:", response.data);
              setFotoPekerjaan(response.data);
              setTimeout(() => {
                window.location.href = "/history-pekerjaan";
              }, 1000);

            })
            .catch((error) => {
              console.error(error);
              Swal.close();
              Swal.fire({
                icon: "error",
                title: "Gagal mengupload gambar",
                text: error.response?.data?.message || "Terjadi kesalahan",
              });
            });
        };
    
        // Handle FileReader errors
        reader.onerror = () => {
          console.error("Error reading the file.");
          Swal.fire({
            icon: "error",
            text: "Gagal membaca file",
          });
        };
    
        // Read the file as a data URL
        reader.readAsDataURL(imageFile);
      };
    return(
        <>
        <SidebarAdmin/>
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
                <form >
                  <div className="flex flex-wrap">
                    
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Foto Pekerjaan
                        </label>
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          type="file"
                          accept="image/*"
                           onChange={handleImageChange}
                        />
                      </div>
                    </div>
                  </div>

          

                  <div className="flex flex-col items-end justify-end">
                 
                    <button
                      type="submit"
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    >
                      Publikasi Pekerjaan
                    </button>
                  </div>
                </form>

 
              </div>
            </div>
          </main>
        </div>
      </div>
        </>
    )

}