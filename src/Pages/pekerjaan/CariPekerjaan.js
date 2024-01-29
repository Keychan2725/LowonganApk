import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CariPekerjaan() {
  const [pekerjaan, setPekerjaan] = useState([]);
  const [filterPekerjaan, setFilterPekerjaan] = useState([]);
 
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000,
  //     easing: "ease-in-out",
  //   });
  // }, [])
  useEffect(() => {
    axios.get(`http://localhost:8080/api/pekerjaan/all`).then((res) => {
      setPekerjaan(res.data);
      setFilterPekerjaan(res.data);
    });
  }, []);
 
  const calculateTimeAgo = (timestamp) => {
    const currentDate = new Date();
    const postDate = new Date(timestamp);

    const timeDifference = currentDate - postDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years} tahun yang lalu`;
    } else if (months > 0) {
      return `${months} bulan yang lalu`;
    } else if (days > 0) {
      return `${days} hari yang lalu`;
    } else if (hours > 0) {
      return `${hours} jam yang lalu`;
    } else if (minutes > 0) {
      return `${minutes} menit yang lalu`;
    } else {
      return `${seconds} detik yang lalu`;
    }
  };

  const CariPekerjaan = (term) => {
    if (term.trim() === "") {
      setFilterPekerjaan([...pekerjaan]);
    } else {
      const filteredResults = pekerjaan.filter(
        (user) =>
          user.namaPekerjaan &&
          user.namaPekerjaan.toLowerCase().includes(term.toLowerCase())
      );
      setFilterPekerjaan(filteredResults);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    CariPekerjaan(e.target.value);
  };

  const filteredPekerjaan = pekerjaan.filter((pekerjaan) =>
    pekerjaan.namaPekerjaan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Sidebar />
      <div className="md:px-4 sm:mx-12 mt-24">
        <div className="flex justify-center w-[100%]">
          <main className="s-content md:w-[1800px] md:ml-56 md:px-10 mx-8">
            <div className="flex justify-between items-center mb-4 md:my-5 ">
              <div>
                <h1 className="text-2xl font-semibold"></h1>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Cari Pekerjaan"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="border rounded-lg p-2"
                />
              </div>
            </div>
            <div className="flex flex-wrap md:grid md:grid-cols-3 gap-3 sm:mt-24">
              {filteredPekerjaan.length === 0 ? (
                <div className="col-span-1 flex flex-nowrap lg:mx-auto md:ml-8 ml-5 mb-5">
                  <div className="inline-block px-3 mb-1 relative rounded-lg items-center">
                    <svg
                      className="w-24 h-24 text-gray-400 mb-3 animate-bounce items-center"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2 17.555V19a1 1 0 001 1h18a1 1 0 001-1v-1.445a3.97 3.97 0 00-1.105-2.788 3.97 3.97 0 00-2.789-1.105 3.97 3.97 0 00-2.788 1.105 3.97 3.97 0 00-1.105 2.788 3.97 3.97 0 00-1.105-2.788 3.97 3.97 0 00-2.788-1.105 3.97 3.97 0 00-2.789 1.105 3.97 3.97 0 00-1.105 2.788z"
                      ></path>
                    </svg>
                    <p className="text-sm text-center mr-5">
                      Pekerjaan tidak ditemukan.
                    </p>
                  </div>
                </div>
              ) : (
                filteredPekerjaan.map((pekerjaan) => (
                  <div className="col-span-1 flex flex-nowrap lg:ml-12 md:ml-12 ml-5 mb-5">
                    <div className="inline-block px-3 mb-1 relative border border-gray-300 rounded-lg">
                      <img
                        className="w-64 h-64 my-2 max-w-xs overflow-hidden rounded-lg shadow-md"
                        src={pekerjaan.fotoPekerjaan}
                        alt=""
                      />

                      <div className="block p-4">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">
                          {pekerjaan.namaPekerjaan}
                        </h3>
                        <div className="flex gap-2 mb-1">
                          <svg
                            className="w-5 h-5 text-gray-500 transition duration-75 hover:text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            <path
                              fill="#f45757"
                              d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                            />
                          </svg>
                          <p className="text-gray-600">
                            {pekerjaan.alamatPekerjaan}
                          </p>
                        </div>

                        <div className="flex justify-around items-center mt-2">
                          <a
                            className="text-center pt-1  w-24 h-8 bg-blue-500 text-white active:bg-blue-200 font-bold uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                            href={"/detail-pekerjaan/" + pekerjaan.id}
                          >
                            Detail
                          </a>
                          <a
                            className="w-24 h-8 rounded-lg text-center text-white my-5 font-bold uppercase justify-self-end bg-lime-400 hover:bg-gray-300 hover:text-dark"
                            href={"/lamar-pekerjaan/" + pekerjaan.userId}
                          >
                            Lamar
                          </a>
                        </div>
                      </div>
                      <hr className="font-semibold" />
                      <div className="flex gap-2 my-5 mx-3">
                        <svg
                          className="w-5 h-5 text-gray-500 transition duration-75 hover:text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          {" "}
                          <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                        </svg>

                        <p className="text-gray-600">
                          {" "}
                          {calculateTimeAgo(pekerjaan.tanggalPost)}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
