import { env } from "@/env";
import { setupWorker } from "msw/browser";

import { signInMock } from "./SignIn-mock";
import { registerRestaurantMock } from "./RegisterRestaurant-mock";
import { getDailyRevenueInPeriodMock } from "./GetDailyRevenueInPeriod-mock";
import { getDayOrdersAmountMock } from "./GetDayOrdersAmount-mock";
import { getMonthCanceledOrdersAmountMock } from "./GetMonthCanceledOrdersAmount-mock";
import { getMonthOrdersAmountMock } from "./GetMonthOrdersAmount-mock";
import { getMonthRevenueMock } from "./GetMonthRevenue-mock";
import { getPopularProductsMock } from "./GetPopularProducts-mock";
import { getProfileMock } from "./GetProfile-mock";
import { updateProfileMock } from "./UpdateProfile-mock";
import { getManagedRestaurantMock } from "./GetManagedRestaurant-mock";
import { getOrdersMock } from "./GetOrders-mock";
import { getOrderDetailsMock } from "./GetOrderDetails-mock";

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDayOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthRevenueMock,
  getDailyRevenueInPeriodMock,
  getPopularProductsMock,
  getProfileMock,
  updateProfileMock,
  getManagedRestaurantMock,
  getOrdersMock,
  getOrderDetailsMock,
);

export async function enableMSW() {
  if (env.MODE !== "test") {
    return;
  }
  // When call this, the requisitions will be intercepted by msw
  await worker.start();
}
