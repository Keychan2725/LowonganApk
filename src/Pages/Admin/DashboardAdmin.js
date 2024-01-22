import React from "react";
import SidebarAdmin from "../../components/Sidebar/SidebarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft, faGraduationCap,faUsers } from "@fortawesome/free-solid-svg-icons";

export default function DashboardAdmin() {
  const totalPekerjaan = (
    <FontAwesomeIcon
      icon={faClockRotateLeft}
      className="text-4xl text-black-600 mr-4"
      style={{ color: "gray" }}
    />)
  const userIcon = (
    <FontAwesomeIcon
      icon={faUsers}
      className="text-4xl text-black-600 mr-4"
      style={{ color: "gray" }}
    />
  );
  return (
    <>
      <SidebarAdmin />
      <div className="  my-5 mt-24   ">
        <div className="flex justify-center">
          <main className="s-content w-[400px] md:w-[1125px]    md:px-24 mx-8 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl bg-white p-1 flex  border-gray-500 border-2">
                <div className="rounded-xl p-4 h-[120px] flex items-center">
                  <div className="flex items-start">
                    <div className="self-start">
                      {" "}
                      {/* Tambahkan class self-start untuk ikon */}
                      {userIcon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-xl text-black">Total Pelamar</p>
                    <p className="text-xl font-bold text-black"></p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white p-1 flex  border-gray-500 border-2">
                <div className="rounded-xl p-4 h-[120px] flex items-center">
                  <div className="flex items-start">
                    <div className="self-start">
                      {" "}
                      {/* Tambahkan class self-start untuk ikon */}
                      {totalPekerjaan}
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-xl text-black">Total Pekerjaan</p>
                    <p className="text-xl font-bold text-black"> </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
