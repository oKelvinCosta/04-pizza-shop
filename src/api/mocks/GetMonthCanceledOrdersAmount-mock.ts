import { http, HttpResponse } from "msw";

import type { GetMonthCanceledOrdersAmountResponse } from "../GetMonthCanceledOrdersAmount";

export const getMonthCanceledOrdersAmountMock = http.get<
  never,
  never,
  GetMonthCanceledOrdersAmountResponse
>("/metrics/month-canceled-orders-amount", () => {
  return HttpResponse.json({
    amount: 5,
    diffFromLastMonth: -5,
  });
});
