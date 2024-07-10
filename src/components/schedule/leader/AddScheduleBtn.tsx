import { useNavigate } from "react-router";
import { ScheduleType } from "../../../types/schedule-type";

const AddScheduleBtn = ({ originInfo }: { originInfo: false | ScheduleType | undefined }) => {
  const navigate = useNavigate();

  return (
    <button className="btn-blue self-end mt-4" onClick={() => navigate("schedule_edit", { state: { originInfo } })}>
      {originInfo ? "일정 변경" : "일정 등록"}
    </button>
  );
};

export default AddScheduleBtn;
