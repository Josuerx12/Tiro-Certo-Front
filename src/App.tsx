import { Routes, Route, Navigate } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { useAuth } from "./store/useAuth";
import { useEffect } from "react";

const App = () => {
  const { user, getUser } = useAuth();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <Routes>
        <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
      </Routes>
      <Footer />
    </main>
  );
};

export { App };
