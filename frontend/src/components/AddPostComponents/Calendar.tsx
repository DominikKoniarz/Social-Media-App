import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaRegCalendarDays } from "react-icons/fa6";

type Props = {
	releaseDate: Date | null;
	setReleaseDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

const Calendar = ({ releaseDate, setReleaseDate }: Props) => {
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

	const handleDateChange = (e: Date | null) => {
		setReleaseDate(e);
	};
	return (
		<>
			<button
				className="pb-0.5"
				onClick={() => {
					setIsDatePickerOpen(!isDatePickerOpen);
				}}
			>
				<FaRegCalendarDays />
			</button>
			{isDatePickerOpen && (
				<DatePicker selected={releaseDate} onChange={handleDateChange} />
			)}
		</>
	);
};
export default Calendar;
