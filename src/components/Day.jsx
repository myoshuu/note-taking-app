import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";

const Day = ({ day, rowIdx }) => {
  const [dayEvent, setDayEvent] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const { setDaySelected, setShowEventModal, savedEvent, setSelectedEvent } =
    useContext(GlobalContext);

  useEffect(() => {
    const event = savedEvent.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvent(event);
  }, [savedEvent, day]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getCurrentDay = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  };

  const extractExcerpt = (html, maxLength) => {
    let truncated = "";
    let count = 0;
    let isInTag = false;

    for (let i = 0; i < html.length; i++) {
      if (html[i] === "<") {
        isInTag = true;
      } else if (html[i] === ">") {
        isInTag = false;
        truncated += html[i];
        continue;
      }

      if (!isInTag) {
        truncated += html[i];
        count++;

        if (count === maxLength) {
          truncated += "...";
          break;
        }
      } else {
        truncated += html[i];
      }
    }

    return truncated;
  };

  return (
    <div className="border border-gray-200 flex flex-col sm:min-h-40">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1 sm:hidden md:block">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        {width < 768 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDay()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvent.map((evt, i) => (
          <div
            key={i}
            onClick={() => setSelectedEvent(evt)}
            className={`text-white p-1 mr-3 mb-1 max-h-40 rounded-md ${evt.label}`}
          >
            <h3 className="text-lg font-medium capitalize">{evt.title}</h3>
            <p
              className="text-sm mt-2"
              dangerouslySetInnerHTML={{
                __html: extractExcerpt(evt.content, 60),
              }}
            ></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
