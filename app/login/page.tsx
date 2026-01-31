// app/login/page.tsx (Server Component)
import React from "react";
import LoginClient from "./LoginClient";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const sp = await searchParams;
  const next = sp?.next ?? "/";

  return <LoginClient nextPath={next} />;
}
