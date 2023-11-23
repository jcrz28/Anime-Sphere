import { DRAWER_HEADER, DRAWER_WIDTH } from "../utils/helper";
import { Route, Routes } from "react-router-dom";

import AppHeader from "./app-header";
import Authentication from "./authentication";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import JikanAnimeResult from "./jikan-anime-result";
import React from "react";
import SideDrawer from "./side-drawer";
import { ThemeContext } from "../context/theme-context";
import UserAnimeResult from "./user-anime-result";
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

const AppShell = () => {
	const { toggleTheme } = React.useContext(ThemeContext);

	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

	return (
		<ThemeContext.Provider value={{ toggleTheme }}>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<AppHeader
					setIsDrawerOpen={setIsDrawerOpen}
					isDrawerOpen={isDrawerOpen}
				/>
				<SideDrawer
					setIsDrawerOpen={setIsDrawerOpen}
					isDrawerOpen={isDrawerOpen}
				/>
				<Main open={isDrawerOpen}>
					<DRAWER_HEADER />
					<Routes>
						<Route path="/auth" element={<Authentication />} />
						<Route path="/" element={<JikanAnimeResult />} />
						<Route
							path="/library/:userId"
							element={<UserAnimeResult />}
						/>
					</Routes>
				</Main>
			</Box>
		</ThemeContext.Provider>
	);
};

export default AppShell;
