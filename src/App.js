import React, { useEffect, useState } from "react";
import "./App.css";
import "../src/assets/styles/index.css";
import "../src/assets/styles/tailwind.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Landing from "./Pages/Landing";
import Profile from "./Pages/Profile";
import Settings from "./Pages/User/Settings";
import Register from "./Auth/register";
import Login from "./Auth/login";
import PrivateHome from "./Router/PrivateHome";
import PrivateReg from "./Router/PrivateReg";
import PrivateRoute from "./Router/PrivateRoute";
import Dashboard from "./Pages/User/dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import { initFlowbite } from "flowbite";
import EditAkun from "./Aksi/User/EditAkun";
import CariPekerjaan from "./Pages/pekerjaan/CariPekerjaan";
import LamarPekerjaan from "./Aksi/User/LamarPekerjaan";
import RegisterAdmin from "./Auth/registerAdmin";
import PrivateSuperAdmin from "./Router/PrivateSuperAdmin";
import DashboardAdmin from "./Pages/Admin/DashboardAdmin";
import NotifikasiPelamar from "./Pages/Admin/NotifikasiPelamar";
import SettingsAdmin from "./Pages/Admin/SettingsAdmin";
import EditAkunAdmin from "./Aksi/Admin/EditAkunAdmin";
import TambahPekerjaan from "./Pages/Admin/TambahPekerjaan";
import Register2 from "./Auth/register2";
import RegistrasiAdmin2 from "./Auth/registerAdmin2";
import HistoryPekerjaan from "./Pages/Admin/HistoryPekerjaan";
import UploadFotoPekerjaan from "./Pages/Admin/UploadFotoPekerjaan";
import PrivateUpload from "./Router/PrivateUpload";
import DetailPelamar from "./Pages/Admin/DetailPelamar";
import DetailPekerjaan from "./Pages/User/DetailPekerjaan";
import DetailPekerjaanAdmin from "./Pages/Admin/DetailPekerjaanAdmin";
import IconLoader from "./Loading/IconLoader";
import DetailPekerjaanUser from "./Pages/User/DetailPekerjaanUser";

function App() {
  useEffect(() => {
    initFlowbite();
  }, []);


  return (
    <div className="App ">

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateHome>
                <Landing />
              </PrivateHome>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<RegisterAdmin />} />

          <Route
            path="/registrasi-2"
            element={
              <PrivateReg>
                <Register2 />
              </PrivateReg>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <Dashboard />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboardAdmin"
            element={
              <PrivateRoute>
                <PrivateSuperAdmin>
                  <DashboardAdmin />
                </PrivateSuperAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/register-admin-2"
            element={
              <PrivateSuperAdmin>
                <RegistrasiAdmin2 />
              </PrivateSuperAdmin>
            }
          />
          <Route
            path="/akun"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <Settings />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/editAkun"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <EditAkun />
                </PrivateHome>
              </PrivateRoute>
            }
          />

          <Route
            path="/cari-pekerjaan"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <CariPekerjaan />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/detail-pekerjaan/:id"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <DetailPekerjaan />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/detail-pekerjaan-user/:userId"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <DetailPekerjaanUser />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/lamar-pekerjaan/:id"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <LamarPekerjaan />
                </PrivateHome>
              </PrivateRoute>
            }
          />

          <Route
            path="/notifikasi-pelamar"
            element={
              <PrivateRoute>
                <PrivateSuperAdmin>
                  <NotifikasiPelamar />
                </PrivateSuperAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/history-pekerjaan"
            element={
              <PrivateRoute>
                <PrivateSuperAdmin>
                  <HistoryPekerjaan />
                </PrivateSuperAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/akun-admin"
            element={
              <PrivateRoute>
                <PrivateSuperAdmin>
                  <SettingsAdmin />
                </PrivateSuperAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/detail-pelamar/:id"
            element={
              <PrivateRoute>
                <PrivateSuperAdmin>
                  <DetailPelamar />
                </PrivateSuperAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/editAkun-admin"
            element={
              <PrivateRoute>
                <PrivateSuperAdmin>
                  <EditAkunAdmin />
                </PrivateSuperAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/tambah-pekerjaan"
            element={
              <PrivateRoute>
                <PrivateSuperAdmin>
                  <TambahPekerjaan />
                </PrivateSuperAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/detail-pekerjaanAdmin/:id"
            element={
              <PrivateRoute>
                <PrivateSuperAdmin>
                  <DetailPekerjaanAdmin />
                </PrivateSuperAdmin>
              </PrivateRoute>
            }
          />
          <Route
            path="/pekerjaan/:id/uploadImage"
            element={
              <PrivateRoute>
                <PrivateSuperAdmin>
                  <UploadFotoPekerjaan />
                </PrivateSuperAdmin>
              </PrivateRoute>
            }
          />

          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
