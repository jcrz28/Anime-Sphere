import * as React from "react";

import AuthContext from "../context/auth-context";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Divider from "@mui/material/Divider";
import Home from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Login from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import Switch from "@mui/material/Switch";
import { ThemeContext } from "../context/theme-context";
import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const UserMenu = () => {
	const authCtx = useContext(AuthContext);
	const { toggleTheme } = useContext(ThemeContext);
	const theme = useTheme();
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

	const handleDashboardPage = () => {
		navigate(`/dashboard/${authCtx.userId}`);
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
				vertical: "bottom",
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
				<div>
					<ListItemButton>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary="Settings" />
					</ListItemButton>
					<Divider />
					<ListItemButton onClick={handleLogout}>
						<ListItemIcon>
							<Logout />
						</ListItemIcon>
						<ListItemText primary="Log Out" />
					</ListItemButton>
				</div>
			) : (
				<ListItemButton onClick={handleSignIn}>
					<ListItemIcon>
						<Login />
					</ListItemIcon>
					<ListItemText primary="Sign In" />
				</ListItemButton>
			)}
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "bottom",
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
			<ListItemButton onClick={handleHomePage}>
				<ListItemIcon>
					<Home fontSize="small" />
				</ListItemIcon>
				Home
			</ListItemButton>
			{authCtx.isLoggedIn && (
				<div>
					<ListItemButton onClick={handleLibraryPage}>
						<ListItemIcon>
							<LibraryBooksIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText primary="Library" />
					</ListItemButton>
					<ListItemButton onClick={handleDashboardPage}>
						<ListItemIcon>
							<DashboardIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText primary="Dashboard" />
					</ListItemButton>
				</div>
			)}
			<Divider />
			<ListItemButton>
				<ListItemIcon>
					<SettingsIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText primary="Settings" />
			</ListItemButton>
			<Divider />
			<ListItemButton onClick={toggleTheme}>
				<ListItemIcon>
					<Switch
						size="small"
						sx={{ marginLeft: -1 }}
						checked={theme.palette.mode === "dark" ? true : false}
					/>
				</ListItemIcon>
				<ListItemText
					primary={`${
						theme.palette.mode === "dark" ? "Dark" : "Light"
					} Theme`}
				/>
			</ListItemButton>
			{authCtx.isLoggedIn ? (
				<ListItemButton onClick={handleLogout}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Log Out" />
				</ListItemButton>
			) : (
				<ListItemButton onClick={handleSignIn}>
					<ListItemIcon>
						<Login fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Sign In" />
				</ListItemButton>
			)}
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Box sx={{ flexGrow: 1 }} />
			<Box sx={{ display: { xs: "none", md: "flex" } }}>
				<IconButton size="large" onClick={handleHomePage}>
					<Chip color="info" icon={<Home />} label="Home" />
				</IconButton>
				{authCtx.isLoggedIn && (
					<React.Fragment>
						<IconButton size="large" onClick={handleLibraryPage}>
							<Chip
								color="info"
								icon={<LibraryBooksIcon />}
								label="Library"
							/>
						</IconButton>
						<IconButton size="large" onClick={handleDashboardPage}>
							<Chip
								color="info"
								icon={<DashboardIcon />}
								label="Dashboard"
							/>
						</IconButton>
					</React.Fragment>
				)}
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
