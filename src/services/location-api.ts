import { fetchCall } from "./common";

interface LocatePointType {
  lat: number;
  lng: number;
}

export interface LocateType extends LocatePointType {
  id?: string;
  placeName: string;
  placeAddress: string;
}

export const fetchLocate = async (studyChannelId: number, placeId: number) => {
  if (!studyChannelId || !placeId) return;
  const locateInfo = await fetchCall<LocateType>(`/api/study-channels/${studyChannelId}/places/${placeId}`, "get");
  return locateInfo;
};

export const postLocate = async (studyChannelId: number, placeRequestBody: LocateType | null) => {
  // console.log(studyChannelId, placeRequestBody);

  const placeId = await fetchCall<{ id: number }>(
    `/api/study-channels/${studyChannelId}/places`,
    "post",
    placeRequestBody,
  );
  return placeId;
};
