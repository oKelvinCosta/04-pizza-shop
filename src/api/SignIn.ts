import { api } from "@/lib/Axios";

export interface SignInBody {
  email: string;
}

export async function signIn({ email }: SignInBody) {
  // This route didnt return anything
  await api.post("/authenticate", { email });
}
