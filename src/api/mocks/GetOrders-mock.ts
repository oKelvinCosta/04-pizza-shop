import { http, HttpResponse, delay } from "msw";

import type { GetOrdersResponse } from "../GetOrders";

type Orders = GetOrdersResponse["orders"];

type OrderStatus = GetOrdersResponse["orders"][number]["status"];

const statuses: OrderStatus[] = [
  "pending",
  "processing",
  "canceled",
  "delivered",
  "delivering",
];

const orders: Orders = Array.from({ length: 60 }).map((_, i) => {
  return {
    orderId: `order-${i + 1}`,
    customerName: `Customer ${i + 1}`,
    createdAt: new Date().toISOString(),
    total: 2400,
    status: statuses[i % 5],
  };
});

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  "/orders",
  async ({ request }) => {
    await delay(2000);
    const { searchParams, search } = new URL(request.url);

    const pageIndex = searchParams.get("paramIndex")
      ? Number(searchParams.get("paramIndex"))
      : 0;

    console.log("Parameters", search);
    const customerName = searchParams.get("customerName");
    const orderId = searchParams.get("orderId");
    const status = searchParams.get("status");

    let filteredOrders = orders;

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerName),
      );
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.includes(orderId),
      );
    }

    if (status) {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === status,
      );
    }

    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    );

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    });
  },
);
