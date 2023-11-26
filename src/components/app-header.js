import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import { DRAWER_WIDTH } from "../utils/helper";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import SearchBar from "./search-bar";
import ThemeToggleSwitch from "./theme-toggle-switch";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import UserMenu from "./user-menu";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${DRAWER_WIDTH}px)`,
		marginLeft: `${DRAWER_WIDTH}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const AppHeader = (props) => {
	const location = useLocation();
	const isAuth = location.pathname === "/auth";

	useEffect(() => {
		if (isAuth && props.isDrawerOpen) {
			props.setIsDrawerOpen(false);
		}
	}, [isAuth, props]);

	return (
		<AppBar position="fixed" open={props.isDrawerOpen}>
			<Toolbar sx={{ backgroundColor: "blue" }}>
				{!isAuth && (
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => props.setIsDrawerOpen(true)}
						edge="start"
						sx={{
							mr: 2,
							...(props.isDrawerOpen && {
								display: "none",
							}),
						}}
					>
						<MenuIcon />
					</IconButton>
				)}
				<Typography
					variant="h6"
					noWrap
					component="div"
					sx={{ display: { xs: "none", sm: "block" } }}
				>
					Anime Sphere
				</Typography>
				{!isAuth && <SearchBar />}
				<Box sx={{ flexGrow: 1 }} />
				<Box sx={{ display: { xs: "none", md: "flex" } }}>
					<ThemeToggleSwitch />
				</Box>
				<Box sx={{ display: "flex" }}>
					<UserMenu />
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default AppHeader;
