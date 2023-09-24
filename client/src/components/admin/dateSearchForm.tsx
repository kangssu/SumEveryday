import { useEffect, useState } from "react";
import { dateListObject, dateObject } from "../../object/adminObject";
import { FieldErrors, useForm } from "react-hook-form";
import { AccountBookObject } from "../../object/accountBookObject";
import AccountBookDelete from "./modal/accountBookDelete";

export default function DateSearchForm() {
	const [date, setDate] = useState<dateListObject>();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<dateObject>();
	const [listByDate, setListByDate] = useState([]);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [clickedAccountBook, setClickedAccountBook] =
		useState<AccountBookObject>();

	const showModal = (data: AccountBookObject) => {
		setDeleteModalOpen(true);
		setClickedAccountBook(data);
	};

	useEffect(() => {
		fetch("/api/accountBook/date", {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("1. data : ", data);
				setDate(data);
				setListByDate(data.accountBooks);
			});
	}, []);

	const onSubmit = (data: dateObject) => {
		setListByDate([]);
		fetch("/api/accountBook/search", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
			},
			body: JSON.stringify({
				year: Number(data.year),
				month: Number(data.month),
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("2. data : ", data);
				setListByDate(data);
			});
	};

	const conbineErrorMessages = (errors: FieldErrors<dateObject>) => {
		const errorTypes = [];
		if (errors.year !== undefined) {
			errorTypes.push("년도");
		}
		if (errors.month !== undefined) {
			errorTypes.push("월");
		}

		const combineErrorTypes = errorTypes.join(", ");
		if (errorTypes.length > 0) {
			return (
				<div className="adminErrorMessage">
					📌 {combineErrorTypes}의 값들은 전부 필수 선택 해야합니다!
				</div>
			);
		}

		return null;
	};

	return (
		<>
			<div className="searchBox">
				<form onSubmit={handleSubmit(onSubmit)}>
					<select
						{...register("year", {
							required: "년도는 필수 선택입니다.",
							pattern: {
								value: /^[0-9]+$/,
								message: "년도를 선택해주세요!",
							},
						})}
					>
						<option>--년도 선택--</option>
						{date?.years.map((year: number) => (
							<option key={year} value={year}>
								{year}년
							</option>
						))}
					</select>

					<select
						{...register("month", {
							required: "월은 필수 선택입니다.",
							pattern: {
								value: /^[0-9]+$/,
								message: "월을 선택해주세요!",
							},
						})}
					>
						<option>--월 선택--</option>
						{date?.months.map((month: number) => (
							<option key={month} value={month}>
								{month}월
							</option>
						))}
					</select>

					<button className="inquiryButton">조회하기</button>
				</form>
			</div>
			{conbineErrorMessages(errors)}
			<div className="searchListBox">
				{listByDate.map((list: AccountBookObject) => (
					<div className="listSingleBox" key={list.no}>
						<h3 className="listDate">
							{list.date.year}.{list.date.month}.{list.date.day}
						</h3>
						<p className="listContent">{list.content}</p>
						<span>{list.pay}원</span>
						<button className="modifyButton">수정</button>
						<button className="deleteButton" onClick={() => showModal(list)}>
							삭제
						</button>
						{deleteModalOpen && (
							<AccountBookDelete
								setDeleteModalOpen={setDeleteModalOpen}
								clickedAccountBook={clickedAccountBook}
							/>
						)}
					</div>
				))}
			</div>
		</>
	);
}
