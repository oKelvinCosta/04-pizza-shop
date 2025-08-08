import { api } from "@/lib/Axios";

export interface CancelOrderParams {
  orderId: string;
}

export async function cancelOrder({ orderId }: CancelOrderParams) {
  const response = await api.patch(`/orders/${orderId}/cancel`);
  return response.data;
}
