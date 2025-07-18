import { api } from "@/lib/Axios";

export interface registerRestaurantBody {
  restaurantName: string;
  managerName: string;
  phone: string;
  email: string;
}

export async function registerRestaurant({
  restaurantName,
  managerName,
  phone,
  email,
}: registerRestaurantBody) {
  // This route didnt return anything
  await api.post("/restaurants", { restaurantName, managerName, phone, email });
}
