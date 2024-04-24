import { LocationOnRounded } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AddAddress } from "../Redux/Action/AddressAction";

const AddressForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user:any = localStorage.getItem("User");
    const userID = JSON.parse(user)?.id;
    const initialValues = {
        country: "",
        fullName: "",
        phoneNumber: "",
        flatNo: "",
        street: "",
        city: "",
        state: "",
        pinCode: "",
        userID:userID || null
    };
    const validationSchema = Yup.object().shape({
        country: Yup.string().required("Country is required"),
        fullName: Yup.string().required("Full Name is required"),
        phoneNumber: Yup.string().required("Phone Number is required"),
        flatNo: Yup.string().required("Flat No. is required"),
        street: Yup.string().required("Street is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        pinCode: Yup.string().required("PinCode is required").min(6, "Pincode must be 6 characters").max(6, "Pincode must be 6 characters"),
    });
    const handleSubmit = async (values: any) => {
        const res = await dispatch(AddAddress(values));
        if(res){
            navigate("/cart", {state:{from:'addressbook'}});
            localStorage.setItem("Address", JSON.stringify(res));
        }
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
                        m: 1,
                        width: 600,
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
                        <Avatar sx={{ m: 1, bgcolor: "error.light" }}>
                            <LocationOnRounded />
                        </Avatar>
                        <Typography textAlign={"center"} fontWeight={700} fontSize={20}>
                            Add a new address
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
                                                name="country"
                                                label="Country/ Region"
                                                variant="outlined"
                                                className="my-2"
                                                fullWidth size="small"
                                            />
                                            <ErrorMessage
                                                component={"span"}
                                                className="text-danger fs-07"
                                                name="country"
                                            >
                                                {errors?.name}
                                            </ErrorMessage>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                name="fullName"
                                                label="Full Name (First Name and Last Name)"
                                                variant="outlined"
                                                className="my-2"
                                                fullWidth size="small"
                                            />
                                            <ErrorMessage
                                                component={"span"}
                                                className="text-danger fs-07"
                                                name="fullName"
                                            >
                                                {errors?.name}
                                            </ErrorMessage>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                name="phoneNumber"
                                                label="Phone Number"
                                                variant="outlined"
                                                className="my-2"
                                                fullWidth size="small"
                                            />
                                            <ErrorMessage
                                                component={"span"}
                                                className="text-danger fs-07"
                                                name="phoneNumber"
                                            >
                                                {errors?.name}
                                            </ErrorMessage>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                name="flatNo"
                                                label="FlatNo"
                                                variant="outlined"
                                                className="my-2"
                                                fullWidth size="small"
                                            />
                                            <ErrorMessage
                                                component={"span"}
                                                className="text-danger fs-07"
                                                name="flatNo"
                                            >
                                                {errors?.name}
                                            </ErrorMessage>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                name="street"
                                                label="Street, Apartment name, c/o "
                                                variant="outlined"
                                                className="my-2"
                                                fullWidth size="small"
                                            />
                                            <ErrorMessage
                                                component={"span"}
                                                className="text-danger fs-07"
                                                name="street"
                                            >
                                                {errors?.name}
                                            </ErrorMessage>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                name="city"
                                                label="City"
                                                variant="outlined"
                                                className="my-2"
                                                fullWidth size="small"
                                            />
                                            <ErrorMessage
                                                component={"span"}
                                                className="text-danger fs-07"
                                                name="city"
                                            >
                                                {errors?.name}
                                            </ErrorMessage>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                name="state"
                                                label="State"
                                                variant="outlined"
                                                className="my-2"
                                                fullWidth size="small"
                                            />
                                            <ErrorMessage
                                                component={"span"}
                                                className="text-danger fs-07"
                                                name="state"
                                            >
                                                {errors?.name}
                                            </ErrorMessage>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                name="pinCode"
                                                label="Pincode"
                                                variant="outlined"
                                                className="my-2"
                                                fullWidth size="small"
                                            />
                                            <ErrorMessage
                                                component={"span"}
                                                className="text-danger fs-07"
                                                name="pinCode"
                                            >
                                                {errors?.name}
                                            </ErrorMessage>
                                        </Grid>

                                    </Grid>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className="mt-4"
                                        color="warning"
                                        fullWidth size="small"
                                    >
                                        Add Address
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
                    </Box>
                </Paper>
            </Box>
        </>
    );
}

export default AddressForm;