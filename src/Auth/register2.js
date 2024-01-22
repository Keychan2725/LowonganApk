import React, { useState } from "react";
import SidebarAdmin from "../components/Sidebar/SidebarAdmin";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/letter-lp-logo-concept-on-white-background-vector-removebg-preview.png";
import { TERipple } from "tw-elements-react";

export default function Register2() {
  const [namaLengkap, setNamaLengkap] = useState("");
  const userId = localStorage.getItem("id");
  const [noNik, setNoNik] = useState("");
  const [noKk, setNoKk] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [alamatRumah, setAlamatRumah] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    const reg = {
      namaLengkap: namaLengkap,
      noNik: noNik,
      noKk: noKk,
      noTelepon: noTelepon,
      alamatRumah: alamatRumah,
      userId:userId
      
    };

    try {
      await axios.post(
        `http://localhost:8080/api/identitasUsers/add `,
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
    <>
      <section className=" container h-auto w-auto mx-auto my-5">
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
                        Silahkan Isi Data Diri Anda
                      </p>
                      <div className="d-flex grid grid-cols-1 gap-2 justify-between md:grid-cols-2">
                        <div className="mb-4 text-black">
                          <input
                            type="text"
                            placeholder="Nama Lengkap"
                            className="w-full rounded-lg border-gray-200 py-4 px-3 text-sm shadow-sm pr-12"
                            value={namaLengkap}
                            onChange={(e) => setNamaLengkap(e.target.value)}
                          />
                        </div>
                        <div className="mb-4 text-black">
                          <input
                            type="number"
                            placeholder="No Telepon"
                            className="w-full rounded-lg border-gray-200 py-4 px-3 text-sm shadow-sm pr-12"
                            value={noTelepon}
                            onChange={(e) => setNoTelepon(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-4 text-black">
                        <input
                          type="number"
                          placeholder="No Nik"
                          className="w-full rounded-lg border-gray-200 py-4 px-3 text-sm shadow-sm pr-12"
                          value={noNik}
                          onChange={(e) => setNoNik(e.target.value)}
                        />
                      </div>
                      <div className="mb-4 text-black">
                        <input
                          type="number"
                          placeholder="No KK"
                          className="w-full rounded-lg border-gray-200 py-4 px-3 text-sm shadow-sm pr-12"
                          value={noKk}
                          onChange={(e) => setNoKk(e.target.value)}
                        />
                      </div>
                      <div className="mb-4 text-black">
                        <input
                          type="text"
                          placeholder="Alamat Rumah  "
                          className="w-full rounded-lg border-gray-200 py-4 px-3 text-sm shadow-sm pr-12"
                          value={alamatRumah}
                          onChange={(e) => setAlamatRumah(e.target.value)}
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

                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none">
                  <div className="hidden lg:block w-full h-full">
                    <img
                      className="w-full h-full"
                      src="https://img.freepik.com/free-vector/businessman-holding-pencil-big-complete-checklist-with-tick-marks_1150-35019.jpg?w=996&t=st=1705751101~exp=1705751701~hmac=d6159877696983608347794acd370b7ba5a4f8bba5b2fd1509de012839681fc4"
                      alt="bg"
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
