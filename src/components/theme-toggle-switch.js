import {
	Brightness4 as Brightness4Icon,
	Brightness7 as Brightness7Icon,
} from "@mui/icons-material";
import React, { useContext } from "react";

import { IconButton } from "@mui/material";
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
