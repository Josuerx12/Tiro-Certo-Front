import { Routes, Route, Navigate } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { useAuth } from "./store/useAuth";
import { useEffect } from "react";
import { RegistrosPage } from "./pages/Registros";
import { WeaponCategory } from "./pages/Admin/WeaponCategory";
import { UsersAdminDashboard } from "./pages/Admin/Users";
import { AcervoPage } from "./pages/Acervo";
import { ClubsAdminDashboard } from "./pages/Admin/Clubs";

const App = () => {
  const { user, getUser } = useAuth();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <Routes>
        <Route
          path="/auth"
          element={user ? <Navigate to="/registros" /> : <Auth />}
        />
        <Route
          path="/registros"
          element={user ? <RegistrosPage /> : <Navigate to="/auth" />}
        />
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
      <Footer />
    </main>
  );
};

export { App };
