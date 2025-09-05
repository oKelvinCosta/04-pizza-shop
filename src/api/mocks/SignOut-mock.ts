import { http, HttpResponse } from "msw";

export const signOutMock = http.post<never, never>(
  "/sign-out",
  async () => {
    // Clear the auth cookie to match @elysiajs/cookie behavior
    return new HttpResponse(null, {
      status: 200,
      headers: { 
        'Set-Cookie': 'auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Max-Age=0',
      },
    });
  }
);
