import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Starters from "./pages/Starters";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Protected from "./auth/Protected";
import { useEffect, useState } from "react";
import Public from "./auth/Public";
import AddressForm from "./pages/AddressForm";
import Checkout from "./pages/Checkout";
import PaymentPage from "./pages/PaymentPage";
import { useDispatch } from "react-redux";
import { GetAddress } from "./Redux/Action/AddressAction";
import { GetUserCart } from "./Redux/Action/CartAction";
import ManageOrders from "./pages/ManageOrders";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const userData: any = localStorage.getItem("User");
  const user = JSON.parse(userData);
  const getAddress = async () => {
    const res = await dispatch(GetAddress(user?.id));
    if (res?.payload?.length > 0)
      localStorage.setItem("Address", JSON.stringify(res?.payload));
  };
  const getUserCart = async () => {
    const res = await dispatch(GetUserCart(user?.id));
  }
  // setInterval(getUserCart,10000)
  useEffect(() => {
    if (user && !isLoaded) {
      getAddress();
      getUserCart();
      setIsLoaded(true);
    }
  }, [user]);
  return (
    <>
      {location?.pathname !== "/login" && location?.pathname !== "/signup" && location?.pathname !=="**" && (
        <>
          <Header />
          <Sidebar />
        </>
      )}
      <Routes>
        <Route element={<Protected />}>
          <Route path="" element={<Dashboard />}></Route>
          <Route path="starters" element={<Starters />}></Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="address_book" element={<AddressForm />}> </Route>
          <Route path="checkout" element={<Checkout />}> </Route>
          <Route path="payment" element={<PaymentPage />}> </Route>
          <Route path="manage-orders" element={<ManageOrders />}> </Route>

        </Route>
        <Route element={<Public />}>
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="*" element={<Dashboard/>} ></Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
