import { http, HttpResponse } from "msw";
import type { registerRestaurantBody } from "../RegisterRestaurant";

export const registerRestaurantMock = http.post<never, registerRestaurantBody>(
  "/restaurants",
  async ({ request }) => {
    const { restaurantName } = await request.json();

    if (restaurantName === "Pizza Shop") {
      return new HttpResponse(null, {
        status: 201,
      });
    }

    return new HttpResponse(null, { status: 400 });
  },
);
