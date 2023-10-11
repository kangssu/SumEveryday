import { FieldErrors } from "react-hook-form";
import { AccountBookObject } from "../../object/accountBookObject";

export default function AccountBookConbineErrorMessage(
	errors: FieldErrors<AccountBookObject>
) {
	const errorTypes = [];
	if (errors.date?.month !== undefined) {
		errorTypes.push("월");
	}
	if (errors.date?.day !== undefined) {
		errorTypes.push("일");
	}

	if (errors.category !== undefined) {
		errorTypes.push("수입/지출");
	}
	if (errors.pay !== undefined) {
		errorTypes.push("가격");
	}
	if (errors.content !== undefined) {
		errorTypes.push("내용");
	}

	const combineErrorTypes = errorTypes.join(", ");
	if (errorTypes.length > 0) {
		return (
			<div className="adminErrorMessage">
				📌 {combineErrorTypes}의 값들은 전부 필수 입력 해야합니다!
				<br />
				📌 또한 일, 가격 항목은 숫자로만 기입해야 합니다.
			</div>
		);
	}

	return null;
}
