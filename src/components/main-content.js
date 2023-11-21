import { DRAWER_HEADER, DRAWER_WIDTH } from "../utils/helper";
import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Authentication from "./authentication";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import JikanAnimeResult from "./jikan-anime-result";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import SearchBar from "./search-bar";
import SideDrawer from "./side-drawer";
import { ThemeContext } from "../context/theme-context";
import ThemeToggleSwitch from "./theme-toggle-switch";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import UserAnimeResult from "./user-anime-result";
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
	const { toggleTheme } = React.useContext(ThemeContext);
	const location = useLocation();

	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
	const [enteredAnime, setEnteredAnime] = useState("");
	const [triggerJikanAPI, setTriggerJikanAPI] = useState(0);
	const [triggerAPI, setTriggerAPI] = useState(0);

	const submitHandler = () => {
		window.scrollTo(0, 0);

		location.pathname === "/"
			? setTriggerJikanAPI(triggerJikanAPI + 1)
			: setTriggerAPI(triggerAPI + 1);
	};

	return (
		<ThemeContext.Provider value={{ toggleTheme }}>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<AppBar position="fixed" open={isDrawerOpen}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={() => setIsDrawerOpen(true)}
							edge="start"
							sx={{
								mr: 2,
								...(isDrawerOpen && {
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
							onSubmit={submitHandler}
							setEnteredAnime={setEnteredAnime}
						/>
						<Box sx={{ flexGrow: 1 }} />
						<Box sx={{ display: "flex" }}>
							<ThemeToggleSwitch />
							<UserMenu />
						</Box>
					</Toolbar>
				</AppBar>
				<SideDrawer
					setIsDrawerOpen={setIsDrawerOpen}
					isDrawerOpen={isDrawerOpen}
				/>
				<Main open={isDrawerOpen}>
					<DRAWER_HEADER />
					<Routes>
						<Route path="/auth" element={<Authentication />} />
						<Route
							path="/"
							element={
								<JikanAnimeResult
									enteredAnime={enteredAnime}
									trigger={triggerJikanAPI}
								/>
							}
						/>
						<Route
							path="/library/:userId"
							element={
								<UserAnimeResult
									enteredAnime={enteredAnime}
									trigger={triggerAPI}
								/>
							}
						/>
					</Routes>
				</Main>
			</Box>
		</ThemeContext.Provider>
	);
};

export default MainContent;
