import "./App.css";
import Layout from "./components/layout/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountBook from "./page/accountBook/accountBook";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />} />
				<Route path="/account-book" element={<AccountBook />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
