import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { TEInput, TERipple } from "tw-elements-react";
import Logo from "../assets/img/letter-lp-logo-concept-on-white-background-vector-removebg-preview.png";

export default function Login() {
  const [passwordType, setPasswordType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:8080/api/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("role", data.data.data.role);
      localStorage.setItem("userId", data.data.data.id);
    
      Swal.fire({
        icon: "success",
        title: "Berhasil masuk",
      });
      window.location.href = "/dashboard ";
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Email atau Password yang Anda masukan salah   ",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <>
      <section className=" container h-auto w-auto mx-auto my-20 ">
                <div className="g-6 flex  flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img className="mx-auto w-48" src={Logo} alt="logo" />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold text-gray-700">
                        LOWONGAN PEKERJAAN
                      </h4>
                    </div>

                    <form action="" onSubmit={login}>
                      <p className="mb-4 text-gray-700">
                        Silahkan login untuk masuk ke aplkasi
                      </p>
                      <div className="mb-4 text-black">
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-full rounded-lg border-gray-200 py-4 px-3 text-sm shadow-sm pr-12"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-4 relative">
                        <div className="relative mt-1 text-black">
                          <input
                            autoComplete="off"
                            type={passwordType}
                            className="w-full rounded-lg border-gray-200 py-4 px-3 text-sm shadow-sm pr-12"
                            placeholder="Kata Sandi"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white  "
                            type="submit"
                            style={{
                              background:
                                " linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(4,4,4,1) 3%, rgba(3,1,47,1) 5%, rgba(4,2,52,1) 7%, rgba(4,2,52,1) 7%, rgba(4,3,57,1) 9%, rgba(5,4,68,1) 14%, rgba(6,5,81,1) 20%, rgba(135,135,171,1) 100%, rgba(0,0,0,1) 100%, rgba(0,212,255,1) 100%)",
                            }}
                          >
                            Login
                          </button>
                        </TERipple>
                        <div className="flex items-center justify-between pb-6 ">
                          <p className="mb-0 mr-2 text-gray-700">
                            Belum punya akun ?
                          </p>
                          <a
                            href="/register"
                            style={{
                              background:
                                " linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(4,4,4,1) 3%, rgba(3,1,47,1) 5%, rgba(4,2,52,1) 7%, rgba(4,2,52,1) 7%, rgba(4,3,57,1) 9%, rgba(5,4,68,1) 14%, rgba(6,5,81,1) 20%, rgba(135,135,171,1) 100%, rgba(0,0,0,1) 100%, rgba(0,212,255,1) 100%)",
                            }}
                            className="   inline-block px-6 py-2 text-sm font-medium uppercase border-2 border-danger rounded-full text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          >
                            Registrasi
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none">
                  <div className="hidden lg:block w-full h-full">
                    <img
                      className="w-full h-full"
src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1704788136~exp=1704788736~hmac=8477a4143d0b27ed2b32e130f81bc223aa32dbaf1fc610198e98677fdb152346"                      alt="bg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
