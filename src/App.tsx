import { Routes, Route } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

const App = () => {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer />
    </main>
  );
};

export { App };
