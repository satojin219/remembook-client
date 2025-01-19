"use client";

import { registerServiceWorker } from "@/serviceWorker/registerServiceWorker";
import { redirect } from "next/navigation";

export default function Home() {

  registerServiceWorker();
  redirect("/login");
}
