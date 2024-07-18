import { http, HttpResponse } from "msw";
import {
  myStudyList,
  paymentResponse,
  paymentSuccessResponse,
  placeInfo,
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

    console.log(
      `Captured a "GET /api/study-channels?page=${page}&order=${order}&type=${type}&category=${category}&status=${status}`,
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

  // payment handlers
  http.post("/api/v1/payments/toss", async ({ request }) => {
    const requestBody = await request.json();
    console.log(`Captured a "POST /api/v1/payments/toss" request`);
    console.log(requestBody);
    return HttpResponse.json(paymentResponse, { status: 200 });
  }),

  http.post("/api/v1/payments/success", async ({ request }) => {
    const url = new URL(request.url);

    const paymentKey = url.searchParams.get("paymentKey");
    const orderId = url.searchParams.get("orderId");
    const amount = url.searchParams.get("amount");

    console.log(
      `Captured a "POST /api/v1/payments/toss/success?paymentKey=${paymentKey}&orderId=${orderId}&amount=${amount}" request`,
    );
    return HttpResponse.json(paymentSuccessResponse, { status: 200 });
  }),

  // studyChannel handlers
  http.get("/api/study-channels/:studyChannelId", async ({ params }) => {
    console.log(`Captured a "GET /api/study-channels/${params.studyChannelId}" request`);
    return HttpResponse.json(studyInfoResponse);
  }),
];
