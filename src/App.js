import { useContext } from "react";
import "./App.css";
import Crypto from "./components/Crypto";
import Footer from "./components/Footer";
import ThemeButton from "./components/ThemeButton";
import { ThemeContext } from "./components/ThemeContext";

// TODO FAVORITES CRYPTOS

function App() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div
      className={darkMode ? "container-fluid dark" : "container-fluid light"}
    >
      <div className="d-flex justify-content-between p-2">
        <h1 className="text-center">React - Crypto</h1>
        <ThemeButton />
      </div>

      <Crypto />
      <Footer />
    </div>
  );
}

export default App;
