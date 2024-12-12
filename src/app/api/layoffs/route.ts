import { NextResponse } from "next/server";
import fs from "fs/promises";
import type { LayoffsItem } from "@/app/lib/type";

const cache = new Map<string, LayoffsItem[]>();
const files = await fs.readdir(process.cwd() + "/public/data/json");
for (const file of files) {
  const data = await fs.readFile(process.cwd() + "/public/data/json/" + file, "utf-8");
  cache.set(file.replace(".json", ""), JSON.parse(data));
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  if (date && cache.has(date)) {
    return NextResponse.json(cache.get(date), {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        },
      });
  } else {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
