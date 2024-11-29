import React from "react";
import { SquareArrowOutUpRight } from "lucide-react";

import type { LayoffsItem } from "@/lib/type";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const month_str = month < 10 ? `0${month}` : `${month}`;
  const day = date.getDate();
  const day_str = day < 10 ? `0${day}` : `${day}`;
  return `${year}-${month_str}-${day_str}`;
};

const Description = ({ item }: { item: LayoffsItem }) => {
  return (
    <>
      {item.company}
      {item.employees ? <span>裁员约 <span className="underline">{item.employees}</span> 人, </span> : "裁员人数未知, "}
      {item.ratio ? `裁员比例约 ${item.ratio}%` : "裁员比例未知, "}
      {item.department ? `涉及部门：${item.department.join(", ")}` : "裁员部门未知"}
      <a href={item.source} target="_blank">
        <SquareArrowOutUpRight className="h-4 w-4" />
      </a>
    </>
  );
};

const Item = ({ item }: { item: LayoffsItem }) => {
  return (
    <div className="grid gap-1 text-sm relative">
      <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
      <div className="font-medium">{formatDate(item.date)}</div>
      <div className="flex flex-row gap-1 text-gray-500 dark:text-gray-400">
        <Description item={item} />
      </div>
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
