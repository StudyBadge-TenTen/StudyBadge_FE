import { http, HttpResponse } from "msw";
import {
  applicationList,
  attendanceResponse,
  attendList,
  memberListResponse,
  myStudyList,
  notificationList,
  paymentResponse,
  paymentsList,
  paymentSuccessResponse,
  placeId,
  placeInfo,
  pointList,
  recruitmentResponse,
  scheduleList,
  studyInfoResponse,
  studyListResponse,
  userInfo,
} from "./data";

export const handlers = [
  // study-channel-list handlers
  http.get(`/api/study-channels`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    const order = url.searchParams.get("order");
    const type = url.searchParams.get("type");
    const category = url.searchParams.get("category");
    const status = url.searchParams.get("status");
    const keyword = url.searchParams.get("keyword");

    console.log(
      `Captured a "GET /api/study-channels?page=${page ?? 1}&order=${order ?? "RECENT"}${type ? `&type=${type}` : ""}${category ? `&category=${category}` : ""}${status ? `&status=${status}` : ""}${keyword ? `&keyword=${keyword}` : ""}" request`,
    );
    return HttpResponse.json(studyListResponse);
  }),

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

  http.post(`/api/study-channels/:studyChannelId/single-schedules`, async ({ request, params }) => {
    const requestBody = await request.json();
    console.log(`Captured a "POST /api/study-channels/${params.studyChannelId}/single-schedules" request`);
    console.log(requestBody);
    return HttpResponse.json({}, { status: 201 });
  }),
  http.post(`/api/study-channels/:studyChannelId/repeat-schedules`, async ({ request, params }) => {
    const requestBody = await request.json();
    console.log(`Captured a "POST /api/study-channels/${params.studyChannelId}/repeat-schedules" request`);
    console.log(requestBody);
    return HttpResponse.json({}, { status: 201 });
  }),

  http.put(`/api/study-channels/:studyChannelId/schedules`, async ({ request, params }) => {
    const requestBody = await request.json();
    console.log(`Captured a "PUT /api/study-channels/${params.studyChannelId}/schedules" request`);
    console.log(requestBody);
    return HttpResponse.json({}, { status: 201 });
  }),
  http.put(`/api/study-channels/:studyChannelId/schedules/isAfterEvent`, async ({ request, params }) => {
    const url = new URL(request.url);
    const Same = url.searchParams.get("Same");

    const requestBody = await request.json();
    console.log(
      `Captured a "PUT /api/study-channels/${params.studyChannelId}/schedules/isAfterEvent?Same=${Same}" request`,
    );
    console.log(requestBody);
    return HttpResponse.json({}, { status: 201 });
  }),
  http.delete(`/api/study-channels/:studyChannelId/schedules`, async ({ request, params }) => {
    const requestBody = await request.json();
    console.log(`Captured a "DELETE /api/study-channels/${params.studyChannelId}/schedules" request`);
    console.log(requestBody);
    return HttpResponse.json({}, { status: 201 });
  }),
  http.delete(`/api/study-channels/:studyChannelId/schedules/isAfterEvent`, async ({ request, params }) => {
    const url = new URL(request.url);
    const Same = url.searchParams.get("Same");

    const requestBody = await request.json();
    console.log(
      `Captured a "DELETE /api/study-channels/${params.studyChannelId}/schedules/isAfterEvent?Same=${Same}" request`,
    );
    console.log(requestBody);
    return HttpResponse.json({}, { status: 201 });
  }),
  http.get(`/api/study-channels/:studyChannelId/places/:placeId`, async ({ params }) => {
    console.log(`Captured a "GET /api/study-channels/${params.studyChannelId}/places/${params.placeId}" request`);
    return HttpResponse.json(placeInfo, { status: 200 });
  }),
  http.post(`/api/study-channels/:studyChannelId/places`, async ({ request, params }) => {
    const requestBody = await request.json();
    console.log(`Captured a "POST /api/study-channels/${params.studyChannelId}/places" request`);
    console.log(requestBody);
    return HttpResponse.json(placeId, { status: 200 });
  }),
  http.get(`/api/study-channels/:channelId/single-schedules/:scheduleId/members`, async ({ request, params }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get("date");

    console.log(
      `Captured a "GET /api/study-channels/${params.studyChannelId}/single-schedules/${params.scheduleId}/members?date=${date}" request`,
    );
    return HttpResponse.json(attendList, { status: 200 });
  }),
  http.get(`/api/study-channels/:channelId/repeat-schedules/:scheduleId/members`, async ({ request, params }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get("date");

    console.log(
      `Captured a "GET /api/study-channels/${params.studyChannelId}/repeat-schedules/${params.scheduleId}/members?date=${date}" request`,
    );
    return HttpResponse.json(attendList, { status: 200 });
  }),

  // profile handlers
  http.get("/api/members/my-info", async () => {
    console.log(`Captured a "GET /api/members/my-info" request`);
    return HttpResponse.json(userInfo);
  }),
  http.put("/api/members/my-info/update", async ({ request }) => {
    const requestBody = await request.json();
    console.log(`Captured a "PUT /api/members/my-info/update" request`);
    console.log(requestBody);
    return HttpResponse.json(userInfo, { status: 200 });
  }),
  http.get("/api/members/my-study", async () => {
    console.log(`Captured a "GET /api/members/my-study" request`);
    return HttpResponse.json(myStudyList);
  }),
  http.get("/api/payments/history", async ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    const size = url.searchParams.get("size");
    console.log(`Captured a "GET /api/payments/history?page=${page}&size=${size}" request`);
    return HttpResponse.json(paymentsList);
  }),
  http.get("/api/points/my-point", async ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    const size = url.searchParams.get("size");
    console.log(`Captured a "GET /api/my-point?page=${page}&size=${size}" request`);
    return HttpResponse.json(pointList);
  }),
  http.get("/api/members/my-apply", async () => {
    console.log(`Captured a "GET /api/members/my-apply" request`);
    return HttpResponse.json(applicationList);
  }),
  http.delete("/api/members/withdrawal", async () => {
    console.log(`Captured a "DELETE /api/members/withdrawal" request`);
    return HttpResponse.json({ status: 200 });
  }),

  // payment handlers
  http.post("/api/payments/toss", async ({ request }) => {
    const requestBody = await request.json();
    console.log(`Captured a "POST /api/payments/toss" request`);
    console.log(requestBody);
    return HttpResponse.json(paymentResponse, { status: 200 });
  }),
  http.post("/api/payments/success", async ({ request }) => {
    const requestBody = await request.json();
    console.log(`Captured a "POST /api/payments/success" request`);
    console.log(requestBody);
    return HttpResponse.json(paymentSuccessResponse, { status: 200 });
  }),
  http.post("/api/payments/cancel", async ({ request }) => {
    const requestBody = await request.json();
    console.log(`Captured a "POST /api/payments/cancel" request`);
    console.log(requestBody);
    return HttpResponse.json({ status: 200 });
  }),

  // studyChannel handlers
  http.post("/api/study-channels", async ({ request }) => {
    const requestBody = await request.json();
    console.log(`Captured a "POST /api/study-channels" request`);
    console.log(requestBody);
    return HttpResponse.json({ studyChannelId: 1 });
  }),
  http.get("/api/study-channels/:studyChannelId", async ({ params }) => {
    console.log(`Captured a "GET /api/study-channels/${params.studyChannelId}" request`);
    return HttpResponse.json(studyInfoResponse);
  }),
  http.put("/api/study-channels/:studyChannelId", async ({ request, params }) => {
    const requestBody = await request.json();
    console.log(`Captured a "PUT /api/study-channels/${params.studyChannelId}" request`);
    console.log(requestBody);
    return HttpResponse.json({ status: 200 });
  }),
  http.get("/api/study-channels/:studyChannelId/members", async ({ params }) => {
    console.log(`Captured a "GET /api/study-channels/${params.studyChannelId}/members" request`);
    return HttpResponse.json(memberListResponse);
  }),
  http.post("/api/study-channels/:studyChannelId/members/assign-role", async ({ request, params }) => {
    const requestBody = await request.json();
    console.log(`Captured a "GET /api/study-channels/${params.studyChannelId}/members/assign-role" request`);
    console.log(requestBody);
    return HttpResponse.json({ status: 200 });
  }),
  http.get("/api/study-channels/:studyChannelId/attendances", async ({ params }) => {
    console.log(`Captured a "GET /api/study-channels/${params.studyChannelId}/attendances" request`);
    return HttpResponse.json(attendanceResponse);
  }),
  http.get("/api/study-channels/:studyChannelId/participation-status", async ({ params }) => {
    console.log(`Captured a "GET /api/study-channels/${params.studyChannelId}/participation-status" request`);
    return HttpResponse.json(recruitmentResponse);
  }),
  http.post(
    "/api/study-channels/:studyChannelId/participation/:participationId/approve",
    async ({ request, params }) => {
      const requestBody = await request.json();
      console.log(
        `Captured a "GET /api/study-channels/${params.studyChannelId}/participation/${params.participationId}/approve" request`,
      );
      console.log(requestBody);
      return HttpResponse.json({ status: 200 });
    },
  ),
  http.post(
    "/api/study-channels/:studyChannelId/participation/:participationId/reject",
    async ({ request, params }) => {
      const requestBody = await request.json();
      console.log(
        `Captured a "GET /api/study-channels/${params.studyChannelId}/participation/${params.participationId}/reject" request`,
      );
      console.log(requestBody);
      return HttpResponse.json({ status: 200 });
    },
  ),
  http.post("/api/study-channels/:studyChannelId/participation", async ({ params }) => {
    console.log(`Captured a "GET /api/study-channels/${params.studyChannelId}/participation" request`);
    return HttpResponse.json({ status: 200 });
  }),
  http.post("/api/study-channels/:studyChannelId/members/:studyMemberId/ban", async ({ params }) => {
    console.log(
      `Captured a "POST /api/study-channels/${params.studyChannelId}/members/${params.studyMemberId}/ban" request`,
    );
    return HttpResponse.json({ status: 200 });
  }),
  http.post("/api/study-channels/:studyChannelId/check-attendance", async ({ params }) => {
    console.log(`Captured a "POST /api/study-channels/${params.studyChannelId}/check-attendance" request`);
    return HttpResponse.json({ status: 200 });
  }),

  // auth handlers
  http.post(`/oauth2/authorization/kakao`, async ({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    console.log(`Captured a "POST /oauth2/authorization/kakao?code=${code}" request`);
    return HttpResponse.json({ status: 200 });
  }),
  http.post(`/oauth2/authorization/naver`, async ({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    console.log(`Captured a "POST /oauth2/authorization/naver?code=${code}" request`);
    return HttpResponse.json({ status: 200 });
  }),

  // notification handlers
  http.get("/api/notifications", async ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    const size = url.searchParams.get("size");

    console.log(`Captured a "GET /api/notifications?page=${page}&size=${size}&sort=createdAt" request`);
    return HttpResponse.json(notificationList);
  }),
];
