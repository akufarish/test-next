"use client";

import { MapProps } from "@/components/map";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/map"), {
  ssr: false,
});

export function MapPage({ barang }: MapProps) {
  return (
    <>
      <MapComponent barang={barang} />
    </>
  );
}
