import { useForm } from "react-hook-form";
import "./accountBookModify.css";
import { AccountBookObject } from "../../../object/accountBookObject";
import AccountBookConbineErrorMessage from "../../errorMessage/accountBookConbineErrorMessage";

interface modalPropType {
	setModifyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	clickedAccountBook?: AccountBookObject;
}

export default function AccountBookModify(props: modalPropType) {
	const closeModal = () => {
		props.setModifyModalOpen(false);
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AccountBookObject>({
		defaultValues: {
			date: props.clickedAccountBook?.date,
			category: props.clickedAccountBook?.category,
			pay: props.clickedAccountBook?.pay,
			content: props.clickedAccountBook?.content,
		},
	});

	const onSubmit = (data: AccountBookObject) => {
		console.log("data : ", data);

		fetch(`/api/accountBook/${props.clickedAccountBook?.no}`, {
			method: "PATCH",
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
				if (!data.success || data.statusCode === 404) {
					reset();
					alert(`${data.message}`);
				} else {
					alert("정상적으로 수정되었습니다!");
					reset();
					window.location.reload();
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				alert(`제대로 등록되지 않았습니다!`);
			});
	};

	return (
		<div className="modalBackgound">
			<div className="modifyModalBox">
				<h3 className="modalTitle">수정하시겠습니까?</h3>
				<div className="modalContent">
					<p>
						원하시는 항목을 수정할 수 있습니다.
						<br />
						다만, 년도는 자동 등록이므로 수정할 수 없습니다.
					</p>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="modifyBox">
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
							className="modifyDate"
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
							className="modifyPay"
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
							className="modifyContent"
							placeholder="간략한 내용을 작성해주세요."
							{...register("content", {
								required: "간략한 내용은 필수 입력입니다.",
							})}
						/>
					</div>
					<AccountBookConbineErrorMessage {...errors} />
					<button className="modifyButton" type="submit">
						수정
					</button>
					<button className="closeButton" onClick={closeModal}>
						취소
					</button>
				</form>
			</div>
		</div>
	);
}
