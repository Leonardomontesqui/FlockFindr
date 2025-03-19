"use client";

import React from "react";
import { useSymposiumCounts } from "@/lib/utils/useSymposiumCounts";
import { PersonStanding, ArrowRight } from "lucide-react";

const LocationButton = ({
  location,
  count,
  className,
}: {
  location: string;
  count: number;
  className: string;
}) => (
  <button
    className={`flex items-center justify-between px-2 py-1 rounded-full w-fit ${className}`}
  >
    <div className="flex items-center gap-0 w-12">
      <PersonStanding size={20} />
      <span className="font-bold">{count}</span>
    </div>
    <div className="flex items-center gap-2">
      <span>{location}</span>
      <ArrowRight size={20} />
    </div>
  </button>
);

export default function MenuMobile() {
  const counts = useSymposiumCounts();

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-[60px] bg-[#F4EFE3] border-[#DFD9CC] border-b">
        <div className="flex items-center h-full px-4">
          <h1
            className="text-[24px] font-medium text-brown"
            style={{ fontFamily: "Times New Roman" }}
          >
            Foot Traffic at Symposium
          </h1>
        </div>
      </div>
      <div className="fixed top-[70px] left-2 right-2 z-40 flex flex-wrap gap-2">
        <LocationButton
          location="Activity Court"
          count={counts.Activity}
          className="bg-peach border border-peach-dark text-white hover:bg-peach-dark shadow-lg"
        />
        <LocationButton
          location="North Track"
          count={counts.North}
          className="bg-blue border border-blue-dark text-white hover:bg-blue-dark shadow-lg"
        />
        <LocationButton
          location="East Track"
          count={counts.East}
          className="bg-green border border-green-dark text-white hover:bg-green-dark shadow-lg"
        />
        <LocationButton
          location="West Track"
          count={counts.West}
          className="bg-mustard border border-mustard-dark text-white hover:bg-mustard-dark shadow-lg"
        />
      </div>
    </>
  );
}
