import "./accountBook.css";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillMinusSquare } from "react-icons/ai";
import { useEffect, useState } from "react";
import Header from "../../components/layout/header";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../../components/layout/footer";
import { useForm } from "react-hook-form";
import { getCookie } from "../../components/cookie/cookie";
import { Week } from "../../enum/accountBook.enum";
import { number } from "prop-types";

export default function AccountBook() {
	const history = useNavigate();
	const goAdmin = () => {
		history("/admin");
	};
	const [weekMaxCount, setWeekMaxCount] = useState(0);
	const [nowMonth, setNowMonth] = useState("");

	useEffect(() => {
		fetch("/api/accountBook/currentMonthList", {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("제대로 전부 가져오는지 확인 : ", data);
				const firstWeekCount = data.firstWeek.length;
				const secondWeekCount = data.secondWeek.length;
				const thirdWeekCount = data.thirdWeek.length;
				const fourthWeekCount = data.fourthWeek.length;
				const fifthWeekCount = data.fifthWeek.length;
				setNowMonth(data.currentMonth);

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

	return (
		<div className="container">
			<Header></Header>
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
									<td>3,000,000원</td>
								</tr>
								<tr>
									<td>총 지출</td>
									<td>2,800,000원</td>
								</tr>
								<tr>
									<td>잔액</td>
									<td>0원</td>
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
									<>
										<tr>
											<td colSpan={2}>
												<span className="dayBox">2</span>
												<span className="dayContentBox">
													순대,떡볶이,튀김 2인분
												</span>
												<span className="minusPayBox">
													<AiFillMinusSquare fontSize="16px" color="#5b5b5b" />
													15,000원
												</span>
											</td>
											<td colSpan={2}>
												<span className="dayBox">10</span>
												<span className="dayContentBox">대림미술관 전시회</span>
												<span className="plusPayBox">
													<AiFillPlusSquare fontSize="16px" color="#E10944" />
													20,000원
												</span>
											</td>
											<td colSpan={2}>
												<span className="dayBox">18</span>
												<span className="dayContentBox">올리브영 폼클렌징</span>
												<span className="plusPayBox">
													<AiFillPlusSquare fontSize="16px" color="#E10944" />
													15,000원
												</span>
											</td>
											<td colSpan={2}>
												<span className="dayBox">20</span>
												<span className="dayContentBox">월급</span>
												<span className="plusPayBox">
													<AiFillPlusSquare fontSize="16px" color="#E10944" />
													5,600,000원
												</span>
											</td>
											<td colSpan={2}>
												<span className="dayBox">28</span>
												<span className="dayContentBox">
													올리브영 폼클렌징,클렌징 오일 세트
												</span>
												<span className="minusPayBox">
													<AiFillMinusSquare fontSize="16px" color="#5b5b5b" />
													32,000원
												</span>
											</td>
										</tr>
										<tr>
											<td colSpan={2}>
												<span className="dayBox">28</span>
												<span className="dayContentBox">
													올리브영 폼클렌징,클렌징 오일 세트
												</span>
												<span className="plusPayBox">
													<AiFillPlusSquare fontSize="16px" color="#E10944" />
													32,000원
												</span>
											</td>
											<td colSpan={2}></td>
											<td colSpan={2}></td>
											<td colSpan={2}></td>
											<td colSpan={2}></td>
										</tr>
										<tr>
											<td>주간 수입</td>
											<td>2,000,000원</td>
											<td>주간 수입</td>
											<td>100,000원</td>
											<td>주간 수입</td>
											<td>0원</td>
											<td>주간 수입</td>
											<td>15,000원</td>
											<td>주간 수입</td>
											<td>250,000원</td>
										</tr>
										<tr>
											<td>주간 지출</td>
											<td>2,000,000원</td>
											<td>주간 지출</td>
											<td>100,000원</td>
											<td>주간 지출</td>
											<td>0원</td>
											<td>주간 지출</td>
											<td>15,000원</td>
											<td>주간 지출</td>
											<td>250,000원</td>
										</tr>
									</>
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
			<Footer></Footer>
		</div>
	);
}
