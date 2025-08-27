import { http, HttpResponse } from "msw";

import type { GetProfileResponse } from "../GetProfile";

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  "/me",
  () => {
    return HttpResponse.json({
      id: "custom-user-id",
      name: "Kelvin Costa",
      email: "okelvincosta@gmail.com",
      phone: "81237127123",
      role: "manager",
      createdAt: new Date(),
      updatedAt: null,
    });
  },
);
