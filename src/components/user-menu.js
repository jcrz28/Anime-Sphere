import * as React from "react";

import AuthContext from "../context/auth-context";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Home from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ListItemIcon from "@mui/material/ListItemIcon";
import Login from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreIcon from "@mui/icons-material/MoreVert";
import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
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

	const handleLibraryPage = () => {
		navigate(`/library/${authCtx.userId}`);
		handleMenuClose();
	};

	const handleHomePage = () => {
		navigate("/");
		handleMenuClose();
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			{authCtx.isLoggedIn ? (
				<MenuItem onClick={handleLogout}>
					<Logout /> Log Out
				</MenuItem>
			) : (
				<MenuItem onClick={handleSignIn}>
					<Login /> Sign In
				</MenuItem>
			)}
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem onClick={handleHomePage}>
				<ListItemIcon>
					<Home fontSize="small" />
				</ListItemIcon>
				Home
			</MenuItem>
			{authCtx.isLoggedIn ? (
				<Box>
					<MenuItem onClick={handleLibraryPage}>
						<ListItemIcon>
							<LibraryBooksIcon fontSize="small" />
						</ListItemIcon>
						Library
					</MenuItem>
					<Divider />
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
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Box sx={{ flexGrow: 1 }} />
			<Box sx={{ display: { xs: "none", md: "flex" } }}>
				{authCtx.isLoggedIn && (
					<IconButton size="large" onClick={handleLibraryPage}>
						<Chip
							color="info"
							icon={<LibraryBooksIcon />}
							label="Library"
						/>
					</IconButton>
				)}
				<IconButton size="large" onClick={handleHomePage}>
					<Chip color="info" icon={<Home />} label="Home" />
				</IconButton>
				{!authCtx.isLoggedIn && (
					<IconButton size="large" onClick={handleSignIn}>
						<Chip color="info" icon={<Login />} label="Sign In" />
					</IconButton>
				)}
				{authCtx.isLoggedIn && (
					<Tooltip title="Account">
						<IconButton
							size="large"
							edge="end"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
						>
							<Avatar />
						</IconButton>
					</Tooltip>
				)}
			</Box>
			<Box sx={{ display: { xs: "flex", md: "none" } }}>
				<IconButton
					size="large"
					aria-label="show more"
					aria-controls={mobileMenuId}
					aria-haspopup="true"
					onClick={handleMobileMenuOpen}
				>
					<MoreIcon />
				</IconButton>
			</Box>
			{renderMobileMenu}
			{renderMenu}
		</Box>
	);
};

export default UserMenu;
