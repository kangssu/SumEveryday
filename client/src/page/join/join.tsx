import "./join.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ErrorCode } from "../../enum/errorCode.enum";

interface modalPropType {
	setJoinModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface joinObject {
	id: string;
	password: string;
	passwordCheck: string;
	nickname: string;
}

export default function Join({ setJoinModalOpen }: modalPropType) {
	const closeModal = () => {
		setJoinModalOpen(false);
	};

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<joinObject>();

	const [idDuplicateError, setIdDuplicateError] = useState("");
	const [nicknameDuplicateError, setNicknameDuplicateError] = useState("");

	const onSubmit = (data: joinObject) => {
		console.log(data);
		setIdDuplicateError("");
		setNicknameDuplicateError("");

		fetch(`/api/user/sign-up`, {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({
				id: data.id,
				password: data.password,
				nickname: data.nickname,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("data", data);
				if (data.idErrorMessage === ErrorCode.USER_ID_DUPLICATE) {
					setIdDuplicateError("아이디가 중복입니다.");
				}
				if (data.nicknameErrorMessage === ErrorCode.USER_NICKNAME_DUPLICATE) {
					setNicknameDuplicateError("닉네임이 중복입니다.");
				}
				if (
					data.idErrorMessage === undefined &&
					data.nicknameErrorMessage === undefined
				) {
					alert("썸에브리데이에 회원가입 되었습니다!");
					window.location.replace("/");
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="main_join_box">
			<button className="close" onClick={closeModal}>
				<AiFillCloseCircle color="#E10944" />
			</button>
			<h3>JOIN</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					placeholder="아이디를 입력하세요."
					{...register("id", {
						required: "아이디는 필수 입력입니다.",
						pattern: {
							value: /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{5,10}$/g,
							message: "영문자 + 5~10 글자여야 합니다.",
						},
					})}
				></input>
				{errors.id && <div className="error_massage">{errors.id.message}</div>}
				{errors && <div className="error_massage">{idDuplicateError}</div>}
				<input
					type="password"
					placeholder="비밀번호를 입력하세요."
					{...register("password", {
						required: "비밀번호는 필수 입력입니다.",
						pattern: {
							value: /(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?=\S+$).{8,20}/,
							message: "소문자 + 숫자 + 특수문자 조합의 8~20 글자여야 합니다.",
						},
					})}
				></input>
				{errors.password && (
					<div className="error_massage">
						{errors.password.message?.toString()}
					</div>
				)}
				<input
					type="password"
					placeholder="비밀번호를 한번 더 입력하세요."
					{...register("passwordCheck", {
						required: "비밀번호는 필수 입력입니다.",
						pattern: {
							value: /(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?=\S+$).{8,20}/,
							message: "소문자 + 숫자 + 특수문자 조합의 8~20 글자여야 합니다.",
						},
						validate: (value, formValue) => {
							return (
								value === formValue.password || "비밀번호가 일치하지 않습니다."
							);
						},
					})}
				></input>
				{errors.passwordCheck && (
					<div className="error_massage">
						{errors.passwordCheck.message?.toString()}
					</div>
				)}
				<input
					type="text"
					placeholder="닉네임을 입력하세요."
					{...register("nickname", {
						required: "닉네임은 필수 입력입니다.",
						minLength: {
							value: 3,
							message: "3글자 이상이여야 합니다.",
						},
					})}
				></input>
				{errors.nickname && (
					<div className="error_massage">
						{errors.nickname.message?.toString()}
					</div>
				)}
				{errors && (
					<div className="error_massage">{nicknameDuplicateError}</div>
				)}
				<button
					className="main_login_button"
					type="submit"
					disabled={isSubmitting}
				>
					GO
				</button>
			</form>
		</div>
	);
}
