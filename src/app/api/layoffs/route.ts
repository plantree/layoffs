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
      return NextResponse.json(lists, {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
          "Vary": ":path",
        },
      });
    } catch (error) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
