import { api } from "@/lib/Axios";

export async function signOut() {
  await api.post("/sign-out");
}
