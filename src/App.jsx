import React, { useContext, useEffect, useState } from "react";
import { getMonth } from "./utils";
import GlobalContext from "./context/GlobalContext";

import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import EventModal from "./components/EventModal";

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [width, setWidth] = useState(window.innerWidth);
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <React.Fragment>
      {width < 1440 && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-10">
          <h3 className="border flex items-center justify-center w-[100vw] h-[100vh] text-center">
            Im sorry, this app not available at phone or tablet
          </h3>
        </div>
      )}
      <div className={width < 1440 ? "overflow-hidden" : ""}>
        {showEventModal && <EventModal />}
        <div className="h-screen flex flex-col">
          <CalendarHeader />
          <div className="flex flex-1">
            <Sidebar />
            <Month month={currentMonth} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
