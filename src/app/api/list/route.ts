import { NextResponse } from "next/server";
import fs from "fs/promises";
import type { LayoffsItem } from "@/app/lib/type";

export async function GET() {
  const file = await fs.readFile(
    process.cwd() + "/src/data/json/list.json",
    "utf-8"
  );
  const lists: LayoffsItem[] = JSON.parse(file);
  return NextResponse.json(lists);
}
