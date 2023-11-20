import * as React from "react";

import { DRAWER_HEADER, DRAWER_WIDTH } from "../utils/helper";
import { Route, Routes } from "react-router-dom";

import Authentication from "./authentication";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import JikanAnimeList from "./jikan-anime-list";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import SearchBar from "./search-bar";
import SideDrawer from "./side-drawer";
import Toolbar from "@mui/material/Toolbar";
import UserMenu from "./user-menu";
import { styled } from "@mui/material/styles";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${DRAWER_WIDTH}px`,
		...(open && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		}),
	})
);

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

const MainContent = () => {
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setIsDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
	};

	return (
		<React.Fragment>
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
								mr: 2,
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
				<Main open={isDrawerOpen}>
					<DRAWER_HEADER />
					<Routes>
						<Route>
							<Route path="/auth" element={<Authentication />} />
						</Route>
						<Route>
							<Route path="/" element={<JikanAnimeList />} />
						</Route>
					</Routes>
				</Main>
			</Box>
		</React.Fragment>
	);
};

export default MainContent;
