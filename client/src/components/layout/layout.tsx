import "./layout.css";
import Header from "./header";
import { useState } from "react";
import Join from "../../page/join/join";
import { useForm } from "react-hook-form";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

export const setCookie = (name: string, value: string) => {
	return cookies.set(name, value, {
		httpOnly: true,
		secure:true,
		maxAge: 60 * 60 * 3,
		path: "/",
	});
};

export const getCookie = (name: string) => {
	return cookies.get(name);
};

interface loginObject {
	id: string;
	password: string;
}

export default function Layout() {
	const history = useNavigate();
	const [joinModalOpen, setJoinModalOpen] = useState(false);

	const showModal = () => {
		setJoinModalOpen(true);
	};

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<loginObject>();

	const [idError, setIdError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const onSubmit = (data: loginObject) => {
		console.log(data);
		setIdError("");
		setPasswordError("");

		fetch(`/api/login`, {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({
				id: data.id,
				password: data.password,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("data", data);
				if (data.userErrorMessageObject.idErrorMessage !== undefined) {
					setIdError("아이디가 존재하지 않습니다.");
				}
				if (data.userErrorMessageObject.passwordErrorMessage !== undefined) {
					setPasswordError("비밀번호가 일치하지 않습니다.");
				}
				if (
					data.userErrorMessageObject.idErrorMessage === undefined &&
					data.userErrorMessageObject.passwordErrorMessage === undefined
				) {
					setCookie("access-token", data.accessToken);
					alert("썸에브리데이에 오신걸 환영합니다!");
					history("/account-book");
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="main_wrap">
			<Header></Header>
			<main>
				<div className="main_login_box">
					<h3>LOGIN</h3>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							type="text"
							placeholder="아이디를 입력하세요."
							{...register("id", {
								required: "아이디는 필수 입력입니다.",
							})}
						></input>
						{errors.id && (
							<div className="error_massage">{errors.id.message}</div>
						)}
						{errors && <div className="error_massage">{idError}</div>}
						<input
							type="password"
							placeholder="비밀번호를 입력하세요."
							{...register("password", {
								required: "비밀번호는 필수 입력입니다.",
							})}
						></input>
						{errors.id && (
							<div className="error_massage">{errors.id.message}</div>
						)}
						{errors && <div className="error_massage">{passwordError}</div>}
						<button
							className="main_login_button"
							type="submit"
							disabled={isSubmitting}
						>
							START
						</button>
					</form>
					<br></br>
					<div className="main_user_button_box">
						<p>아직 회원이 아니신가요?</p>
						<button onClick={showModal}>회원가입</button>
						{joinModalOpen && <Join setJoinModalOpen={setJoinModalOpen} />}
					</div>
				</div>
			</main>
		</div>
	);
}
