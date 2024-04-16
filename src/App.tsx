import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Starters from "./pages/Starters";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="" element={<Dashboard />}></Route>
        <Route path="starters" element={<Starters />}></Route>
        <Route path="cart" element={<Cart />}></Route>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
