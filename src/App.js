import { AuthContextProvider } from "./context/auth-context";
import { BrowserRouter } from "react-router-dom";
import MainContent from "./components/main-content";
import { ThemeContextProvider } from "./context/theme-context";

const App = () => {
	return (
		<ThemeContextProvider>
			<AuthContextProvider>
				<BrowserRouter>
					<MainContent />
				</BrowserRouter>
			</AuthContextProvider>
		</ThemeContextProvider>
	);
};

export default App;
