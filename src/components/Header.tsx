import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Avatar, Badge, BadgeProps, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from "@emotion/styled";
import React from "react";
import { pink } from "@mui/material/colors";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }: any) => ({
  '& .MuiBadge-badge': {
    right: 3,
    top: 15,
  },
}));
const Header = () => {
  const navigate = useNavigate();
  const cartSize = useSelector((state: any) => state.cart_reducer?.cartSize);


  const goToCart = () => {
    navigate("/cart");
  };
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogOut = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("Address");
    navigate("/login");
  }
  const user: any = localStorage.getItem("User");
  const userName = JSON.parse(user)?.firstName;
  return (
    <>
      <div
        className="header bg-brand"
        style={{ position: "sticky", top: 0, zIndex: 2, pointerEvents: "all" }}
      >

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            my: 0,
            "& svg": {
              m: 1,
            },
            "& hr": {
              mx: 0.5,
            },
          }}
        >
          <Typography ml={6} color={"white"}>Welcome {userName}!</Typography>
          <Box sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-end",
            my: 0,
            "& svg": {
              m: 1,
            },
            "& hr": {
              mx: 0.5,
            },
          }}>
            <IconButton aria-label="cart" onClick={goToCart}>
              <StyledBadge badgeContent={cartSize} color="error" sx={{ m: 1 }}>
                <ShoppingCartIcon sx={{ color: "white" }} />
              </StyledBadge>
            </IconButton>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ mr: 3, color: "white" }}>
                    <Person />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "50px", mr: "-20px" }}
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'center',
                  horizontal: 'left',

                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleLogOut} style={{ padding: '6px 30px' }}>
                  <Typography textAlign="center"><LogoutIcon /> Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
      </div >
    </>
  );
};

export default Header;
