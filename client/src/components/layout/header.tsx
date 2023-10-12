import { useEffect, useState } from "react";
import "./header.css";
import { BsDoorOpenFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Header() {
	const history = useNavigate();
	const [userNickname, setUserNickname] = useState("");

	useEffect(() => {
		fetch("/api/user", {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setUserNickname(data.nickname);
			});
	}, []);

	const removeSessionStorage = () => {
		sessionStorage.removeItem("access-token");
		history("/");
	};

	return (
		<header>
			<h1 className="subLogo">SumEveryday</h1>
			<h3 className="nicknameTitle">{userNickname}님 환영합니다 💘</h3>
			<button className="subLogout" onClick={removeSessionStorage}>
				LOGOUT <BsDoorOpenFill />
			</button>
		</header>
	);
}
