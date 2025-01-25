import { Model, useMap } from "@mappedin/react-sdk";
import React from "react";

//https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb

export function Goose() {
  const { mapData } = useMap();
  return (
    <Model
      models={mapData.getByType("space").map((space) => ({
        target: space,
        scale: [0.05, 0.05, 0.05],
        translate: [0, 0, 10],
        translation: [0, 0, 10],
        rotation: [90, 0, 0],
        opacity: 0.5,
      }))}
      options={{
        url: "/Goose_3D_Model.glb",
      }}
    />
  );
}
