import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
// components

export default function EditAkun() {
  const [currentUrl, setCurrentUrl] = useState("");
  const [fileInputValue, setFileInputValue] = useState("");
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");
  const AuthToken = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usia, setUsia] = useState("");
  const [imgUser, setImgUser] = useState("");
  const [password, setPassword] = useState("");

  const [agama, setAgama] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [alamatRumah, setAlamatRumah] = useState("");
  const [tentangSaya, setTentangSaya] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [noKk, setNoKk] = useState("");
  const [noNik, setNoNik] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const getAkun = async () => {
    try {
      const token = await AuthToken;
      const res = await axios.get(`http://localhost:8080/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      const dataUser = res.data;
      setEmail(dataUser.data.email);
      setPassword(dataUser.data.password);
      setUsername(dataUser.data.username);
      setImgUser(dataUser.data.imgUser);
      setUsia(dataUser.data.usia);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "warning",
        text: "Gagal Mengambil Data",
      });
    }
  };

  const nameChangeHandler = (event) => {
    setNamaLengkap(event.target.value);
  };
  const agamaChange = (event) => {
    setAgama(event.target.value);
  };
  const tentangSayaChange = (event) => {
    setTentangSaya(event.target.value);
  };
  const TeleponChange = (event) => {
    setNoTelepon(event.target.value);
  };
  const NikChange = (event) => {
    setNoNik(event.target.value);
  };
  const NoKkChange = (event) => {
    setNoKk(event.target.value);
  };
  const AlamatChange = (event) => {
    setAlamatRumah(event.target.value);
  };

  const handleImageChange = (event) => {
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
      // Use fileContents if needed for preview or processing
      // const fileContents = event.target.result;

      // Continue with the upload process
      const formData = new FormData();
      formData.append("image", imageFile);

      // Display loading indicator
      Swal.fire({
        title: "Sedang Mengupload File",
        icon: "loading",
        showConfirmButton: false,
        allowOutsideClick: false,
      });

      axios
        .put(`http://localhost:8080/api/user/upload-image/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Close loading indicator on success
          Swal.close();

          // Display success message
          Swal.fire({
            icon: "success",
            text: "Gambar berhasil diupload",
          });

          // Set the image preview or update the state as needed
          setImgUser(response.data);
        })
        .catch((error) => {
          console.error(error);

          // Close loading indicator on error
          Swal.close();

          // Display error message
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

  const datadiri = async (event) => {
    event.preventDefault();

    await axios
      .put(`http://localhost:8080/api/identitasUsers/${id} `, {
        namaLengkap: namaLengkap,
        tentangSaya: tentangSaya,
        alamatRumah: alamatRumah,
        noTelepon: noTelepon,
        noNik: noNik,
        noKk: noKk,
        agama: agama,
      })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Edit Berhasil",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.href = "/akun";
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Gagal Merubah Data ",
        });
      });
  };

  const UsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const emailChange = (event) => {
    setEmail(event.target.value);
  };
  const umurChange = (event) => {
    setUsia(event.target.value);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const DataAKun = async (event) => {
    event.preventDefault();

    await axios
      .put(`http://localhost:8080/api/user/${id} `, {
        username: username,
        email: email,
        usia: usia,
        password: password,
        imgUser: imgUser,
      })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Edit Berhasil",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.href = "/akun";
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Gagal Merubah Data ",
        });
      });
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const getDataUser = async () => {
    try {
      if (!id || id === null || id === undefined) {
        console.error("userId is null or undefined");
        return;
      }

      // Assuming you have a function to retrieve the authentication token
      const token = await AuthToken;
      const response = await axios.get(
        `http://localhost:8080/api/identitasUsers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const dataUser = response.data;
      setNamaLengkap(dataUser.namaLengkap);
      setAgama(dataUser.agama);
      setNoKk(dataUser.noKk);
      setNoNik(dataUser.noNik);
      setNoTelepon(dataUser.noTelepon);
      setAlamatRumah(dataUser.alamatRumah);
      setTentangSaya(dataUser.tentangSaya);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "warning",
        text: "Gagal Mengambil Data",
      });
    }
  };
  useEffect(() => {
    getDataUser();
    getAkun();
  }, []);

  useEffect(() => {
    // Get the current URL
    setCurrentUrl(window.location.href);
  }, []);

  const handleBackClick = () => {
    // Navigate back to the previous page
    navigate(-1);
  };
  return (
    <>
      <Sidebar />
      <div  className="  my-5 mt-24   ">
        <div className="flex justify-center">
          <main className="s-content w-[400px] md:w-[1125px]    md:px-24 mx-8 ">
            <div className="relative flex flex-col min-w-0 break-words w-full my-6  shadow-lg rounded-lg bg-blueGray-100 border-0">
              <div className="text-center flex justify-between items-center">
                <div className="flex items-center mx-4 my-5">
              
                  <h6 className="text-blueGray-700 text-xl font-bold">
                    Edit Akun Saya
                  </h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={datadiri}>
                  <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Data USer
                  </h6>
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
                          onChange={(e) => nameChangeHandler(e)}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={namaLengkap}
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Agama
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={agama}
                          onChange={(e) => agamaChange(e)}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Alamat
                        </label>
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={alamatRumah}
                          onChange={(e) => AlamatChange(e)}
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          No NIK
                        </label>
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={noNik}
                          onChange={(e) => NikChange(e)}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          No KK
                        </label>
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={noKk}
                          onChange={(e) => NoKkChange(e)}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          No Telepon
                        </label>
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={noTelepon}
                          onChange={(e) => TeleponChange(e)}
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="mt-6 border-b-1 border-blueGray-300" />

                  <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Edit Tentang Saya
                  </h6>
                  <div className="flex flex-col items-end justify-end">
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Tentang Saya
                        </label>
                        <textarea
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={tentangSaya}
                          onChange={(e) => tentangSayaChange(e)}
                          rows="4"
                        ></textarea>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    >
                      Edit Data Diri
                    </button>
                  </div>
                </form>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Profile User
                </h6>
                <form onSubmit={DataAKun}>
                  <div className="relative flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Foto Profile
                        </label>
                        <input
                          type="file"
                          value={fileInputValue}
                          onChange={handleImageChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />{" "}
                        <span className="block text-gray-600 text-xs p-3 dark:text-gray-600 ">
                          *file akan di upload terlebih dahulu{" "}
                        </span>
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
                          value={email}
                          onChange={(e) => emailChange(e)}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={username}
                          onChange={(e) => UsernameChange(e)}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Umur
                        </label>
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={usia}
                          onChange={(e) => umurChange(e)}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full  mt-1">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Kata Sandi
                        </label>
                        <input
                          type={passwordType}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Kata Sandi Baru"
                          onChange={(e) => passwordChange(e)}
                        />
                        <span
                          onClick={togglePassword}
                          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        >
                          {passwordType === "password" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-eye-slash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-eye"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                          )}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="sm:p-5 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    >
                      Edit Data User
                    </button>
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
