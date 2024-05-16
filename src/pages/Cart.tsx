import { useDispatch, useSelector } from "react-redux";
import emptyCart from "../assets/cart/empty-cart1.jpg";
import "./Cart.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AddUserCart, DeleteItem, DeleteItembyId } from "../Redux/Action/CartAction";
import { DELETE_ITEM, REMOVE_ITEM } from "../Redux/Slice/CartSliceReducer";
const Cart = () => {
  const cartItems = useSelector((state: any) => state?.cart_reducer?.cartData);
  const cartData = useSelector((state: any) => state.cart_reducer.cartData);
  const cartSize = useSelector((state: any) => state.cart_reducer?.cartSize);
  const location = useLocation();
  const [showAddress, setShowAddress] = useState<boolean>(false);
  const isEmpty: any[] = [];
  const navigate = useNavigate();
  const address: any = localStorage.getItem("Address");
  const userAddress = address !== undefined ? (JSON.parse(address)) : {}.toString();
  let cart: any = [];
  Object?.values(cartItems)?.map((item: any) => {
    cart?.push(item);
  });
  const totalPrice = cart?.reduce((a: any, b: any) => a + b?.price * b?.cartSize, 0);
  const dispatch = useDispatch();
  const handleCheckOut = () => {
    if (userAddress) {
      setShowAddress(true);
      navigate("/checkout", { state: { totalPrice: totalPrice } });
    } else {
      navigate("/address_book");
    }
  };
  const userData: any = localStorage.getItem("User");
  const user = JSON.parse(userData);
  const AddItem = (values: any) => {
    let payload = {
      ...values,
      userId: user?.id,
    }
    dispatch(AddUserCart(payload));
  }
  useEffect(() => {
    if (location?.state?.from === 'addressbook') {
      handleCheckOut();
    }
  }, [userAddress])
  return (
    <>
      <div className="container-fluid my-3">
        {cartSize > 0 ? (
          <>
            <table className="table table-bordered border-dark">
              <thead>
                <tr>
                  <th scope="col">SNo</th>
                  <th scope="col">Item</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(cartItems)?.map((item: any, index: any) => (
                  <>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={item?.imgURL}
                          alt=""
                          className="img-fluid cartItem me-3"
                        />
                        <b className="my-2 text-center">{item?.itemName}</b>
                      </td>
                      <td>
                        <>
                          <div
                            className="btn-group form-control p-0 my-2"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              type="button"
                              className="btn btn-outline-danger "
                              onClick={() => dispatch(DeleteItembyId(item))}
                            >
                              {cartData?.[item?.itemName]?.cartSize === 1 ? (
                                <>
                                  <i className="bi bi-trash-fill"></i>
                                </>
                              ) : (
                                <>-</>
                              )}
                            </button>
                            <button type="button" className="btn  ">
                              {cartData?.[item?.itemName]?.cartSize}
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-success"
                              onClick={() => AddItem(item)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="btn btn-danger form-control text-capitalize"
                            onClick={() => dispatch(DeleteItem(item))}
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </>
                      </td>
                      <td>{item?.price * item?.cartSize}</td>
                    </tr>
                  </>
                ))}
                <tr className="border">
                  <td></td>
                  <td></td>
                  <td><b>Total </b></td>
                  <td><b>{totalPrice}</b></td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-warning float-end me-4 mt-2 px-5 text-white" onClick={handleCheckOut}>Check out</button>
          </>
        ) : (
          <div className="text-center my-5">
            <img
              src={emptyCart}
              alt="empty cart"
              className="img-fluid text-center"
            />
            <h5 className="text-center text-danger my-3">
              Your cart is empty.
            </h5>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
