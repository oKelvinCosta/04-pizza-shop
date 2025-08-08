import { api } from "@/lib/Axios";

interface GetMonthRevenueResponse {
  receipt: number;
  diffFromLastMonth: number;
}

export async function getMonthRevenue() {
  const response = await api.get<GetMonthRevenueResponse>(
    "/metrics/month-receipt",
  );
  return response.data;
}
