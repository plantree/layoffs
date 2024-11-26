import React from "react";
import { SquareArrowOutUpRight } from "lucide-react";

import type { LayoffsItem } from "@/lib/type";

const Item = ({ item }: { item: LayoffsItem }) => {
  return (
    <div className="grid gap-1 text-sm relative">
      <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
      <div className="font-medium">{item.date.toDateString()}</div>
      <p className="flex flex-row gap-1 text-gray-500 dark:text-gray-400">
        {item.company} 裁员约{" "}
        <span className="underline">{item.employees}</span>人
        <a href={item.source}>
          <SquareArrowOutUpRight className="h-4 w-4" />
        </a>
      </p>
    </div>
  );
};

const Timeline = ({ layoffs }: { layoffs: LayoffsItem[] }) => {
  return (
    <div className="mt-8">
      <div className="after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 relative pl-6 after:left-0 grid gap-10 dark:after:bg-gray-400/20">
        {layoffs.map((item: LayoffsItem, index: number) => (
          <div key={index}>{Item({ item })}</div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
