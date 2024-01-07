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
    console.log(releaseDate);
  };
  return (
    <>
      <button
        className="pb-[2px]"
        onClick={() => {
          setIsDatePickerOpen(!isDatePickerOpen);
        }}
      >
        <FaRegCalendarDays />
      </button>
      {isDatePickerOpen && (
        <DatePicker
          className="text-xl w-52 text-black/50"
          dateFormat="dd/MM/yyyy h:mm aa"
          timeInputLabel="Time:"
          showTimeInput
          selected={releaseDate}
          onChange={handleDateChange}
        />
      )}
    </>
  );
};
export default Calendar;
