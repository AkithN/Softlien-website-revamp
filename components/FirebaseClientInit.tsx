"use client";

import { useEffect } from "react";
import { getFirebaseAnalytics } from "@/lib/firebase";

export function FirebaseClientInit() {
  useEffect(() => {
    void getFirebaseAnalytics();
  }, []);

  return null;
}
