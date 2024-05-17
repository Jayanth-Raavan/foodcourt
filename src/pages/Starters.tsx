import { useDispatch, useSelector } from "react-redux";
import "./Starters.css";
import { useEffect } from "react";
import { AddUserCart, DeleteItembyId, GetNonVegItems, GetVegItems } from "../Redux/Action/CartAction";

const Starters = () => {
  const dispatch = useDispatch();
  const vegStarters = useSelector((state: any) => state.veg_starters_reducer);
  const nonVegStarters = useSelector((state: any) => state.non_veg_starters_reducer);
  const cartData = useSelector((state: any) => state.cart_reducer.cartData);
  const getVegItems = () => {
    dispatch(GetVegItems());
    dispatch(GetNonVegItems());
  };

  // const handleVegItems = (item: any) => {
  //   dispatch(ADD_ITEM(item));
  // };
  const userData: any = localStorage.getItem("User");
  const user = JSON.parse(userData);
  const AddItem = (values: any) => {
    let payload = {
      itemName: values?.itemName,
      imgURL: values?.imgURL,
      price: values?.price,
      itemId: values?.id,
      userId: user?.id,
    }
    dispatch(AddUserCart(payload));
  }
  const removeItem=(item:any)=>{
    dispatch(DeleteItembyId(item));
  }
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
          <h4 className="text-center text-success text-white text-decoration-underline bg-success py-3">
            {" "}
            Veg Starters
          </h4>
          <div className="row">
            {vegStarters?.data?.map((item: any, index: any) => (
              <div className="col-sm-12 col-md-6 col-lg-3 my-2" key={index}>
                <div className="card w-100 h-100">
                  <div className="card-body w-100 h-100">
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
                                onClick={() => removeItem(item)}
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
                                onClick={() => AddItem(item)}
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
                              onClick={() => AddItem(item)}
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
          <h4 className="text-center text-white text-decoration-underline bg-dark py-3">
            {" "}
            Non-Veg Starters
          </h4>
          <div className="row">
            {nonVegStarters?.data?.map((item: any, index: any) => (
              <div className="col-sm-12 col-md-6 col-lg-3 my-2" key={index}>
                <div className="card w-100 h-100">
                  <div className="card-body w-100 h-100">
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
                                onClick={() => removeItem(item)}
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
                                onClick={() => AddItem(item)}
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
                              onClick={() => AddItem(item)}
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
        </div>
      </div>
    </>
  );
};

export default Starters;
