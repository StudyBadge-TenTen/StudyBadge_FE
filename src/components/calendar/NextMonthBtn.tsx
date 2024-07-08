import moment from "moment";
import { useSelectedMonthStore } from "../../store/schedule-state";

const NextMonthBtn = (): JSX.Element => {
  const { selectedMonth, setSelectedMonth } = useSelectedMonthStore();

  const updateMonth = (selectedMonth: string) => {
    const date = new Date(selectedMonth);
    const newDate = new Date(date.setMonth(date.getMonth() + 1));
    const transDate = moment(newDate).format("YYYY-MM");
    setSelectedMonth(transDate);
  };

  return <span onClick={() => updateMonth(selectedMonth)}>{">"}</span>;
};

export default NextMonthBtn;
