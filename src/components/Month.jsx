import React from "react";
import PropTypes from "prop-types";
import Day from "./Day";

const Month = ({ month }) => {
  return (
    <div className="flex-1 grid md:grid-cols-7 md:grid-rows-5 pt-[73px] md:mt-0 grid-cols-3 grid-rows-12 md:pl-60 md:pt-[60px]">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

Month.propTypes = {
  month: PropTypes.array.isRequired,
};

export default Month;
