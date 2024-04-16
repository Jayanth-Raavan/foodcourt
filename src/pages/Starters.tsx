import { useDispatch, useSelector } from "react-redux";
import "./Starters.css";
import { useEffect, useState } from "react";
import { GetVegItems } from "../Redux/Action/CartAction";
import { ADD_ITEM, REMOVE_ITEM } from "../Redux/Slice/CartSliceReducer";

const Starters = () => {
  const dispatch = useDispatch();
  const vegItems = useSelector((state: any) => state.veg_items_reducer);
  const cartData = useSelector((state: any) => state.cart_reducer.cartData);
  const getVegItems = () => {
    dispatch(GetVegItems());
  };

  const handleVegItems = (item: any) => {
    dispatch(ADD_ITEM(item));
  };

  useEffect(() => {
    getVegItems();
  }, []);

  return (
    <>
      <div className="starters">
        <h4 className="text-primary text-center py-3">
          First impressions matter - make yours delicious with our starters.
        </h4>
        <div className="container">
          <h4 className="text-center text-success text-decoration-underline">
            {" "}
            Veg Starters
          </h4>
          <div className="row">
            {vegItems?.data?.map((item: any, index: any) => (
              <div className="col-sm-12 col-md-6 col-lg-3 my-2" key={index}>
                <div className="card w-100">
                  <div className="card-body w-100">
                    <img
                      src={item?.imgURL}
                      alt=""
                      className="img-fluid w-100"
                      style={{ height: "200px" }}
                    />
                    <div className="pt-3">
                      <span className="fs-6 fw-medium text-start text-secondary">
                        Price : ₹ {item?.price}
                      </span>
                      <span className="fs-6 fw-medium float-end text-warning">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-half"></i>
                        <i className="bi bi-star"></i>
                      </span>

                      <br />
                      <div className="text-center py-2 m-0">
                        <span className="fw-bold text-capitalize">
                          {item?.itemName}
                        </span>
                        <br />
                        {cartData?.[item?.itemName]?.cartSize > 0 ? (
                          <>
                            <div
                              className="btn-group form-control p-0"
                              role="group"
                              aria-label="Basic example"
                            >
                              <button
                                type="button"
                                className="btn btn-danger form-control"
                                onClick={() => dispatch(REMOVE_ITEM(item))}
                              >
                                -
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger form-control"
                              >
                                {cartData?.[item?.itemName]?.cartSize}
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger form-control"
                                onClick={() => dispatch(ADD_ITEM(item))}
                              >
                                +
                              </button>
                            </div>
                            {/* <button className="btn btn-primary my-2 form-control text-capitalize">
                              Go to cart
                            </button> */}
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-danger text-center form-control my-2 text-capitalize"
                              onClick={() => handleVegItems(item)}
                            >
                              Add to cart
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h4 className="text-center text-dark text-decoration-underline">
            {" "}
            Non-Veg Starters
          </h4>
        </div>
      </div>
    </>
  );
};

export default Starters;
