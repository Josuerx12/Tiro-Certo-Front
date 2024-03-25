import { Routes, Route, Navigate } from "react-router-dom";
import { Auth } from "./pages/auth";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/footer";
import { useAuth } from "./store/useAuth";
import { useEffect } from "react";
import { RegistrosPage } from "./pages/registros";
import { WeaponCategory } from "./pages/admin/weaponCategory";
import { UsersAdminDashboard } from "./pages/admin/users";
import { AcervoPage } from "./pages/acervo";
import { ClubsAdminDashboard } from "./pages/admin/clubs";

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
