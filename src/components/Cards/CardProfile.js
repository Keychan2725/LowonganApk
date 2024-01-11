import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

 

export default function CardProfile() {
  const id =localStorage.getItem("userId");
  const AuthToken = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [imgUser, setImgUser] = useState("");
  const [usia, setUsia] = useState("");
  const [password, setPassword] = useState("");

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
      setUsia(dataUser.data.usia);
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
      setNoKK(dataUser.noKk);
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
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full   shadow-xl rounded-lg mt-28 mx-2">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="Foto Profile"
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                  src={imgUser === null ? "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg" : imgUser}
                />
              </div>
            </div>
           
          </div>
          <div className="text-center my-24">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2" >
            {username === null ? "Username Kosong":username }
          
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
            {alamatRumah === null ? "Alamat Kosong ":alamatRumah} 
            </div>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
            {noTelepom === null ? "Nomer  Kosong ":noTelepom} 
            </div>
            <div className="mb-2 text-blueGray-600 mt-10">
              <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
              Solution Manager - Creative Tim Officer
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
              University of Computer Science
            </div>
          </div>
       
        </div>
      </div>
    </>
  );
}
