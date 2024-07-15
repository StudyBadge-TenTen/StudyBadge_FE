import { ProfilePutType, UserInfoType } from "../types/profile-type";
import fetchCall from "./common";

const putProfile = async (profileObj: ProfilePutType) => {
  const userInfo = await fetchCall<UserInfoType>(`/api/members/my-info/update`, "put", profileObj);
  return userInfo;
};

export { putProfile };
