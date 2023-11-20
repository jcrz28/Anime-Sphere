import React, { createContext, useCallback, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ThemeContext = createContext({ toggleTheme: () => {} });

export function ThemeContextProvider(props) {
	const [mode, setMode] = useState("dark");

	const toggleTheme = useCallback(() => {
		setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
	}, []);

	const contextValue = useMemo(() => ({ toggleTheme }), [toggleTheme]);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode]
	);

	return (
		<ThemeContext.Provider value={contextValue}>
			<ThemeProvider theme={theme}>{props.children}</ThemeProvider>
		</ThemeContext.Provider>
	);
}
