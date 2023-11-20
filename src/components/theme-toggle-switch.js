import React, { useContext } from "react";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import { ThemeContext } from "../context/theme-context";
import { useTheme } from "@mui/material/styles";

const ThemeToggleSwitch = () => {
	const { toggleTheme } = useContext(ThemeContext);
	const theme = useTheme();

	return (
		<IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
			{theme.palette.mode === "dark" ? (
				<Brightness7Icon />
			) : (
				<Brightness4Icon />
			)}
		</IconButton>
	);
};

export default ThemeToggleSwitch;
