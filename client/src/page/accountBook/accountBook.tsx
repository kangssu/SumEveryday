import "./accountBook.css";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillMinusSquare } from "react-icons/ai";
import { useEffect, useState } from "react";
import Header from "../../components/layout/header";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/layout/footer";
import {
	AccountBookObject,
	WeeklyAccountBookObject,
	WeeklyExpenseTotalObject,
	WeeklyIncomeTotalObject,
} from "../../object/accountBookObject";
import { Category, Week } from "../../enum/accountBook.enum";

export default function AccountBook() {
	const history = useNavigate();
	const goAdmin = () => {
		history("/admin");
	};
	const [weekMaxCount, setWeekMaxCount] = useState(0);
	const [nowMonth, setNowMonth] = useState("");
	const [weeklyAccountBook, setWeeklyAccountBook] =
		useState<WeeklyAccountBookObject>();

	useEffect(() => {
		fetch("/api/accountBook/currentMonths", {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("제대로 전부 가져오는지 확인 : ", data);
				setWeeklyAccountBook(data);
				setNowMonth(data.currentMonth);
				const firstWeekCount = data.firstWeek.length;
				const secondWeekCount = data.secondWeek.length;
				const thirdWeekCount = data.thirdWeek.length;
				const fourthWeekCount = data.fourthWeek.length;
				const fifthWeekCount = data.fifthWeek.length;

				setWeekMaxCount(
					Math.max(
						firstWeekCount,
						secondWeekCount,
						thirdWeekCount,
						fourthWeekCount,
						fifthWeekCount
					)
				);
			});
	}, []);

	const weeklyTotal = (pay: number[]) => {
		const total = pay.reduce((total: number, pay: number) => total + pay, 0);
		return String(total).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	const calculationWeeklyAmounts = (weeklyAccountBook: any) => {
		const weeklyIncomeTotal: WeeklyIncomeTotalObject = {};
		const weeklyExpenseTotal: WeeklyExpenseTotalObject = {};

		if (weeklyAccountBook.firstWeek.length > 0) {
			const expenseTotalResult = weeklyTotal(
				weeklyAccountBook.firstWeek
					.filter(
						(firstWeek: AccountBookObject) =>
							firstWeek.category === Category.EXPENSE
					)
					.map((firstWeek: AccountBookObject) => Number(firstWeek.pay))
			);
			weeklyExpenseTotal.firstWeek = expenseTotalResult;

			const incomeTotalResult = weeklyTotal(
				weeklyAccountBook.firstWeek
					.filter(
						(firstWeek: AccountBookObject) =>
							firstWeek.category === Category.IMPORTATION
					)
					.map((firstWeek: AccountBookObject) => Number(firstWeek.pay))
			);
			weeklyIncomeTotal.firstWeek = incomeTotalResult;
		}

		if (weeklyAccountBook.secondWeek.length > 0) {
			const expenseTotalResult = weeklyTotal(
				weeklyAccountBook.secondWeek
					.filter(
						(secondWeek: AccountBookObject) =>
							secondWeek.category === Category.EXPENSE
					)
					.map((secondWeek: AccountBookObject) => Number(secondWeek.pay))
			);
			weeklyExpenseTotal.secondWeek = expenseTotalResult;

			const incomeTotalResult = weeklyTotal(
				weeklyAccountBook.secondWeek
					.filter(
						(secondWeek: AccountBookObject) =>
							secondWeek.category === Category.IMPORTATION
					)
					.map((secondWeek: AccountBookObject) => Number(secondWeek.pay))
			);
			weeklyIncomeTotal.secondWeek = incomeTotalResult;
		}

		if (weeklyAccountBook.thirdWeek.length > 0) {
			const expenseTotalResult = weeklyTotal(
				weeklyAccountBook.thirdWeek
					.filter(
						(thirdWeek: AccountBookObject) =>
							thirdWeek.category === Category.EXPENSE
					)
					.map((thirdWeek: AccountBookObject) => Number(thirdWeek.pay))
			);
			weeklyExpenseTotal.thirdWeek = expenseTotalResult;

			const incomeTotalResult = weeklyTotal(
				weeklyAccountBook.thirdWeek
					.filter(
						(thirdWeek: AccountBookObject) =>
							thirdWeek.category === Category.IMPORTATION
					)
					.map((thirdWeek: AccountBookObject) => Number(thirdWeek.pay))
			);
			weeklyIncomeTotal.thirdWeek = incomeTotalResult;
		}

		if (weeklyAccountBook.fourthWeek.length > 0) {
			const expenseTotalResult = weeklyTotal(
				weeklyAccountBook.fourthWeek
					.filter(
						(fourthWeek: AccountBookObject) =>
							fourthWeek.category === Category.EXPENSE
					)
					.map((fourthWeek: AccountBookObject) => Number(fourthWeek.pay))
			);
			weeklyExpenseTotal.fourthWeek = expenseTotalResult;

			const incomeTotalResult = weeklyTotal(
				weeklyAccountBook.fourthWeek
					.filter(
						(fourthWeek: AccountBookObject) =>
							fourthWeek.category === Category.IMPORTATION
					)
					.map((fourthWeek: AccountBookObject) => Number(fourthWeek.pay))
			);
			weeklyIncomeTotal.fourthWeek = incomeTotalResult;
		}

		if (weeklyAccountBook.fifthWeek.length > 0) {
			const expenseTotalResult = weeklyTotal(
				weeklyAccountBook.fifthWeek
					.filter(
						(fifthWeek: AccountBookObject) =>
							fifthWeek.category === Category.EXPENSE
					)
					.map((fifthWeek: AccountBookObject) => Number(fifthWeek.pay))
			);
			weeklyExpenseTotal.fifthWeek = expenseTotalResult;

			const incomeTotalResult = weeklyTotal(
				weeklyAccountBook.fifthWeek
					.filter(
						(fifthWeek: AccountBookObject) =>
							fifthWeek.category === Category.IMPORTATION
					)
					.map((fifthWeek: AccountBookObject) => Number(fifthWeek.pay))
			);
			weeklyIncomeTotal.fifthWeek = incomeTotalResult;
		}

		return {
			weeklyIncomeTotal: weeklyIncomeTotal,
			weeklyExpenseTotal: weeklyExpenseTotal,
		};
	};

	const rendering = (weeklyAccountBook: any) => {
		const result = [];
		const calculationResult = calculationWeeklyAmounts(weeklyAccountBook);

		for (let i = 0; i < weekMaxCount; i++) {
			console.log("??? : ", weeklyAccountBook.firstWeek[i]);
			result.push(
				<tr key={i}>
					<td colSpan={2}>
						{weeklyAccountBook.firstWeek[i] !== undefined ? (
							<>
								<span className="dayBox">
									{weeklyAccountBook.firstWeek[i].date.day}
								</span>
								<span className="dayContentBox">
									{weeklyAccountBook.firstWeek[i].content}
								</span>
								{weeklyAccountBook.firstWeek[i].category === "수입" ? (
									<span className="plusPayBox">
										<AiFillPlusSquare
											fontSize="16px"
											color="#E10944"
											className="plusAndMinusIcon"
										/>
										{weeklyAccountBook.firstWeek[i].pay.replace(
											/\B(?=(\d{3})+(?!\d))/g,
											","
										)}
										원
									</span>
								) : (
									<span className="minusPayBox">
										<AiFillMinusSquare
											fontSize="16px"
											color="#5b5b5b"
											className="plusAndMinusIcon"
										/>
										{weeklyAccountBook.firstWeek[i].pay.replace(
											/\B(?=(\d{3})+(?!\d))/g,
											","
										)}
										원
									</span>
								)}
							</>
						) : (
							<span className="emptyContent">💘</span>
						)}
					</td>
					<td colSpan={2}>
						{weeklyAccountBook.secondWeek[i] !== undefined ? (
							<>
								<span className="dayBox">
									{weeklyAccountBook.secondWeek[i].date.day}
								</span>
								<span className="dayContentBox">
									{weeklyAccountBook.secondWeek[i].content}
								</span>
								{weeklyAccountBook.secondWeek[i].category === "수입" ? (
									<span className="plusPayBox">
										<AiFillPlusSquare
											fontSize="16px"
											color="#E10944"
											className="plusAndMinusIcon"
										/>
										{weeklyAccountBook.secondWeek[i].pay.replace(
											/\B(?=(\d{3})+(?!\d))/g,
											","
										)}
										원
									</span>
								) : (
									<span className="minusPayBox">
										<AiFillMinusSquare
											fontSize="16px"
											color="#5b5b5b"
											className="plusAndMinusIcon"
										/>
										{weeklyAccountBook.secondWeek[i].pay.replace(
											/\B(?=(\d{3})+(?!\d))/g,
											","
										)}
										원
									</span>
								)}
							</>
						) : (
							<span className="emptyContent">💘</span>
						)}
					</td>
					<td colSpan={2}>
						{weeklyAccountBook.thirdWeek[i] !== undefined ? (
							<>
								<span className="dayBox">
									{weeklyAccountBook.thirdWeek[i].date.day}
								</span>
								<span className="dayContentBox">
									{weeklyAccountBook.thirdWeek[i].content}
								</span>
								{weeklyAccountBook.thirdWeek[i].category === "수입" ? (
									<span className="plusPayBox">
										<AiFillPlusSquare
											fontSize="16px"
											color="#E10944"
											className="plusAndMinusIcon"
										/>
										{weeklyAccountBook.thirdWeek[i].pay.replace(
											/\B(?=(\d{3})+(?!\d))/g,
											","
										)}
										원
									</span>
								) : (
									<span className="minusPayBox">
										<AiFillMinusSquare
											fontSize="16px"
											color="#5b5b5b"
											className="plusAndMinusIcon"
										/>
										{weeklyAccountBook.thirdWeek[i].pay.replace(
											/\B(?=(\d{3})+(?!\d))/g,
											","
										)}
										원
									</span>
								)}
							</>
						) : (
							<span className="emptyContent">💘</span>
						)}
					</td>
					<td colSpan={2}>
						{weeklyAccountBook.fourthWeek[i] !== undefined ? (
							<>
								<span className="dayBox">
									{weeklyAccountBook.fourthWeek[i].date.day}
								</span>
								<span className="dayContentBox">
									{weeklyAccountBook.fourthWeek[i].content}
								</span>
								{weeklyAccountBook.fourthWeek[i].category === "수입" ? (
									<span className="plusPayBox">
										<AiFillPlusSquare
											fontSize="16px"
											color="#E10944"
											className="plusAndMinusIcon"
										/>
										{weeklyAccountBook.fourthWeek[i].pay.replace(
											/\B(?=(\d{3})+(?!\d))/g,
											","
										)}
										원
									</span>
								) : (
									<span className="minusPayBox">
										<AiFillMinusSquare
											fontSize="16px"
											color="#5b5b5b"
											className="plusAndMinusIcon"
										/>
										{weeklyAccountBook.fourthWeek[i].pay.replace(
											/\B(?=(\d{3})+(?!\d))/g,
											","
										)}
										원
									</span>
								)}
							</>
						) : (
							<span className="emptyContent">💘</span>
						)}
					</td>
					<td colSpan={2}>
						{weeklyAccountBook.fifthWeek[i] !== undefined ? (
							<>
								<span className="dayBox">
									{weeklyAccountBook.fifthWeek[i].date.day}
								</span>
								<span className="dayContentBox">
									{weeklyAccountBook.fifthWeek[i].content}
								</span>
								{weeklyAccountBook.fifthWeek[i].category === "수입" ? (
									<span className="plusPayBox">
										<AiFillPlusSquare
											fontSize="16px"
											color="#E10944"
											className="plusAndMinusIcon"
										/>
										{weeklyAccountBook.fifthWeek[i].pay.replace(
											/\B(?=(\d{3})+(?!\d))/g,
											","
										)}
										원
									</span>
								) : (
									<span className="minusPayBox">
										<AiFillMinusSquare
											fontSize="16px"
											color="#5b5b5b"
											className="plusAndMinusIcon"
										/>
										{weeklyAccountBook.fifthWeek[i].pay.replace(
											/\B(?=(\d{3})+(?!\d))/g,
											","
										)}
										원
									</span>
								)}
							</>
						) : (
							<span className="emptyContent">💘</span>
						)}
					</td>
				</tr>
			);
		}

		result.push(
			<>
				<tr key={weeklyAccountBook.currentMonth}>
					<td>주간 수입</td>
					{calculationResult.weeklyIncomeTotal.firstWeek !== undefined ? (
						<td>{calculationResult.weeklyIncomeTotal.firstWeek}원</td>
					) : (
						<td>0원</td>
					)}
					<td>주간 수입</td>
					{calculationResult.weeklyIncomeTotal.secondWeek !== undefined ? (
						<td>{calculationResult.weeklyIncomeTotal.secondWeek}원</td>
					) : (
						<td>0원</td>
					)}
					<td>주간 수입</td>
					{calculationResult.weeklyIncomeTotal.thirdWeek !== undefined ? (
						<td>{calculationResult.weeklyIncomeTotal.thirdWeek}원</td>
					) : (
						<td>0원</td>
					)}
					<td>주간 수입</td>
					{calculationResult.weeklyIncomeTotal.fourthWeek !== undefined ? (
						<td>{calculationResult.weeklyIncomeTotal.fourthWeek}원</td>
					) : (
						<td>0원</td>
					)}
					<td>주간 수입</td>
					{calculationResult.weeklyIncomeTotal.fifthWeek !== undefined ? (
						<td>{calculationResult.weeklyIncomeTotal.fifthWeek}원</td>
					) : (
						<td>0원</td>
					)}
				</tr>
				<tr>
					<td>주간 지출</td>
					{calculationResult.weeklyExpenseTotal.firstWeek !== undefined ? (
						<td>{calculationResult.weeklyExpenseTotal.firstWeek}원</td>
					) : (
						<td>0원</td>
					)}
					<td>주간 지출</td>
					{calculationResult.weeklyExpenseTotal.secondWeek !== undefined ? (
						<td>{calculationResult.weeklyExpenseTotal.secondWeek}원</td>
					) : (
						<td>0원</td>
					)}
					<td>주간 지출</td>
					{calculationResult.weeklyExpenseTotal.thirdWeek !== undefined ? (
						<td>{calculationResult.weeklyExpenseTotal.thirdWeek}원</td>
					) : (
						<td>0원</td>
					)}
					<td>주간 지출</td>
					{calculationResult.weeklyExpenseTotal.fourthWeek !== undefined ? (
						<td>{calculationResult.weeklyExpenseTotal.fourthWeek}원</td>
					) : (
						<td>0원</td>
					)}
					<td>주간 지출</td>
					{calculationResult.weeklyExpenseTotal.fifthWeek !== undefined ? (
						<td>{calculationResult.weeklyExpenseTotal.fifthWeek}원</td>
					) : (
						<td>0원</td>
					)}
				</tr>
			</>
		);
		return result;
	};

	return (
		<div className="container">
			<Header />
			<div className="subBox">
				<div className="subBoxTop">
					<h3 className="month">{nowMonth}</h3>
					<p>월의 기록</p>
					<div className="buttonBox">
						<button className="writeButton" onClick={goAdmin}>
							가계부 관리
						</button>
						<button className="calendarButton">달력보기</button>
					</div>
					<div className="totalTableBox">
						<table>
							<tbody>
								<tr>
									<td>총 수입</td>
									{weeklyAccountBook?.monthDetail.incomeTotal !== undefined ? (
										<td>{weeklyAccountBook.monthDetail.incomeTotal}원</td>
									) : (
										<td>0원</td>
									)}
								</tr>
								<tr>
									<td>총 지출</td>
									{weeklyAccountBook?.monthDetail.expenceTotal !== undefined ? (
										<td>{weeklyAccountBook.monthDetail.expenceTotal}원</td>
									) : (
										<td>0원</td>
									)}
								</tr>
								<tr>
									<td>잔액</td>
									{weeklyAccountBook?.monthDetail.balance !== undefined ? (
										<td>{weeklyAccountBook.monthDetail.balance}원</td>
									) : (
										<td>0원</td>
									)}
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="subBoxBottom">
					<div className="weekTableBox">
						<table>
							<thead>
								<tr>
									<th colSpan={2}>1st Week</th>
									<th colSpan={2}>2nd Week</th>
									<th colSpan={2}>3rd Week</th>
									<th colSpan={2}>4th Week</th>
									<th colSpan={2}>5th Week</th>
								</tr>
							</thead>
							<tbody>
								{weekMaxCount > 0 ? (
									<>{rendering(weeklyAccountBook)}</>
								) : (
									<>
										<tr className="noContent">
											<td colSpan={10}>아직 등록된 내역이 없습니다! 😭😭😭</td>
										</tr>
									</>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
