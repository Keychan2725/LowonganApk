import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TEInput, TERipple } from "tw-elements-react";
import Logo from "../assets/img/letter-lp-logo-concept-on-white-background-vector-removebg-preview.png";

export default function Register2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
 

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    const reg = {
   
    };

    try {
      await axios.post(
        `http://localhost:8080/api/identitas-users/${localStorage.getItem(
          "id"
        )}/addData`,
        reg
      );
      Swal.fire({
        icon: "success",
        title: "Sukses!",
        text: "Berhasill Registrasi ",
      });
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <section className=" container h-auto w-auto mx-auto my-12">
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

                  <form action="" onSubmit={register}>
                    <p className="mb-4 text-gray-700">
                      Silahkan Isi data diri anda
                    </p>
                    <div className="mb-4">
                      {/* Additional input (e.g., email) */}
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="Password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="  block text-gray-700 text-sm font-semibold mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        placeholder="Username"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
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
                          Daftar
                        </button>
                      </TERipple>

                      
                    </div>
 
                  </form>
                </div>
              </div>

              <div
                className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                style={{
                  background:
                    " linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(4,4,4,1) 3%, rgba(3,1,47,1) 5%, rgba(4,2,52,1) 7%, rgba(4,2,52,1) 7%, rgba(4,3,57,1) 9%, rgba(5,4,68,1) 14%, rgba(6,5,81,1) 20%, rgba(135,135,171,1) 100%, rgba(0,0,0,1) 100%, rgba(0,212,255,1) 100%)",
                }}
              >
                <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                  <h4 className="mb-6 text-xl font-semibold">Kami dari LP APK</h4>
                  <p className="text-sm">
                    Kami menekankan bahwa aplkasi ini hanya sebuah aplikasi yang
                    berisi informasi tentang lowongan pekerjaan dan mencari
                    pekerja
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
