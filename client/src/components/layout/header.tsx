import "./header.css";
import { BsDoorOpenFill } from "react-icons/bs";

export default function Header() {
	return (
		<header>
			<h1 className="subLogo">SumEveryday</h1>
			<button className="subLogout">
				LOGOUT <BsDoorOpenFill />
			</button>
		</header>
	);
}
