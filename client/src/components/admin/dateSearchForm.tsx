import { useEffect, useState } from "react";
import { dateListObject, dateObject } from "../../object/adminObject";
import { useForm } from "react-hook-form";
import { AccountBookObject } from "../../object/accountBookObject";

export default function DateSearchForm() {
	const [date, setDate] = useState<dateListObject>();
	const { register, handleSubmit } = useForm<dateObject>();
	const [listByDate, setListByDate] = useState([]);

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
		// eslint-disable-next-line react-hooks/rules-of-hooks
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

	return (
		<>
			<div className="searchBox">
				<form onSubmit={handleSubmit(onSubmit)}>
					<select
						{...register("year", {
							required: "년도는 필수 선택입니다.",
						})}
					>
						{date?.years.map((year: number) => (
							<option key={year} value={year}>
								{year}년
							</option>
						))}
					</select>
					<select
						{...register("month", {
							required: "월은 필수 선택입니다.",
						})}
					>
						{date?.months.map((month: number) => (
							<option key={month} value={month}>
								{month}월
							</option>
						))}
					</select>
					<button className="inquiryButton">조회하기</button>
				</form>
			</div>
			<div className="searchListBox">
				{listByDate.map((list: AccountBookObject) => (
					<div className="listSingleBox" key={list.no}>
						<h3>{list.date.year}.{list.date.month}.{list.date.day}</h3>
						<p>{list.content}</p>
						<span>{list.pay}원</span>
						<button className="modifyButton">수정</button>
						<button className="deleteButton">삭제</button>
					</div>
				))}
			</div>
		</>
	);
}
