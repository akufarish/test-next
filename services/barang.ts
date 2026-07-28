"use server";

import { initPocketBase } from "@/lib/pocketbase";
import { Barang } from "@/types/barang";
import * as XLSX from "xlsx";

export async function importBarang(formdata: FormData) {
  const file = formdata.get("file") as File;
  console.log(file);
  const excel = XLSX.read(await file.arrayBuffer());
  const rawData = XLSX.utils.sheet_to_json(excel.Sheets[excel.SheetNames[0]], {
    header: 1,
  });
  rawData.splice(0, 1);
  console.log(rawData);

  const finalData: Array<Barang> = rawData.map((data: any) => ({
    nama: data[1],
    deskripsi: data[2],
    lokasi: data[3],
    latitude: data[4],
    longtitude: data[5],
  }));

  console.log(finalData);

  const pb = await initPocketBase();
  const batch = pb.createBatch();

  for (const data of finalData) {
    batch.collection("barang").create(data);
  }

  const result = await batch.send();
  console.log(result);
}

export async function getBarang() {
  const pb = await initPocketBase();
  const data = await pb.collection("barang").getList<Barang>();
  console.log(data);
  // data.items.map(barang => )
  return data.items;
}
