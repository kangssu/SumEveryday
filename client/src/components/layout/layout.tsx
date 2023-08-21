import "../../style/layout.css";
import Header from "./header";

export default function Layout() {
	return (
		<body>
			<div className="main_wrap">
				<Header></Header>
				<main>
					<div className="main_login_box">
						<h3>LOGIN</h3>
						<input type="text" placeholder="아이디를 입력하세요."></input>
						<br></br>
						<input type="text" placeholder="비밀번호를 입력하세요."></input>
						<br></br>
						<button className="main_login_button">START</button>
						<br></br>
						<div className="main_user_button_box">
							<p>아직 회원이 아니신가요?</p>
							<button>회원가입</button>
						</div>
					</div>
				</main>
			</div>
		</body>
	);
}
