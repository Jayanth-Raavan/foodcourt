import { Done } from "@mui/icons-material";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState();
    useEffect(() => {
        if (location?.state) {
            setTotalPrice(location?.state?.totalPrice);
        }
    }, [location, totalPrice]);
    const backToDashboard=()=>{
        navigate("/")
    }
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    my: 5,
                    height: "100%",
                    "& > :not(style)": {
                        m: 1,
                        width: 350,
                    },
                }}
            >
                <Paper elevation={3} sx={{ background: "#0f9e5d" }}>
                    <Avatar sx={{ backgroundColor: "white", padding: 4, textAlign: "center", mx: "auto", mt: 7 }}>
                        <Done sx={{ color: "#0f9e5d" }} />
                    </Avatar>
                    <div style={{ height: "80px" }}></div>
                    <Typography color={"#FFF"} textAlign={"center"} fontWeight={700}>Payment of ₹ {totalPrice} Successful.</Typography>
                    <div style={{ height: "80px" }}></div>
                </Paper>
                <Button variant="contained" size="medium" color="inherit" sx={{ color: "#9c27b0" }} onClick={backToDashboard}> Done</Button>
            </Box>
        </>
    );
}

export default PaymentPage;