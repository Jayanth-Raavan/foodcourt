import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Avatar, Badge, Card, CardContent, Divider, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import GPay from "../assets/google-pay-icon.webp";
import Phonepe from "../assets/phonepe-logo-icon.webp";
import Paytm from "../assets/paytm-icon.webp";
import Bhim from "../assets/bhim.png";
import { useLocation, useNavigate } from 'react-router';
import { EmptyCart } from '../Redux/Action/CartAction';
import { AddOrder, UpdateOrder } from '../Redux/Action/OrdersAction';


export default function VerticalLinearStepper() {
    const dispatch = useDispatch();
    const address: any = localStorage.getItem("Address");
    const userAddress = address !== [] as any ? JSON.parse(address) : null;
    const userData: any = localStorage.getItem("User");
    const user = JSON.parse(userData);
    const [activeStep, setActiveStep] = useState(0);
    const [index, setIndex] = useState(0);
    const cartItems = useSelector((state: any) => state?.cart_reducer?.cartData);
    const [currentOrder, setCurrentOrder] = useState<any>()
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setIndex((prevActiveStep) => prevActiveStep + 1);
    };
    const updateOrder = async () => {
        let payload = {
            ...cartItems,
            userID: user?.id,
            addressId: value,
            totalPrice: totalPrice,
            isPaymentCompleted: false,
            isOrderCompleted: false
        }
        const updatedOrder = await dispatch(AddOrder(payload));
        console.log("UpdatedOrder", updatedOrder)
        setCurrentOrder(updatedOrder?.payload);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setIndex((prevActiveStep) => prevActiveStep + 1);
    }
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const [value, setValue] = useState<any>("");
    const [payValue, setPayValue] = useState<any>("");
    const [showUPI, setShowUPI] = useState<any>(false);
    const [showUpiField, setShowUpiField] = useState<any>(false);
    const [showNetBanking, setShowNetbanking] = useState<any>(false);
    const [showCOD, setShowCOD] =useState<any>(false);
    const [proceed, setProceed] = useState<boolean>(false);
    const location = useLocation();
    const [totalPrice, setTotalPrice] = useState(0)
    const navigate = useNavigate();
    const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event?.target?.value)
        setValue((event.target as HTMLInputElement)?.value);
    }
    const handlePaymentOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPayValue((event.target as HTMLInputElement)?.value);
        setProceed(false);
        setValidateUPI(false);
        if (event?.target?.value === "upi") {
            setShowUPI(true);
            setShowUpiField(false);
            setShowNetbanking(false);
            setShowCOD(false);
        } else if (event?.target?.value === "upiId") {
            setShowUPI(false);
            setShowUpiField(true);
            setShowNetbanking(false);
            setShowCOD(false);
        }
        else if (event?.target?.value === "netbanking") {
            setShowUPI(false);
            setShowUpiField(false);
            setShowNetbanking(true);
            setShowCOD(false);
        }
        else {
            setShowUPI(false);
            setShowUpiField(false);
            setShowNetbanking(false);
            setShowCOD(true);
        }
    };
    const handleUPI = (value: any) => {
        setProceed(true);
    }
    const names = [
        'STATE BANK OF INDIA',
        'BANK OF BARODA',
        'ICICI BANK',
        'INDIAN BANK',
        'PAYTM BANKS PRIVATE LIMITED',
        'HDFC BANK',
        'INDIAN OVERSEAS BANK',
        'KOTAK MAHENDRA BANK',
        'AXIS BANK',
        'ANDHRA BANK',
        'UNION BANK',
        'CANARA BANK',
    ];
    const [selectedBank, setSelectedBank] = useState();
    const [validateUPI, setValidateUPI] = useState(false);
    const [showValidateBtn, setShowValidateBtn] = useState(false);

    const handleBanks = (event: any) => {
        setSelectedBank(event?.target?.value);
        if (event?.target?.value) {
            setProceed(true);
        }
    }
    const handleUpiId = (event: any) => {
        if (event.target.value?.length > 0) {
            setShowValidateBtn(true);
        }
    }
    const validateUPIId = () => {
        setValidateUPI(true);
        setShowValidateBtn(false);
    };
    React.useEffect(() => {
        if (validateUPI) {
            setProceed(true);
        }
        if (location?.state) {
            setTotalPrice(location?.state?.totalPrice);
        }
    }, [validateUPI, location]);

    const proceedPayment = () => {
        const date = new Date();
        let payload = {
            ...currentOrder,
            isPaymentCompleted: true,
            isOrderCompleted: false,
            orderCreatedDate: date
        }
        navigate("/payment", { state: { totalPrice } });
        dispatch(UpdateOrder(payload))
        dispatch(EmptyCart(user?.id));
    }
    const addAddress = () => {
        navigate("/address_book");
    }
    return (
        <>
            <div className="container">
                <Box sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    my: 5,
                    "& > :not(style)": {
                        m: 1,
                        width: "100%",
                        pb: 6,
                    },
                    "@media (min-width: 600px)": {
                        "& > :not(style)": {
                            width: 600,
                        },
                    },
                }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        <Step>
                            <StepLabel

                            >
                                <Typography fontWeight={700} fontSize={18}> DELIVERY ADDRESS</Typography>
                            </StepLabel>
                            <StepContent>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={value}
                                        onChange={handleAddress}
                                    >
                                        {userAddress && userAddress.length > 0 && userAddress?.map((address: any, index: any) => (
                                            <Card key={index} sx={{ my: 1 }}>
                                                <CardContent>
                                                    <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
                                                        <Typography fontWeight={700} mr={2}>{address?.fullName}</Typography>
                                                        <Typography fontWeight={700} mr={2}>{address?.phoneNumber}</Typography>
                                                        <Badge color="success" badgeContent={"Home"} sx={{ mt: 1.5, mx: 3 }}>
                                                        </Badge>
                                                    </Box>

                                                    <FormControlLabel
                                                        value={address?.id} // Convert index to string since value must be a string
                                                        control={<Radio />}
                                                        label={`${address.fullName}, ${address.flatNo}, ${address.street}, ${address.city}, ${address.state}, ${address.pinCode}, ${address.country}`}
                                                    />
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        {userAddress && userAddress.length > 0 ?
                                            (
                                                <Button
                                                    variant="contained"
                                                    onClick={updateOrder}
                                                    sx={{ mt: 1, mr: 1 }}
                                                    color={"warning"}
                                                    disabled={value ? false : true}
                                                >
                                                    DELIVER HERE
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    onClick={addAddress}
                                                    sx={{ mt: 1, mr: 1 }}
                                                    color={"warning"}
                                                >
                                                    Add Address
                                                </Button>
                                            )
                                        }
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel
                            >
                                <Typography fontWeight={700} fontSize={18}>ORDER SUMMARY</Typography>
                            </StepLabel>
                            <StepContent>
                                <Card>
                                    <CardContent>
                                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                            {Object?.values(cartItems)?.map((item: any, index: number) => (
                                                <>
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <Avatar alt="Remy Sharp" src={item?.imgURL} />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={item?.itemName}
                                                            secondary={
                                                                <React.Fragment>
                                                                    <Typography
                                                                        sx={{ display: 'inline' }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                        ₹ {item?.price}
                                                                    </Typography>
                                                                    {/* {" — I'll be in your neighborhood doing errands this…"} */}
                                                                </React.Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    {Object?.keys(cartItems).length > 1 && (
                                                        <Divider variant="inset" component="li" />
                                                    )}
                                                </>
                                            ))}
                                        </List>
                                        <Typography fontWeight={700} color={"red"}>Grand total : ₹ {totalPrice}</Typography>

                                    </CardContent>
                                </Card>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Continue
                                        </Button>
                                        <Button
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>
                                <Typography fontWeight={700} fontSize={18}> PAYMENT OPTIONS</Typography>
                            </StepLabel>
                            <StepContent>
                                <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={payValue}
                                        onChange={handlePaymentOptions}
                                    >
                                        <FormControlLabel value="upi" control={<Radio />} label="UPI Payment" />
                                        {showUPI && (
                                            <>
                                                <Box my={2}
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "flex-start",
                                                        flexDirection: "row"
                                                    }}>

                                                    <div className="" onClick={() => handleUPI("gpay")}>
                                                        <img src={GPay} alt="" className="img-fluid w-25 h-100" />
                                                    </div>
                                                    <div onClick={() => handleUPI("phonepe")}>
                                                        <img src={Phonepe} alt="" className="img-fluid w-25 h-100" />
                                                    </div>
                                                    <div onClick={() => handleUPI("paytm")}>
                                                        <img src={Paytm} alt="" className="img-fluid w-25 h-100" />

                                                    </div>
                                                    <div onClick={() => handleUPI("bhim")}>
                                                        <img src={Bhim} alt="" className="img-fluid w-25 h-100" />
                                                    </div>
                                                </Box>
                                                {proceed && (<Button variant="contained" color='primary' size='large' fullWidth onClick={proceedPayment}>Proceed to payment</Button>)}

                                            </>
                                        )}
                                        <FormControlLabel value="upiId" control={<Radio />} label="Enter UPI ID" />
                                        {showUpiField && (
                                            <>
                                                <Box my={2}>
                                                    <TextField variant='outlined' fullWidth label="Enter UPI ID" size='small' onChange={handleUpiId}></TextField>
                                                    {showValidateBtn && (<Button variant="contained" color='success' size='small' fullWidth sx={{ mt: 2 }} onClick={validateUPIId}>Validate UPI Id</Button>)}
                                                    {proceed && (<Button variant="contained" color='primary' size='large' fullWidth sx={{ mt: 2 }} onClick={proceedPayment}>Proceed to payment</Button>)}
                                                </Box>

                                            </>
                                        )}
                                        <FormControlLabel value="netbanking" control={<Radio />} label="Net Banking" />
                                        {showNetBanking && (
                                            <Box my={2}>
                                                <FormControl sx={{ m: 1, width: 300 }}>
                                                    <InputLabel id="demo-multiple-name-label">Select Bank</InputLabel>
                                                    <Select
                                                        labelId="demo-multiple-name-label"
                                                        id="demo-multiple-name"
                                                        value={selectedBank}
                                                        onChange={handleBanks}
                                                        input={<OutlinedInput label="Select Bank" fullWidth />}
                                                        fullWidth
                                                    >
                                                        {names.map((name) => (
                                                            <MenuItem
                                                                key={name}
                                                                value={name}
                                                            >
                                                                {name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <br />
                                                {proceed && (<Button variant="contained" color='primary' size='large' sx={{ mt: 2 }} onClick={proceedPayment}>Proceed to payment</Button>)}
                                            </Box>
                                        )}
                                        <FormControlLabel value="cashOnDelivery" control={<Radio />} label="Cash On Delivery" />
                                        {showCOD && (
                                            <>
                                                <Button variant="contained" color='primary' size='large' fullWidth sx={{ mt: 2 }} onClick={proceedPayment}>Place Order</Button>

                                            </>
                                        )}
                                    </RadioGroup>
                                </FormControl>

                                {/* <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Finish
                                        </Button>
                                        <Button
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </Box> */}
                            </StepContent>
                        </Step>
                    </Stepper>
                    {activeStep === 3 && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                            <Typography>All steps completed - you&apos;re finished</Typography>
                            {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button> */}
                        </Paper>
                    )}
                </Box >
            </div >
        </>
    );
}