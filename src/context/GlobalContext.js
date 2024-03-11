import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  smallCalendarMonth: 0,
  daySelected: null,
  showEventModal: false,
  savedEvent: [],
  selectedEvent: null,
  setMonthIndex: (index) => {},
  setSmallCalendarMonth: (index) => {},
  setDaySelected: (day) => {},
  setShowEventModal: () => {},
  dispatchCalEvent: ({ type, payload }) => {},
  setSelectedEvent: () => {},
});

export default GlobalContext;
