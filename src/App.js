import { AnimeQueryProvider } from "./context/anime-query-context.js";
import AppShell from "./components/app-shell.js";
import { AuthContextProvider } from "./context/auth-context";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "./context/theme-context";

const App = () => {
	return (
		<ThemeContextProvider>
			<AuthContextProvider>
				<BrowserRouter>
					<AnimeQueryProvider>
						<AppShell />
					</AnimeQueryProvider>
				</BrowserRouter>
			</AuthContextProvider>
		</ThemeContextProvider>
	);
};

export default App;
