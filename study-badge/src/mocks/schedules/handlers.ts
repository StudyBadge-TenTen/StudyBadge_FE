import { http, HttpResponse } from "msw";
import { scheduleList } from "./data";

//`/api/study-channels/:studyChannelId/schedules?year=yyyy&month=mm`

export const handlers = [
  http.get(`/api/study-channels/1/schedules`, ({ request }) => {
    const url = new URL(request.url);

    const year = url.searchParams.get("year");
    const month = url.searchParams.get("month");

    console.log(`Captured a "GET /api/study-channels/1/schedules?year=${year}&month=${month}" request`);
    return HttpResponse.json(scheduleList);
  }),
];
