"use client";

import { redirect } from "next/navigation";

export default function Page() {
  const token = localStorage.getItem("token");

  if (token) {
    redirect("/ambientes");
  } else {
    redirect("/login");
  }
}
