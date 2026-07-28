"use server";

import { initPocketBase } from "@/lib/pocketbase";
import { createSession } from "@/lib/session";
import { FormState, loginSchema } from "@/types/authType";
import { redirect } from "next/navigation";

export async function doLogin(state: FormState, formData: FormData) {
  const validatedInput = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedInput.success) {
    return {
      errors: validatedInput.error.flatten().fieldErrors,
    };
  }

  const pb = await initPocketBase();

  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(
        validatedInput.data.email,
        validatedInput.data.password,
      );

    const cookieString = pb.authStore.exportToCookie({
      httpOnly: true,
      secure: true,
    });

    createSession(pb.authStore.token);
  } catch (error) {
    console.log(error);
    return { error: "Email atau password salah" };
  }

  redirect("/dashboard");
}
