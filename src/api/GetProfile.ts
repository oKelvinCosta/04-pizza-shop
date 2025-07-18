import { api } from "@/lib/Axios";

interface GetProfileResponse {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: "manager" | "customer";
  createdAt: Date | null;
  updatedAt: Date | null;
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>("/me");
  return response.data;
}
