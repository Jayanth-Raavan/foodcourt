import { Navigate, useOutlet } from "react-router";

const Protected = () => {
  const user: any = localStorage.getItem("User");
  const outlet = useOutlet();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <div>{outlet}</div>;
};

export default Protected;
