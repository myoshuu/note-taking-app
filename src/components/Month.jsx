import React from "react";
import PropTypes from "prop-types";
import Day from "./Day";

const Month = ({ month }) => {
  return (
    <div className="flex-1 grid md:grid-cols-7 md:grid-rows-5 sm:mt-20 md:mt-0 sm:grid-cols-3 sm:grid-rows-12">
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
