import React, { useContext, useEffect, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import dayjs from "dayjs";
import { getMonth } from "../utils";
import GlobalContext from "../context/GlobalContext";

const SmallCalendar = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, setSmallCalendarMonth, daySelected, setDaySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  const prevMonth = () => {
    setCurrentMonthIdx(currentMonthIdx - 1);
  };

  const nextMonth = () => {
    setCurrentMonthIdx(currentMonthIdx + 1);
  };

  const getCurrDay = (day) => {
    const nowDay = dayjs().format("DD-MM-YY");
    const curDay = day.format("DD-MM-YY");
    const selDay = daySelected && daySelected.format("DD-MM-YY");

    if (nowDay === curDay) {
      return "bg-blue-500 text-white rounded-full";
    } else if (curDay === selDay) {
      return "bg-blue-200 rounded-full text-blue-600 font-bold";
    }
  };

  return (
    <div className="mt-8">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div className="flex items-center gap-x-5">
          <button onClick={prevMonth}>
            <CaretLeft />
          </button>
          <button onClick={nextMonth}>
            <CaretRight />
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-gray-500 text-sm text-center p-3">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                className="w-full"
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
              >
                <p className={`text-sm p-1 ${getCurrDay(day)}`}>
                  {day.format("DD")}
                </p>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SmallCalendar;
