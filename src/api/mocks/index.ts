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
import { approveOrderMock } from "./ApproveOrder-mock";
import { cancelOrderMock } from "./CancelOrder-mock";
import { deliverOrderMock } from "./DeliverOrder-mock";
import { dispatchOrderMock } from "./DispatchOrder-mock";
import { signOutMock } from "./SignOut-mock";

export const worker = setupWorker(
  signInMock,
  signOutMock,
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
  approveOrderMock,
  cancelOrderMock,
  deliverOrderMock,
  dispatchOrderMock,
);

export async function enableMSW() {
  if (env.MODE !== "test") {
    return;
  }
  // When call this, the requisitions will be intercepted by msw
  await worker.start();
}
