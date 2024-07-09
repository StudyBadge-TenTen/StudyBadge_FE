import React from "react";
import { TimeSelectorPropsType } from "../../../types/schedule-type";
import { makeHourList, makeMinuteList } from "../../../utils/make-time-list";

const TimeSelector = ({ selector, name, setTime }: TimeSelectorPropsType): JSX.Element => {
  const handleTimeClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const timeValue = e.target as HTMLSpanElement;

    if (selector === "start-hour") {
      setTime((origin) => ({
        ...origin,
        start: [timeValue.innerHTML, origin.start[1]],
      }));
    }
    if (selector === "start-minute") {
      setTime((origin) => ({
        ...origin,
        start: [origin.start[0], timeValue.innerHTML],
      }));
    }
    if (selector === "end-hour") {
      setTime((origin) => ({
        ...origin,
        end: [timeValue.innerHTML, origin.end[1]],
      }));
    }
    if (selector === "end-minute") {
      setTime((origin) => ({
        ...origin,
        end: [origin.end[0], timeValue.innerHTML],
      }));
    }
  };

  return (
    <>
      {name === "start" && (
        <>
          <div
            className={`${selector === "start-hour" ? "block" : "hidden"} absolute top-12 left-[114px] bg-white w-fit h-36 rounded-[20px] overflow-auto scrollbar-hide flex flex-col cursor-pointer z-10`}
          >
            {makeHourList().map((hour) => (
              <span
                key={`addStartH-${hour}`}
                onClick={(e) => handleTimeClick(e)}
                className="px-4 py-1 hover:bg-Gray-1/50"
              >
                {hour}
              </span>
            ))}
          </div>
          <div
            className={`${selector === "start-minute" ? "block" : "hidden"} absolute top-12 left-[203px] bg-white w-fit h-36 rounded-[20px] overflow-auto scrollbar-hide flex flex-col cursor-pointer z-10`}
          >
            {makeMinuteList().map((minute) => (
              <span
                key={`addStartM-${minute}`}
                onClick={(e) => handleTimeClick(e)}
                className="px-4 py-1 hover:bg-Gray-1/50"
              >
                {minute}
              </span>
            ))}
          </div>
        </>
      )}
      {name === "end" && (
        <>
          <div
            className={`${selector === "end-hour" ? "block" : "hidden"} absolute top-12 left-[114px] bg-white w-fit h-36 rounded-[20px] overflow-auto scrollbar-hide flex flex-col cursor-pointer z-10`}
          >
            {makeHourList().map((hour) => (
              <span
                key={`addEndH-${hour}`}
                onClick={(e) => handleTimeClick(e)}
                className="px-4 py-1 hover:bg-Gray-1/50"
              >
                {hour}
              </span>
            ))}
          </div>
          <div
            className={`${selector === "end-minute" ? "block" : "hidden"} absolute top-12 left-[203px] bg-white w-fit h-36 rounded-[20px] overflow-auto scrollbar-hide flex flex-col cursor-pointer z-10`}
          >
            {makeMinuteList().map((minute) => (
              <span
                key={`addEndM-${minute}`}
                onClick={(e) => handleTimeClick(e)}
                className="px-4 py-1 hover:bg-Gray-1/50"
              >
                {minute}
              </span>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default TimeSelector;
