import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function Dashboard(){
   const userID = localStorage.getItem("userId");  
   const navigate = useNavigate();

   const handleLogout = () => {
    localStorage.clear();
    // Navigasi ke halaman home setelah logout
    navigate("/");
  };
  const logout = () => {
    Swal.fire({
      title: "Keluar",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      } else {
      }
    });
  };

   useEffect(() => {
    if (userID === "userId") {
        console.log("gagal")
    }
  }, [userID]);
    return(
        <>
        <h1 className="text-center font-bold ">HEllOOO GUYSSS</h1>
        <button className=" bg-teal-500 size-16" onClick={ logout}>log out</button>
        </>
    )
}