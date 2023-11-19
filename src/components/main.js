import * as React from "react";

import { DRAWER_HEADER, DRAWER_WIDTH } from "../utils/helper";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import SearchBar from "./search-bar";
import SideDrawer from "./side-drawer";
import Toolbar from "@mui/material/Toolbar";
import UserMenu from "./user-menu";
import { styled } from "@mui/material/styles";

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: DRAWER_WIDTH,
		width: `calc(100% - ${DRAWER_WIDTH}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export default function Main() {
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setIsDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" open={isDrawerOpen}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(isDrawerOpen && { display: "none" }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<SearchBar />
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { md: "flex" } }}>
						<UserMenu />
					</Box>
				</Toolbar>
			</AppBar>
			<SideDrawer
				setIsDrawerOpen={setIsDrawerOpen}
				isDrawerOpen={isDrawerOpen}
				handleDrawerClose={handleDrawerClose}
			/>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DRAWER_HEADER />
			</Box>
		</Box>
	);
}
