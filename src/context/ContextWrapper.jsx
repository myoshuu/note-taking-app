import dayjs from "dayjs";
import GlobalContext from "./GlobalContext";
import { useEffect, useReducer, useState } from "react";

const saveEventReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
};

const initEvent = () => {
  const storageEvent = localStorage.getItem("savedEvent");
  const parsedEvent = storageEvent ? JSON.parse(storageEvent) : [];
  return parsedEvent;
};

const ContextWrapper = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(false);
  const [savedEvent, dispatchCalEvent] = useReducer(
    saveEventReducer,
    [],
    initEvent
  );

  useEffect(() => {
    localStorage.setItem("savedEvent", JSON.stringify(savedEvent));
  }, [savedEvent]);

  useEffect(() => {
    if (smallCalendarMonth !== null) setMonthIndex(smallCalendarMonth);
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) setSelectedEvent(null);
  }, [showEventModal]);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        smallCalendarMonth,
        daySelected,
        showEventModal,
        savedEvent,
        selectedEvent,
        setMonthIndex,
        setSmallCalendarMonth,
        setDaySelected,
        setShowEventModal,
        setSelectedEvent,
        dispatchCalEvent,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
