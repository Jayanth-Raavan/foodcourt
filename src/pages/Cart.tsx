import { useDispatch, useSelector } from "react-redux";
import {
  ADD_ITEM,
  DELETE_ITEM,
  REMOVE_ITEM,
} from "../Redux/Slice/CartSliceReducer";

const Cart = () => {
  const cartItems = useSelector((state: any) => state?.cart_reducer?.cartData);
  const cartData = useSelector((state: any) => state.cart_reducer.cartData);
  console.log("cartItems", cartItems);
  const dispatch = useDispatch();
  return (
    <>
      <div className="container">
        <div className="row">
          {Object.values(cartItems)?.map((item: any, index: any) => (
            <div className="col-sm-12 my-2">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center text-align-center">
                    <div className="col-2">
                      <img
                        src={item?.imgURL}
                        alt=""
                        className="w-100 img-fluid"
                        style={{ height: "150px" }}
                      />
                    </div>
                    <div className="col-4">
                      <div className="">
                        <p>
                          <b>{item?.itemName}</b>
                        </p>
                      </div>
                    </div>
                    <div className="col-2">
                      <>
                        <div
                          className="btn-group form-control p-0"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            type="button"
                            className="btn btn-primary form-control"
                            onClick={() => dispatch(REMOVE_ITEM(item))}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary form-control"
                          >
                            {cartData?.[item?.itemName]?.cartSize}
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary form-control"
                            onClick={() => dispatch(ADD_ITEM(item))}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="btn btn-danger my-2 form-control text-capitalize"
                          onClick={() => dispatch(DELETE_ITEM(item))}
                        >
                          Delete Item
                        </button>
                      </>
                    </div>
                    <div className="col-4">
                      <p>
                        <b>
                          {item?.price + " X " + item.cartSize} ={" "}
                          {item?.price * item.cartSize}
                        </b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="card my-4">
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <div className="row">
                    <div className="col-2">
                    <p>
                    <b>Total Price</b>
                  </p>
                    </div>
                    <div className="col-4"></div>
                    <div className="col-4"></div>
                    <div className="col-2">
                        {
                            
                        }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6"></div>
        </div>
      </div>
    </>
  );
};

export default Cart;
