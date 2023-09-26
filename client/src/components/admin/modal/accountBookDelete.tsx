import { UseFormReset } from "react-hook-form";
import "./accountBookDelete.css";
import { AccountBookObject } from "../../../object/accountBookObject";
import { dateObject } from "../../../object/adminObject";

interface modalPropType {
	setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	clickedAccountBook?: AccountBookObject;
	reset: UseFormReset<dateObject>;
}

export default function AccountBookDelete(props: modalPropType) {
	console.log("///////////////////", props.clickedAccountBook?.no);
	const closeModal = () => {
		props.setDeleteModalOpen(false);
	};

	const onSubmit = (id: number) => {
		fetch(`/api/accountBook/${id}`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("data", data);
				props.reset();
				window.location.reload();
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="modalBackgound" onClick={closeModal}>
			<div className="deleteModalBox">
				<h3 className="modalTitle">삭제하시겠습니까?</h3>
				<div className="modalContent">
					<p className="modalNoticeContent">
						📌 {props.clickedAccountBook?.date.year}.
						{props.clickedAccountBook?.date.month}.
						{props.clickedAccountBook?.date.day}{" "}
						{props.clickedAccountBook?.content}
						<br />위 내역을 삭제하면 다시 원복할 수 없습니다.
					</p>
				</div>
				<button
					className="deleteButton"
					onClick={() => onSubmit(props.clickedAccountBook?.no || 0)}
				>
					삭제
				</button>
				<button className="closeButton" onClick={closeModal}>
					취소
				</button>
			</div>
		</div>
	);
}
