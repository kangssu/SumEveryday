import { useNavigate } from "react-router-dom";
import Footer from "../../components/layout/footer";
import Header from "../../components/layout/header";
import "./admin.css";
import { BsFillGearFill } from "react-icons/bs";
import { TiArrowBackOutline } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { Category } from "../../enum/accountBook.enum";
import { getCookie } from "../../components/cookie/cookie";

interface CreateAccountBookObject {
	category: Category;
	date: {
		year: number;
		month: number;
		day: number;
	};
	content: string;
	pay: string;
}

export default function Admin() {
	const history = useNavigate();
	const goBack = () => {
		history("/account-book");
	};

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<CreateAccountBookObject>();

	const onSubmit = (data: CreateAccountBookObject) => {
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
					year: data.date.year,
					month: data.date.month,
					day: data.date.day,
				},
				content: data.content,
				pay: data.pay,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("data", data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="container">
			<Header></Header>
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
								type="text"
								className="writeDate"
								placeholder="날짜만 입력"
								{...register("date.day", {
									required: "날짜는 필수 입력입니다.",
								})}
							/>
							<h5>수입/지출</h5>
							<select
								{...register("category", {
									required: "카테고리는 필수 선택입니다.",
								})}
							>
								<option>--선택--</option>
								<option>수입</option>
								<option>지출</option>
							</select>
							<h5>가격</h5>
							<input
								type="text"
								className="writePay"
								placeholder="금액을 작성해주세요."
								{...register("pay", {
									required: "금액은 필수 입력입니다.",
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
						<button className="writeFinishButton">작성 완료</button>
					</form>
				</div>
				<div className="subRightBox">
					<div className="subExplanationBox">
						<p>
							기존에 등록한 가계부를 조회할 수 있습니다!<br></br>
							최신 년도와 월로 조회되며, 직접 수정 및 삭제하여 관리해보세요!
						</p>
					</div>
					<div className="searchBox">
						<select>
							<option>--년도 선택--</option>
							<option>2023년</option>
						</select>
						<select>
							<option>--월 선택--</option>
							<option>9월</option>
						</select>
						<button className="inquiryButton">조회하기</button>
					</div>
					<div className="searchListBox">
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징 폼클렌징 폼클렌징 폼클렌징</p>
							<span>3000원</span>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<span>3000원</span>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<span>3000원</span>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<span>3000원</span>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<span>3000원</span>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<span>3000원</span>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<span>3000원</span>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<span>3000원</span>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<span>3000원</span>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<span>3000원</span>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<span>3000원</span>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<span>3000원</span>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<span>3000원</span>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<span>3000원</span>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
					</div>
				</div>
			</div>
			<Footer></Footer>
		</div>
	);
}
