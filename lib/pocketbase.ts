import { cookies } from "next/headers";
import PocketBase from "pocketbase";

export async function initPocketBase() {
  const pb = new PocketBase("http://127.0.0.1:8090");

  pb.autoCancellation(false);

  const cookieStore = await cookies();
  const authCookie = cookieStore.get("token");

  if (authCookie) {
    pb.authStore.loadFromCookie(`token=${authCookie.value}`);
  }

  return pb;
}
