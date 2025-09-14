import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}
