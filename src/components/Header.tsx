import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const cartSize = useSelector(
    (state: any) => state.cart_reducer?.cartSize
  );
  const goToCart = () => {
    navigate("/cart");
  };
  return (
    <>
      <div
        className="header bg-brand"
        style={{ position: "sticky", top: 0, zIndex: 1, pointerEvents: "all" }}
      >
        <div className="p-3 text-end">
          <div
            onClick={goToCart}
            className="d-flex justify-content-end align-items-center"
          >
            <i
              className="bi bi-cart fs-3 text-white"
              style={{ cursor: "pointer" }}
            ></i>
            <div
              className="text-center bg-danger m-0 rounded-circle"
              style={{ width: "14px", height: "14px" }}
            >
              <span className="text-center text-white m-0" style={{fontSize:'0.7rem',position:'relative',right: '0px',top: '-8px'}}>{cartSize}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
