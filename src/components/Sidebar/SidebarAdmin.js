import React, { useEffect, useState } from "react";
import Logo from "../../assets/img/letter-lp-logo-concept-on-white-background-vector-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import IconLoader from "../../Loading/IconLoader";

export default function SidebarAdmin() {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const AuthToken = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usia, setUsia] = useState("");
  const [password, setPassword] = useState("");
  const [imgUser, setImgUser] = useState("");
  const [loading, setLoading] = useState(false);

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
      setUsia(dataUser.data.usia);
      setImgUser(dataUser.data.imgUser);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "warning",
        text: "Gagal Mengambil Data",
      });
    }
  };

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
    getAkun();
  }, []);

  const handleNavigation = (to) => {
    setLoading(true);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    delay(1000)
      .then(() => {
        window.location.href = to;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <IconLoader />}

      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-700 dark:bg-gray-800 dark:border-gray-700 bg-gradient-to-l from-black to-white">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="md:hidden inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="#" className="flex ms-2 md:me-24">
                <img src={Logo} className="h-12 me-3" alt="FlowBite Logo" />
                <span className="   self-center text-xl font-semibold sm:text-2xl whitespace-nowrap  ">
                  Admin
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center justify-around ms-3">
                {/* <div className="relative">
                  <p
                    className="pt-1 pr-1 pb-1 pl-1 bg-white text-gray-700 rounded-full transition-all duration-200
                hover:text-gray-900 focus:outline-none hover:bg-gray-100"
                  >
                    <a href="#" className="justify-center items-center flex">
                      <span className="justify-center items-center flex">
                        <span className="items-center justify-center flex">
                          <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4
                        0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6
                        0H9"
                            />
                          </svg>
                        </span>
                      </span>
                    </a>
                  </p>
                  <p
                    className="px-1.5 py-0.5 font-semibold text-xs items-center bg-indigo-600 text-white rounded-full inline-flex
                absolute -top-px -right-1"
                  >
                    2
                  </p>
                </div> */}
                <button
                  type="button"
                  className="ml-4 flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={
                      imgUser === null
                        ? "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
                        : imgUser
                    }
                    alt="user photo"
                  />
                </button>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-black dark:text-black"
                      role="none"
                    >
                      {username}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate  "
                      role="none"
                    >
                      {email}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a
                        href="/akun-admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800 dark:hover:text-white"
                        role="menuitem"
                      >
                        Akun
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={logout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800 dark:hover:text-white"
                        role="menuitem"
                      >
                        Log Out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-700 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                onClick={() => handleNavigation("/dashboardAdmin")}
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-800 hover:text-white group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 hover:text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"
                  />
                </svg>
                <span className="ms-3">Dashboard</span>
              </a>
            </li>

            <li>
              <a
                onClick={() => handleNavigation("/notifikasi-pelamar")}
                className="flex items-center p-2 text-gray-900 rounded-lg   hover:bg-gray-800 hover:text-white group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 hover:text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 21"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM4.54 16a3.48 3.48 0 0 0 6.92 0H4.54Z"
                  />
                </svg>
                <span className="ms-3">Notifikasi Pelamar</span>
              </a>
            </li>

            <li>
              <a
                onClick={() => handleNavigation("/tambah-pekerjaan")}
                className="flex items-center p-2 text-gray-900 rounded-lg   hover:bg-gray-800 hover:text-white group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 hover:text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M4.5 19A3.5 3.5 0 0 1 1 15.5V2a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v13.5A3.5 3.5 0 0 1 4.5 19Zm0 0H18a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1h-4.938a1 1 0 0 0-.697.283l-4.238 4.124a1.046 1.046 0 0 0-.164.208C6.986 18.228 6.184 18.705 4.5 19Zm0-4h.01m8.925-12.293 3.536 3.536a1 1 0 0 1 0 1.414L8 16.627v-9.9l4.02-4.02a1 1 0 0 1 1.415 0Z"
                  />
                </svg>
                <span className="ms-3">Tambah Pekerjaan</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => handleNavigation("/history-pekerjaan")}
                className="flex items-center p-2 text-gray-900 rounded-lg   hover:bg-gray-800 hover:text-white group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 hover:text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 8v1h4V8m4 7H4a1 1 0 0 1-1-1V5h14v9a1 1 0 0 1-1 1ZM2 1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
                  />
                </svg>
                <span className="ms-3">History Pekerjaan</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => handleNavigation("/akun-admin")}
                className="flex items-center p-2 text-gray-900 rounded-lg   hover:bg-gray-800 hover:text-white group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 hover:text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 11 14H9a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 10 19Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <span className="ms-3">Akun</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
