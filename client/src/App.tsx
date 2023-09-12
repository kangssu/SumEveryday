import "./App.css";
import Layout from "./components/layout/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountBook from "./page/accountBook/accountBook";
import Admin from "./page/admin/admin";
import { CookiesProvider } from "react-cookie";

function App() {
	return (
		<CookiesProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />} />
					<Route path="/account-book" element={<AccountBook />} />
					<Route path="/admin" element={<Admin />}></Route>
				</Routes>
			</BrowserRouter>
		</CookiesProvider>
	);
}

export default App;
