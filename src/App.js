import AppShell from "./components/app-shell.js";
import { AuthContextProvider } from "./context/auth-context";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "./context/theme-context";

const App = () => {
	return (
		<ThemeContextProvider>
			<AuthContextProvider>
				<BrowserRouter>
					<AppShell />
				</BrowserRouter>
			</AuthContextProvider>
		</ThemeContextProvider>
	);
};

export default App;
