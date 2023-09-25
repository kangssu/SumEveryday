import { useNavigate } from "react-router-dom";
import Footer from "../../components/layout/footer";
import Header from "../../components/layout/header";
import "./admin.css";
import { BsFillGearFill } from "react-icons/bs";
import { TiArrowBackOutline } from "react-icons/ti";
import { FieldErrors, useForm } from "react-hook-form";
import { Category } from "../../enum/accountBook.enum";
import DateSearchForm from "../../components/admin/dateSearchForm";
import { AccountBookObject } from "../../object/accountBookObject";

export default function Admin() {
	const history = useNavigate();
	const goBack = () => {
		history("/account-book");
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AccountBookObject>();

	const onSubmit = (data: AccountBookObject) => {
		console.log(data);

		fetch(`/api/accountBook/create`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
			},
			body: JSON.stringify({
				category: data.category,
				date: {
					month: Number(data.date.month),
					day: Number(data.date.day),
				},
				content: data.content,
				pay: data.pay,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("data", data);
				alert("정상적으로 등록되었습니다!");
				reset();
				window.location.reload();
			})
			.catch((error) => {
				console.error("Error:", error);
				alert(`제대로 등록되지 않았습니다!`);
			});
	};

	const conbineErrorMessages = (errors: FieldErrors<AccountBookObject>) => {
		const errorTypes = [];
		if (errors.date?.month !== undefined) {
			errorTypes.push("월");
		}
		if (errors.date?.day !== undefined) {
			errorTypes.push("일");
		}

		if (errors.category !== undefined) {
			errorTypes.push("수입/지출");
		}
		if (errors.pay !== undefined) {
			errorTypes.push("가격");
		}
		if (errors.content !== undefined) {
			errorTypes.push("내용");
		}

		const combineErrorTypes = errorTypes.join(", ");
		if (errorTypes.length > 0) {
			return (
				<div className="adminErrorMessage">
					📌 {combineErrorTypes}의 값들은 전부 필수 입력 해야합니다!
					<br />
					📌 또한 일, 가격 항목은 숫자로만 기입해야 합니다.
				</div>
			);
		}

		return null;
	};

	return (
		<div className="container">
			<Header />
			<div className="subAdminBox">
				<div className="subTitle">
					<BsFillGearFill className="bsFillGearFillIcon" color="#E10944" />
					<h3>가계부 관리</h3>
					<button className="backButton" onClick={goBack}>
						<TiArrowBackOutline /> 뒤로가기
					</button>
				</div>
				<div className="subLeftBox">
					<div className="subExplanationBox">
						<p>
							새로운 일자의 가계부를 작성해주세요!<br></br>
							현재 년도로 자동으로 작성되며, 월과 일자만 별도로 기입해주세요.
						</p>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="writeBox">
							<h5>월</h5>
							<select
								{...register("date.month", {
									required: "월은 필수 선택입니다.",
									pattern: {
										value: /^[0-9]+$/,
										message: "월을 선택해주세요!",
									},
								})}
							>
								<option>--선택--</option>
								<option value={1}>1월</option>
								<option value={2}>2월</option>
								<option value={3}>3월</option>
								<option value={4}>4월</option>
								<option value={5}>5월</option>
								<option value={6}>6월</option>
								<option value={7}>7월</option>
								<option value={8}>8월</option>
								<option value={9}>9월</option>
								<option value={10}>10월</option>
								<option value={11}>11월</option>
								<option value={12}>12월</option>
							</select>
							<h5>일</h5>
							<input
								type="number"
								className="writeDate"
								placeholder="날짜만 입력"
								{...register("date.day", {
									required: "날짜는 필수 입력입니다.",
									pattern: {
										value: /^[0-9]+$/,
										message: "날짜는 숫자로만 입력해주세요!",
									},
								})}
							/>
							<h5>수입/지출</h5>
							<select
								{...register("category", {
									required: "카테고리는 필수 선택입니다.",
									pattern: {
										value: /^[가-힣]*$/,
										message: "카테고리를 선택해주세요!",
									},
								})}
							>
								<option>--선택--</option>
								<option value={"수입"}>수입</option>
								<option value={"지출"}>지출</option>
							</select>

							<h5>가격</h5>
							<input
								type="text"
								className="writePay"
								placeholder="금액을 작성해주세요."
								{...register("pay", {
									required: "금액은 필수 입력입니다.",
									pattern: {
										value: /^[0-9]+$/,
										message: "금액은 숫자로만 입력해주세요!",
									},
								})}
							/>
							<h5>내용</h5>
							<input
								type="text"
								className="writeContent"
								placeholder="간략한 내용을 작성해주세요."
								{...register("content", {
									required: "간략한 내용은 필수 입력입니다.",
								})}
							/>
						</div>
						{conbineErrorMessages(errors)}
						<button className="writeFinishButton">작성 완료</button>
					</form>
				</div>
				<div className="subRightBox">
					<div className="subExplanationBox">
						<p>
							현재 회원님께서 작성한 가계부의 전체 리스트 입니다.<br></br>
							기존에 등록한 가계부의 년도&월을 아래 검색창에서 선택하여 조회하실
							수 있습니다!
						</p>
					</div>
					<DateSearchForm />
				</div>
			</div>
			<Footer />
		</div>
	);
}
