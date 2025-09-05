import { env } from "@/env";

export function testMode(text: string) {
  if (env.MODE === "test") {
    return <div>{text}</div>;
  }
}
