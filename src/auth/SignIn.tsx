import LockIcon from "@mui/icons-material/Lock";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./style.css";
import { useDispatch } from "react-redux";
import { GetUsers } from "../Redux/Action/AuthAction";
import { ToastContainer, toast } from "react-toastify";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required"),
  });
  const handleSubmit = async (values: any) => {
    const usersData = await dispatch(GetUsers());
    usersData?.payload?.map((user: any) => {
      if (
        user?.email === values?.email &&
        user?.password === values?.password
      ) {
        localStorage.setItem("User", JSON.stringify(user));
        setTimeout(() => {
          toast.success("Login Success");
        }, 500);
        navigate("/");
      } else {
        toast.error("Invalid credentials!");
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          my: 5,
          "& > :not(style)": {
            m: 1,
            width: 400,
            pb: 6,
          },
        }}
      >
        <Paper elevation={3}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              my: 2,
              "& svg": {
                m: 1,
              },
              "& hr": {
                mx: 0.5,
              },
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "success.light" }}>
              <LockIcon />
            </Avatar>
            <Typography textAlign={"center"} fontWeight={700} fontSize={20}>
              SignIn
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mx: 2,
              mt: 3,
              mb: 1,
            }}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors }: any) => (
                <Form>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        variant="standard"
                        className="my-2"
                        fullWidth
                      />
                      <ErrorMessage
                        component={"span"}
                        className="text-danger fs-07"
                        name="email"
                      >
                        {errors?.name}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        name="password"
                        type={"password"}
                        label="Password"
                        variant="standard"
                        className="my-2"
                        fullWidth
                      />
                      <ErrorMessage
                        component={"span"}
                        className="text-danger fs-07"
                        name="password"
                      >
                        {errors?.name}
                      </ErrorMessage>
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    variant="contained"
                    className="mt-4"
                    fullWidth
                  >
                    LogIn
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              mx: 2,
            }}
          >
            <Typography>
              don't have account? <Link to={"/signup"}>signup</Link>
            </Typography>
            <Typography>
              <Link to={"/forgotpassword"}>forgot password?</Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default SignIn;
