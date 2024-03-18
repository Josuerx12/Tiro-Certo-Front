import { Routes, Route, Navigate } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { useAuth } from "./store/useAuth";
import { useEffect } from "react";
import { RegistrosPage } from "./pages/Registros";
import { WeaponCategory } from "./pages/Admin/WeaponCategory";

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
      </Routes>
      <Footer />
    </main>
  );
};

export { App };
