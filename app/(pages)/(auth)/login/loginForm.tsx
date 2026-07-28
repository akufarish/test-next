"use client";

import { doLogin } from "@/services/auth";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, action, pending] = useActionState(doLogin, undefined);

  return (
    <>
      {state?.error && <p className="text-red-500">{state.error}</p>}
      <form action={action}>
        <div className="flex flex-col gap-2">
          <input type="email" name="email" placeholder="Email" />
          {state?.errors?.email && (
            <p className="text-red-500">{state.errors.email}</p>
          )}{" "}
        </div>
        <div className="flex flex-col gap-2">
          <input type="password" name="password" placeholder="Password" />
          {state?.errors?.password && (
            <div className="text-red-500">
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button type="submit" disabled={pending}>
          {pending ? "Loading....." : "Login"}
        </button>
      </form>
    </>
  );
}
