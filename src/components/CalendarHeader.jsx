import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import GlobalContext from "../context/GlobalContext";
import { useContext } from "react";
import dayjs from "dayjs";

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const prevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const nextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const resetMonth = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  };

  return (
    <header className="px-4 py-2 sm:fixed sm:bg-white sm:top-0 sm:z-30 md:relative w-full flex items-center">
      <h1 className="md:mr-10 md:text-xl sm:text-sm sm:mr-5 text-gray-500 font-semibold">
        Note Taking App
      </h1>
      <button
        onClick={resetMonth}
        className="border rounded md:py-2 md:px-4 mr-5 sm:py-1 sm:px-2"
      >
        Today
      </button>
      <div className="flex items-center gap-x-5">
        <button onClick={prevMonth}>
          <CaretLeft />
        </button>
        <button onClick={nextMonth}>
          <CaretRight />
        </button>
      </div>
      <h2 className="ml-10 md:text-xl sm:text-lg text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
};

export default CalendarHeader;
