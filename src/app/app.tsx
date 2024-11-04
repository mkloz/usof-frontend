import { RouterProvider } from "react-router-dom";
import AppProvider from "./providers/app.provider";
import router from "./router";

function App() {
	return (
		<AppProvider>
			<RouterProvider router={router} />
		</AppProvider>
	);
}

export default App;
