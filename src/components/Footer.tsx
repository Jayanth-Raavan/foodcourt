import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
    const cartSize = useSelector(
        (state: any) => state.cart_reducer?.cartSize
      );
  return (
    <>
      <div className="w-50 m-auto" style={{ position: "sticky", bottom: '10px', zIndex: 1, pointerEvents: "all" }}>
        <div className="bg-secondary text-white  p-4 d-flex justify-content-between rounded">
            <p className="m-0 text-white">Cart Items : {cartSize}</p>
            <Link to={'/cart'} className="text-decoration-none fw-bold text-white">{'View Cart >>'}</Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
