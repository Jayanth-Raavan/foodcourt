import { Avatar, Badge, Box, Button, Card, CardContent, Divider, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetOrders } from "../Redux/Action/OrdersAction";
import React from "react";
import { GetAddressById } from "../Redux/Action/AddressAction";
import { BsFillTriangleFill } from "react-icons/bs";

const ManageOrders = () => {
    const userData: any = localStorage.getItem("User");
    const user = JSON.parse(userData);
    const dispatch = useDispatch();
    const orderDetails = useSelector((state: any) => state?.orders_slice_reducer?.data);
    const addressDetails = useSelector((state: any) => state?.address_slice_reducer?.address);
    console.log("addressDetails", addressDetails)
    const actualOrders = orderDetails?.map((x: any) => Object.values(x)?.filter((a: any) => a?.imgURL));
    const orderCreatedDate = orderDetails?.[0]?.orderCreatedDate;
    const date = new Date(orderCreatedDate);
    const time = date?.toLocaleTimeString();
    const exactTime = time?.split(" ")[0];
    const minHour = exactTime?.split(":");
    const amPm = time?.split(" ")[1];
    console.log("time", time)
    const getOrderDetails = async () => {
        await dispatch(GetOrders(user?.id));
    }
    useEffect(() => {
        if (user) {
            getOrderDetails();
        }

        setTimeout(() => {
            if (orderDetails?.[0]?.addressId) {
                dispatch(GetAddressById(orderDetails?.[0]?.addressId))
            }
        }, 1000);

    }, [])
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: "space-between", flexDirection: "row", alignItems: "center", m: 3 }}>
                <Typography component={"h3"}>Your Orders</Typography>
                <Box sx={{ display: "inline-flex" }}>
                    <TextField placeholder="search your orders" variant="outlined" size="small"></TextField>
                    <Button size="medium" variant="contained" sx={{ mx: 2 }}>Search</Button>
                </Box>
            </Box>
            <Box sx={{ m: 3 }}>
                <Card sx={{ p: 0 }}>
                    <CardContent sx={{ p: 0 }}>
                        <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
                            {actualOrders?.[0]?.map((item: any, index: number) => (
                                <>
                                    <ListItem alignItems="flex-start" sx={{ background: "#8080801c" }}>
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={item?.imgURL} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <>
                                                    <Typography fontSize={16} fontWeight={700}>Food Court</Typography>
                                                    <Badge color={orderDetails?.[0]?.isOrderCompleted ?"success" :"error"} badgeContent={orderDetails?.[0]?.isOrderCompleted ? "Delivered" :"Inprogress" } sx={{float:"right", mr:3, top:"-18px"}}>
                                                    </Badge>
                                                </>
                                            }
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {addressDetails?.[0]?.street} , {addressDetails?.[0]?.city}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <BsFillTriangleFill color="pink" /><Typography><span style={{ color: 'gray' }}>{item?.cartSize} x</span> {item?.itemName}</Typography>
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem sx={{ width: "100%" }}>
                                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
                                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                                                <Typography fontSize={12}>{date?.toDateString()}</Typography>
                                                <Typography fontSize={12}>{minHour[0]} : {minHour[1]} {amPm}</Typography>
                                            </Box>
                                            <Typography fontSize={12}> ₹{item?.price}</Typography>
                                        </Box>
                                    </ListItem>
                                </>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}

export default ManageOrders;