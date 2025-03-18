"use client";

import React from "react";
import Mappedin, { useMap } from "@mappedin/react-sdk";
import Image from "next/image";
import { PeopleChip } from "../ui/chip";
import { ArrowRight, X } from "lucide-react";
import { useSymposiumCounts } from "@/lib/utils/useSymposiumCounts";

export default function MenuDesktop() {
  const { mapView } = useMap();
  const counts = useSymposiumCounts();

  function go(coordinate: Mappedin.Coordinate) {
    mapView.Camera.focusOn(coordinate);
  }
  return (
    <div className="absolute top-4 left-4 right-4 z-50 flex h-[70px] gap-2 p-4 p-6  border rounded-full bg-[#F4EFE3] border-[#D0CABA] shadow-lg items-center justify-between">
      <div className="flex gap-3 items-center">
        <div className="flex gap-1 items-center">
          <Image
            src={"/SocraticaLogo.png"}
            width={50}
            height={50}
            alt="Socratica logo"
          />
          <h1
            className="font-times font-normal"
            style={{
              fontFamily: "Times New Roman, Times, serif",
              fontSize: "24px",
            }}
          >
            Socratica
          </h1>
        </div>
        <X />
        <h1 className="text-[24px]">FlockFindr</h1>
      </div>

      <div className="flex gap-8 items-center">
        <div className="flex gap-2 items-center">
          <PeopleChip count={counts.Activity} primaryColor="orange" />
          <p className="font-medium">Hockey Rink</p>
          <ArrowRight
            onClick={() =>
              go(new Mappedin.Coordinate(43.47136597, -80.5452103))
            }
          />
        </div>
        <div className="flex gap-2 items-center">
          <PeopleChip count={counts.East} primaryColor="blue" />
          <p className="font-medium">Basketball Arena</p>
          <ArrowRight
            onClick={() => go(new Mappedin.Coordinate(43.4703, -80.5405))}
          />
        </div>
      </div>
    </div>
  );
}
