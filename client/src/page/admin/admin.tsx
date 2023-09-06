import Footer from "../../components/layout/footer";
import Header from "../../components/layout/header";
import "./admin.css";
import { BsFillGearFill } from "react-icons/bs";
import { TiArrowBackOutline } from "react-icons/ti";

export default function Admin() {
	return (
		<div className="container">
			<Header></Header>
			<div className="subBox">
				<div className="subTitle">
					<BsFillGearFill className="bsFillGearFillIcon" color="#E10944" />
					<h3>가계부 관리</h3>
					<button className="backButton"><TiArrowBackOutline color="#E10944"/> 뒤로가기</button>
				</div>
				<div className="subLeftBox">
					<div className="subExplanationBox">
						<p>
							새로운 일자의 가계부를 작성해주세요!<br></br>
							현재 년도로 자동으로 작성되며, 월과 일자만 별도로 기입해주세요.
						</p>
					</div>
					<div className="writeBox">
						<h5>월</h5>
						<select>
							<option>--선택--</option>
							<option>1월</option>
							<option>2월</option>
							<option>3월</option>
							<option>4월</option>
							<option>5월</option>
							<option>6월</option>
							<option>7월</option>
							<option>8월</option>
							<option>9월</option>
							<option>10월</option>
							<option>11월</option>
							<option>12월</option>
						</select>
						<h5>일</h5>
						<input
							type="text"
							className="writeDate"
							placeholder="날짜만 입력"
						/>
						<h5>수입/지출</h5>
						<select>
							<option>--선택--</option>
							<option>수입</option>
							<option>지출</option>
						</select>
						<h5>가격</h5>
						<input
							type="text"
							className="writePay"
							placeholder="금액을 작성해주세요."
						/>
						<h5>내용</h5>
						<input
							type="text"
							className="writeContent"
							placeholder="간략한 내용을 작성해주세요."
						/>
					</div>
					<button className="writeFinishButton">작성 완료</button>
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
							<p>올리브영 특가 폼클렌징</p>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
							<button className="modifyButton">수정</button>
							<button className="deleteButton">삭제</button>
						</div>
						<div className="listSingleBox">
							<h3>20</h3>
							<p>올리브영 특가 폼클렌징</p>
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
