"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { Barang } from "@/types/barang";
import { useEffect, useState } from "react";
import Image from "next/image";

export type MapProps = {
  barang: Array<Barang>;
};

type positionType = {
  latitude: number;
  longtitude: number;
};

function SetViewOnClick({ latitude, longtitude }: positionType) {
  const map = useMap();
  useEffect(() => {
    map.closePopup();
    map.flyTo([latitude, longtitude], 13);
  }, [latitude, longtitude, map]);

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

  const [search, setSearch] = useState<string>("");

  const searchData = barang.filter((data) => {
    return search
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .every((datas) => data.nama.toLowerCase().includes(datas));
  });

  return (
    <>
      <section className="relative">
        <div className="absolute top-0 left-2/4 z-20 -translate-x-1/2 flex flex-col justify-center items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="w-52 px-2 h-12 bg-white rounded-md border border-gray-200"
            placeholder="cari"
          />
          <br />
          {search ? (
            <div className="w-52 h-44 bg-white rounded-md shadow-md mt-12">
              {searchData.map((data) => (
                <div onClick={() => pindahPosisi(data)} key={data.id}>
                  <h1 className="text-black">{data.nama}</h1>
                  <hr />
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
        <MapContainer
          key={"a"}
          center={[position.latitude, position.longtitude]}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-96 z-10 "
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
              <Popup autoPan={true} autoClose={true}>
                <h1>{data.nama}</h1>
                <p>{data.deskripsi}</p>
                <p>{data.lokasi}</p>
                <Image
                  width={50}
                  height={50}
                  src={`https://5b5c-2404-c0-c206-2f69-400a-f454-6e8d-fcad.ngrok-free.app/api/files/barang/${data.id}/${data.gambar}`}
                  alt={data.nama}
                />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </section>

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
