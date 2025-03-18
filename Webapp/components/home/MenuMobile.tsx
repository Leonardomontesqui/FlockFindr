"use client";

import React from "react";
import { useSymposiumCounts } from "@/lib/utils/useSymposiumCounts";

export default function MenuMobile() {
  const counts = useSymposiumCounts();

  return <div>{/* Now you can use counts.Activity, counts.East, etc. */}</div>;
}
