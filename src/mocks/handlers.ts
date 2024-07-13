import { http, HttpResponse } from "msw";
import { placeInfo, scheduleList, userInfo } from "./data";

export const handlers = [
  // schedule handlers
  http.get(`/api/study-channels/:studyChannelId/schedules`, ({ request, params }) => {
    const url = new URL(request.url);

    const year = url.searchParams.get("year");
    const month = url.searchParams.get("month");

    console.log(
      `Captured a "GET /api/study-channels/${params.studyChannelId}/schedules?year=${year}&month=${month}" request`,
    );
    return HttpResponse.json(scheduleList);
  }),

  http.get(`/api/study-channels/:studyChannelId/places/:placeId`, ({ params }) => {
    console.log(`Captured a "GET /api/study-channels/${params.studyChannelId}/places/${params.placeId}" request`);
    return HttpResponse.json(placeInfo);
  }),

  http.post(`/api/study-channels/:studyChannelId/schedules`, async ({ request, params }) => {
    const requestBody = await request.json();
    console.log(`Captured a "POST /api/study-channels/${params.studyChannelId}/schedules" request`);
    console.log(requestBody);
    return HttpResponse.json({}, { status: 201 });
  }),

  // profile handlers
  http.put("/api/members/my-info/update", async ({ request }) => {
    const requestBody = await request.json();
    console.log(`Captured a "PUT /api/members/my-info/update" request`);
    console.log(requestBody);
    return HttpResponse.json(userInfo, { status: 200 });
  }),
];
