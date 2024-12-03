import { NextResponse } from "next/server";
import fs from "fs/promises";
import type { LayoffsItem } from "@/app/lib/type";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = searchParams.get("date");
  if (data) {
    const file = process.cwd() + "/src/data/json/" + data + ".json";
    try {
      await fs.access(file);
      const lists: LayoffsItem[] = JSON.parse(await fs.readFile(file, "utf-8"));
      return NextResponse.json(lists);
    } catch (error) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
