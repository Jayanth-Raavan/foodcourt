import { Navigate, useOutlet } from "react-router";

const Public = () => {
  let auth = localStorage.getItem("User");
  const outlet = useOutlet();
  if (auth) {
    return <Navigate to="/" replace />;
  }
  return <div>{outlet}</div>;
};
export default Public;
