import { http, HttpResponse } from "msw";
import { placeInfo, scheduleList } from "./data";

//`/api/study-channels/:studyChannelId/schedules?year=yyyy&month=mm`

export const handlers = [
  http.get(`/api/study-channels/:channelId/schedules`, ({ request, params }) => {
    const url = new URL(request.url);

    const year = url.searchParams.get("year");
    const month = url.searchParams.get("month");

    console.log(
      `Captured a "GET /api/study-channels/${params.channelId}/schedules?year=${year}&month=${month}" request`,
    );
    return HttpResponse.json(scheduleList);
  }),

  http.get(`/api/study-channels/:scheduleId/places/:placeId`, ({ params }) => {
    console.log(`Captured a "GET /api/study-channels/${params.scheduleId}/places/${params.placeId}" request`);
    return HttpResponse.json(placeInfo);
  }),
];
