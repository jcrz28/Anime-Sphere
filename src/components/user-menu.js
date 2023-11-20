import AuthContext from "../context/auth-context";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { Home } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Login from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import Settings from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();
	const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(menuAnchorEl);

	const handleMenuOpen = (event) => {
		setMenuAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setMenuAnchorEl(null);
	};

	const handleLogout = () => {
		authCtx.onLogout();
		navigate("/");
		handleMenuClose();
	};

	const handleSignIn = () => {
		navigate("/auth");
		handleMenuClose();
	};

	const handleHomePage = () => {
		navigate("/");
		handleMenuClose();
	};

	return (
		<React.Fragment>
			<Tooltip title="Account settings">
				<IconButton
					onClick={handleMenuOpen}
					size="small"
					aria-controls={isMenuOpen ? "account-menu" : undefined}
					aria-haspopup="true"
				>
					<Avatar sx={{ width: 32, height: 32 }} />
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={menuAnchorEl}
				id="account-menu"
				open={isMenuOpen}
				onClose={handleMenuClose}
				slotProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				getContentAnchorEl={null}
			>
				<MenuItem onClick={handleHomePage}>
					<ListItemIcon>
						<Home fontSize="small" />
					</ListItemIcon>
					Home
				</MenuItem>
				{authCtx.isLoggedIn ? (
					<Box>
						<MenuItem>
							<ListItemIcon>
								<Settings fontSize="small" />
							</ListItemIcon>
							Settings
						</MenuItem>
						<MenuItem onClick={handleLogout}>
							<ListItemIcon>
								<Logout fontSize="small" />
							</ListItemIcon>
							Logout
						</MenuItem>
					</Box>
				) : (
					<MenuItem onClick={handleSignIn}>
						<ListItemIcon>
							<Login fontSize="small" />
						</ListItemIcon>
						Sign In
					</MenuItem>
				)}
			</Menu>
		</React.Fragment>
	);
};

export default UserMenu;
