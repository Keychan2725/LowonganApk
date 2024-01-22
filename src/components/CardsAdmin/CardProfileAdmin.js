import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CardProfileAdmin() {
  const id = localStorage.getItem("id");
  const userId = localStorage.getItem("userId");
  const AuthToken = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [imgUser, setImgUser] = useState("");
  const [usia, setUsia] = useState("");
  const [password, setPassword] = useState("");
  const [lastLogin, setLastLogin] = useState("");

  const navigate = useNavigate();

  const [agama, setAgama] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [alamatRumah, setAlamatRumah] = useState("");
  const [tentangSaya, setTentangSaya] = useState("");
  const [noTelepom, setNoTelepon] = useState("");
  const [noKK, setNoKK] = useState("");
  const [noNik, setNoNik] = useState("");

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
      setRole(dataUser.data.role);
      setUsia(dataUser.data.usia);
      setLastLogin(dataUser.data.lastLogin);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "warning",
        text: "Gagal Mengambil Data",
      });
    }
  };

  const getDataUser = async () => {
    try {
      if (!id || id === null || id === undefined) {
        console.error("userId is null or undefined");
        return;
      }

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
      setNamaLengkap(dataUser[0].namaLengkap);
      setAgama(dataUser[0].agama);
      setNoKK(dataUser[0].noKk);
      setNoNik(dataUser[0].noNik);
      setNoTelepon(dataUser[0].noTelepon);
      setAlamatRumah(dataUser[0].alamatRumah);
      setTentangSaya(dataUser[0].tentangSaya);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "warning",
        text: "Gagal Mengambil Data",
      });
    }
  };
  function handleDeleteImage() {
    Swal.fire({
      title: "Yakin ingin menghapus Foto ?",
      text: "Tindakan ini dapat dibatalkan!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#29b6f6",
      confirmButtonText: "Ya, hapus Foto ?",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/user/delete-image/${id}`)
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Foto berhasil dihapus!",
              text: response.data,
            });
            window.location.reload();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Gagal menghapus Foto !",
              text:
                error.response.data.message ||
                "Terjadi kesalahan saat menghapus Foto",
            });
          });
      }
    });
  }
  useEffect(() => {
    getDataUser();
    getAkun();
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full   shadow-xl rounded-lg mt-28 mx-2">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="Foto Profile"
                  className={`shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px ${
                    imgUser === null ? "rounded-full" : ""
                  }`}
                  src={
                    imgUser === null
                      ? "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
                      : imgUser
                  }
                />
              </div>
            </div>
          </div>
          <div className="text-center my-24">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
              {username === null ? "Username Kosong" : username}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
              {alamatRumah === null ? "Alamat Kosong " : alamatRumah}
            </div>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
              {noTelepom === null ? "Nomer  Kosong " : noTelepom}
            </div>
            <div className="mb-2 text-blueGray-600 mt-10">
              <i className="upercase fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
              {role.toUpperCase()}
            </div>{" "}
            {/* <div className="mb-2 text-blueGray-600">
              <i
                className={`fas fa-${
                  lastLogin ? "check-circle" : "times-circle"
                } mr-2 text-lg text-${lastLogin ? "green" : "red"}-400`}
              ></i>
              {lastLogin ? "Online" : "Offline"}
            </div> */}
          </div>
         
        </div>
      </div>
    </>
  );
}
