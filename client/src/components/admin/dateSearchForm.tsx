import { useEffect, useState } from "react";
import { AllAcountBookObject, dateObject } from "../../object/adminObject";
import { useForm } from "react-hook-form";
import { AccountBookObject } from "../../object/accountBookObject";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillMinusSquare } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import { Category } from "../../enum/accountBook.enum";
import AccountBookModify from "./modal/accountBookModify";
import AccountBookDelete from "./modal/accountBookDelete";
import AdminDateConbineErrorMessage from "../errorMessage/adminDateConbineErrorMessage";

export default function DateSearchForm() {
	const refresh = () => {
		window.location.reload();
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<dateObject>();

	const [date, setDate] = useState<AllAcountBookObject>();
	const [listByDate, setListByDate] = useState([]);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [modifyModalOpen, setModifyModalOpen] = useState(false);
	const [clickedAccountBook, setClickedAccountBook] =
		useState<AccountBookObject>();

	const deleteShowModal = (data: AccountBookObject) => {
		setDeleteModalOpen(true);
		setClickedAccountBook(data);
	};

	const modifyShowModal = (data: AccountBookObject) => {
		setModifyModalOpen(true);
		setClickedAccountBook(data);
	};

	useEffect(() => {
		fetch("/api/accountBooks", {
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
		fetch("/api/accountBooks/admin/search", {
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
				<form onSubmit={handleSubmit(onSubmit)} className="searchFromBox">
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
				<button className="resetButton" onClick={refresh}>
					<GrPowerReset className="grPowerReset" />
				</button>
			</div>
			<AdminDateConbineErrorMessage {...errors} />
			{listByDate.length > 0 ? (
				<div className="searchListBox">
					{listByDate.map((list: AccountBookObject) => (
						<div className="listSingleBox" key={list.no}>
							<h3 className="listDate">
								{list.date.year}.{list.date.month}.{list.date.day}
							</h3>
							<p className="listContent">{list.content}</p>
							{list.category === Category.IMPORTATION ? (
								<span className="plusPayBox">
									<AiFillPlusSquare
										fontSize="16px"
										color="#E10944"
										className="plusAndMinusIcon"
									/>
									{list.pay.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
								</span>
							) : (
								<span className="minusPayBox">
									<AiFillMinusSquare
										fontSize="16px"
										color="#5b5b5b"
										className="plusAndMinusIcon"
									/>
									{list.pay.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
								</span>
							)}
							<button
								className="modifyButton"
								onClick={() => modifyShowModal(list)}
							>
								수정
							</button>

							<button
								className="deleteButton"
								onClick={() => deleteShowModal(list)}
							>
								삭제
							</button>
						</div>
					))}
					{modifyModalOpen && (
						<AccountBookModify
							setModifyModalOpen={setModifyModalOpen}
							clickedAccountBook={clickedAccountBook}
						/>
					)}
					{deleteModalOpen && (
						<AccountBookDelete
							setDeleteModalOpen={setDeleteModalOpen}
							clickedAccountBook={clickedAccountBook}
							reset={reset}
						/>
					)}
				</div>
			) : (
				<div className="searchNoneListBox">
					아직 등록된 내역이 없습니다! 😭😭😭
				</div>
			)}
		</>
	);
}
