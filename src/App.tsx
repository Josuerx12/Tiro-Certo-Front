import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useAuth } from "./store/useAuth";
import { useEffect } from "react";
import { RegistrosPage } from "./pages/Registros";
import { Auth } from "./pages/Auth";
import { WeaponCategory } from "./pages/Admin/WeaponCategory";
import { AcervoPage } from "./pages/Acervo";
import { UsersAdminDashboard } from "./pages/Admin/Users";
import { ClubsAdminDashboard } from "./pages/Admin/Clubs";
import { Footer } from "./components/Footer";
import NovoRegistro from "./pages/NovoRegistro";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { user, getUser } = useAuth();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/novoRegistro" />} />
        <Route
          path="/auth"
          element={user ? <Navigate to="/registros" /> : <Auth />}
        />
        <Route path="/registros" element={<RegistrosPage />} />
        <Route path="/novoRegistro" element={<NovoRegistro />} />
        <Route
          path="/categoriasArmas"
          element={
            user?.admin || user?.founder ? (
              <WeaponCategory />
            ) : (
              <Navigate to="/registros" />
            )
          }
        />
        <Route
          path="/acervo"
          element={user ? <AcervoPage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/usuarios"
          element={
            user?.admin || user?.founder ? (
              <UsersAdminDashboard />
            ) : (
              <Navigate to="/registros" />
            )
          }
        />
        <Route
          path="/clubes"
          element={
            user?.admin || user?.founder ? (
              <ClubsAdminDashboard />
            ) : (
              <Navigate to="/registros" />
            )
          }
        />
      </Routes>
      <Toaster position="top-right" reverseOrder={true} />
      <Footer />
    </main>
  );
};

export { App };
