import { FieldErrors } from "react-hook-form";
import { dateObject } from "../../object/adminObject";

export default function AdminDateConbineErrorMessage(
	errors: FieldErrors<dateObject>,
	name: string
) {
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
}
