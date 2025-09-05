import { http, HttpResponse, delay } from "msw";

import type { GetDayOrdersAmountResponse } from "../GetDayOrdersAmount";

export const getDayOrdersAmountMock = http.get<
  never,
  never,
  GetDayOrdersAmountResponse
>("/metrics/day-orders-amount", async () => {
  await delay(2000);

  return HttpResponse.json({
    amount: 20,
    diffFromYesterday: -5,
  });
});
