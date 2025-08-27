import { http, HttpResponse } from "msw";

import type { GetMonthOrdersAmountResponse } from "../GetMonthOrdersAmount";

export const getMonthOrdersAmountMock = http.get<
  never,
  never,
  GetMonthOrdersAmountResponse
>("/metrics/month-orders-amount", () => {
  return HttpResponse.json({
    amount: 200,
    diffFromLastMonth: 7,
  });
});
