import { Password } from "@mui/icons-material";
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
import { AddUsers, GetUsers } from "../Redux/Action/AuthAction";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is Required"),
    lastName: Yup.string().required("Last Name is Required"),
    email: Yup.string().required("Email is Required"),
    phone: Yup.string().required("Phone is Required"),
    password: Yup.string().required("Password is Required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  });
  const handleSubmit = async (values: any) => {
    // dispatch(AddUsers(values));
    // navigate("/login")
    const usersData = await dispatch(GetUsers());
    usersData?.payload?.map((user: any) => {
      if (user?.email === values?.email && user?.phone === values?.phone) {
        toast.error("Email and Phone already exists!")
      } else if (user?.email === values?.email) {
        toast.error("Email already exists!")
      }
      else if (user?.phone === values?.phone) {
        toast.error("Phone number already exists!")
      }
      else {
        dispatch(AddUsers(values));
        navigate("/login");
      }
    });
  }
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
            m: 2,
            width: 490,
            pb: 6,
          },
        }}
      >
        <Paper elevation={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              my: 2,
              mx: 2,
              "& svg": {
                m: 1,
              },
              "& hr": {
                mx: 0.5,
              },
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.dark" }}>
              <LockIcon />
            </Avatar>
            <Typography textAlign={"center"} fontWeight={700} fontSize={20}>
              SignUp
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mx: 5,
              mt: 3,
              mb: 1,
            }}
          >
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ errors }: any) => (
                <Form>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}

                        name="firstName"
                        label="First Name"
                        variant="standard"
                        className="my-2"
                        fullWidth
                      />
                      <ErrorMessage
                        component={"span"}
                        name={"firstName"}
                        className="text-danger fs-07"
                      >
                        {errors?.name}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}

                        name="lastName"
                        label="Last Name"
                        variant="standard"
                        className="my-2"
                        fullWidth
                      />
                      <ErrorMessage
                        component={"span"}
                        name={"lastName"}
                        className="text-danger fs-07"
                      >
                        {errors?.name}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} md={6}>
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
                        name={"email"}
                        className="text-danger fs-07"
                      >
                        {errors?.name}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}

                        name="phone"
                        label="Phone"
                        variant="standard"
                        className="my-2"
                        fullWidth
                      />
                      <ErrorMessage
                        component={"span"}
                        name={"phone"}
                        className="text-danger fs-07"
                      >
                        {errors?.name}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}

                        type={"password"}
                        name="password"
                        label="Password"
                        variant="standard"
                        className="my-2"
                        fullWidth
                      />
                      <ErrorMessage
                        component={"span"}
                        name={"password"}
                        className="text-danger fs-07"
                      >
                        {errors?.name}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}
                        type={"password"}

                        name="confirmPassword"
                        label="Confirm Password"
                        variant="standard"
                        className="my-2"
                        fullWidth
                      />
                      <ErrorMessage
                        component={"span"}
                        name={"confirmPassword"}
                        className="text-danger fs-07"
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
                    SignUp
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
          <Typography mx={5} className="float-end my-2">
            Already have account?
            <Link to={"/login"}> SignIn</Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default SignUp;
