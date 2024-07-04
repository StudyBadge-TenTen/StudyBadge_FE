import Calendar from "react-calendar";
import styled from "styled-components";

export const StyledCalendar = styled(Calendar)`
  min-width: 340px;
  max-width: 390px;
  height: fit-content;
  border: 1px solid #b4bdcb;
  border-radius: 50px;
  padding: 35px 45px;

  .react-calendar__navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    .react-calendar__navigation__label {
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
      color: #1c4587;
    }
    .react-calendar__navigation__arrow {
      text-align: center;
      width: 30px;
      font-size: 2rem;
      color: #1c4587;
    }
  }

  .react-calendar__viewContainer {
    height: 100%;
    padding: 10px;
    .react-calendar__month-view {
      height: 100%;
    }
  }

  .react-calendar__month-view__weekdays {
    font-weight: bold;
    text-align: center;
    abbr {
      text-decoration: none;
    }
    abbr[title="일요일"] {
      color: #bf230b;
    }
    margin-bottom: 10px;
  }

  .react-calendar__month-view__days {
    width: 100%;
  }

  .react-calendar__tile {
    height: 40px;
    text-align: center;
  }
  .react-calendar__tile:hover {
    background-color: #edf2f7;
    border-radius: 50%;
  }

  .react-calendar__tile--now {
    background-color: #edf2f7;
    border-radius: 50%;
  }
  .react-calendar__tile--now:hover {
    background-color: #b4bdcb;
    color: white;
  }

  .react-calendar__tile--active {
    background-color: #b4bdcb;
    border-radius: 50%;
    color: white;
  }
  .react-calendar__tile--active:hover {
    color: black;
  }

  .react-calendar__tile.react-calendar__year-view__months__month:hover {
    border-radius: 20px;
  }
  .react-calendar__tile--now.react-calendar__year-view__months__month {
    border-radius: 20px;
  }
  .react-calendar__tile--now.react-calendar__year-view__months__month:hover {
    border-radius: 20px;
  }
`;
