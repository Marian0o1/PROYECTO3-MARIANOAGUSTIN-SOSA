import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Historial from "./pages/Historial";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Historial />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
