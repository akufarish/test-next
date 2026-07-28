import type { Metadata } from "next";
import { MapPage } from "@/components/mapPage";
import { getBarang, importBarang } from "@/services/barang";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default async function Dashboard() {
  const dataBarang = await getBarang();

  return (
    <>
      <h1>Dashboard</h1>
      <form action={importBarang}>
        <input type="file" name="file" placeholder="file" />
        <button type="submit">Kirim</button>
      </form>
      <br />
      <MapPage barang={dataBarang} />
    </>
  );
}
