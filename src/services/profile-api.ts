import { MyStudyType, ProfilePutType, UserInfoType } from "../types/profile-type";
import fetchCall from "./common";

const getProfile = async () => {
  const userInfo = await fetchCall<UserInfoType>(`/api/members/my-info`, "get");
  return userInfo;
};

const putProfile = async (profileObj: ProfilePutType) => {
  const userInfo = await fetchCall<UserInfoType>(`/api/members/my-info/update`, "put", profileObj);
  return userInfo;
};

const getMyStudy = async () => {
  const myStudy = await fetchCall<MyStudyType[]>(`/api/members/my-study`, "get");
  return myStudy;
};

export { getProfile, putProfile, getMyStudy };
