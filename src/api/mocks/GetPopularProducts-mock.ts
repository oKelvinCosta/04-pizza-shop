import { http, HttpResponse, delay } from "msw";

import type { GetPopularProductsResponse } from "../GetPopularProducts";

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>("/metrics/popular-products", async () => {
  await delay(2000);
  return HttpResponse.json([
    { product: "Pizza 01", amount: 5 },
    { product: "Pizza 02", amount: 3 },
    { product: "Pizza 03", amount: 2 },
    { product: "Pizza 04", amount: 7 },
    { product: "Pizza 05", amount: 4 },
  ]);
});
