import { AccountBookObject } from "../../../object/accountBookObject";
import "./accountBookDelete.css";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillBellFill } from "react-icons/bs";

interface modalPropType {
	setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	clickedAccountBook?: AccountBookObject;
}

export default function AccountBookDelete(props: modalPropType) {
	const closeModal = () => {
		props.setDeleteModalOpen(false);
	};
	console.log("/////////////////////////////////", props.clickedAccountBook);

	return (
		<div className="modalBackgound" onClick={closeModal}>
			<div className="deleteModalBox">
				<h3 className="modalTitle">삭제하시겠습니까?</h3>
				<div className="modalContent">
					<p>
						📌 {props.clickedAccountBook?.date.year}.
						{props.clickedAccountBook?.date.month}.
						{props.clickedAccountBook?.date.day}{" "}
						{props.clickedAccountBook?.content}
						<br />위 내역을 삭제하면 다시 원복할 수 없습니다.
					</p>
				</div>
				<button className="deleteButton">삭제</button>
				<button className="closeButton" onClick={closeModal}>
					취소
				</button>
			</div>
		</div>
	);
}
