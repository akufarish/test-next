"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { Barang } from "@/types/barang";
import { useState } from "react";

export type MapProps = {
  barang: Array<Barang>;
};

type positionType = {
  latitude: number;
  longtitude: number;
};

function SetViewOnClick({ latitude, longtitude }: positionType) {
  const map = useMap();
  map.setView([latitude, longtitude], map.getZoom());

  return null;
}

export default function Map({ barang }: MapProps) {
  const [position, setPosition] = useState<positionType>({
    latitude: -6.2088,
    longtitude: 106.8456,
  });

  const pindahPosisi = (data: Barang) => {
    console.log(position);
    setPosition({
      latitude: data.latitude,
      longtitude: data.longtitude,
    });
  };

  return (
    <>
      <MapContainer
        key={"a"}
        center={[position.latitude, position.longtitude]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-96"
      >
        <SetViewOnClick
          latitude={position.latitude}
          longtitude={position.longtitude}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
          position={[-6.2088, 106.8456]}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        {barang.map((data) => (
          <Marker
            key={data.nama}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
            position={[data.latitude, data.longtitude]}
          >
            <Popup>
              <h1>{data.nama}</h1>
              <p>{data.deskripsi}</p>
              <p>{data.lokasi}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <section className="flex flex-col gap-12">
        {barang.map((data) => (
          <button
            className="py-2 px-12 bg-red-500 text-white rounded-md w-40"
            onClick={() => pindahPosisi(data)}
            key={data.nama}
          >
            {data.nama}
          </button>
        ))}
      </section>
    </>
  );
}
