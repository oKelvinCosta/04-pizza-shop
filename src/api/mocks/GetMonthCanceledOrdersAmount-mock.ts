import { http, HttpResponse, delay } from "msw";

import type { GetMonthCanceledOrdersAmountResponse } from "../GetMonthCanceledOrdersAmount";

export const getMonthCanceledOrdersAmountMock = http.get<
  never,
  never,
  GetMonthCanceledOrdersAmountResponse
>("/metrics/month-canceled-orders-amount", async () => {
  await delay(2000);
  return HttpResponse.json({
    amount: 5,
    diffFromLastMonth: -5,
  });
});
