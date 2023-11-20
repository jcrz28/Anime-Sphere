import { AuthContextProvider } from "./context/auth-context";
import { BrowserRouter } from "react-router-dom";
import MainContent from "./components/main";

const App = () => {
	return (
		<AuthContextProvider>
			<BrowserRouter>
				<MainContent />
			</BrowserRouter>
		</AuthContextProvider>
	);
};

export default App;
