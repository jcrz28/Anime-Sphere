import Box from "@mui/material/Box";
import { DRAWER_WIDTH } from "../utils/helper";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import React from "react";
import SearchBar from "./search-bar";
import ThemeToggleSwitch from "./theme-toggle-switch";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import UserMenu from "./user-menu";
import { styled } from "@mui/material/styles";

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
	return (
		<AppBar position="fixed" open={props.isDrawerOpen}>
			<Toolbar>
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
				<Typography
					variant="h6"
					noWrap
					component="div"
					sx={{ display: { xs: "none", sm: "block" } }}
				>
					Anime Sphere
				</Typography>
				<SearchBar
					onSubmit={props.submitHandler}
					setEnteredAnime={props.setEnteredAnime}
				/>
				<Box sx={{ flexGrow: 1 }} />
				<Box sx={{ display: "flex" }}>
					<ThemeToggleSwitch />
					<UserMenu />
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default AppHeader;
