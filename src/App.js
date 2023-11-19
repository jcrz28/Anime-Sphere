import { AuthContextProvider } from "./context/auth-context";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/main";

const App = () => {
	return (
		<AuthContextProvider>
			<BrowserRouter>
				<Main />
			</BrowserRouter>
		</AuthContextProvider>
	);
};

export default App;
