import React from "react";
import { SquareArrowOutUpRight } from "lucide-react";

import type { LayoffsItem } from "@/lib/type";
import Link from "next/link";

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
      <span>
        {item.company},{" "}
        {item.headcount ? (
          <span>
            裁员约 <span className="underline">{item.headcount}</span> 人,{" "}
          </span>
        ) : (
          "裁员人数未知, "
        )}
        {item.percentage ? `裁员比例约 ${item.percentage}%, ` : "裁员比例未知, "}
        {item.department
          ? `涉及部门：${item.department.join(", ")}`
          : "裁员部门未知"}
      </span>
      <Link href={item.source}>
        <SquareArrowOutUpRight className="ml-1 h-4 w-4" />
      </Link>
    </>
  );
};

const Items = ({ items, date }: { items: LayoffsItem[]; date: string }) => {
  return (
    <div className="grid gap-1 text-sm relative">
      <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
      <div className="font-bold text-base text-gray-500">{date}</div>
      <ul className="mt-2 flex flex-col gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex flex-row ">
            {Description({ item })}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Timeline = ({ layoffs }: { layoffs: LayoffsItem[] }) => {
  // sort layoffs by date
  layoffs.sort((a, b) => a.date.getTime() - b.date.getTime());
  layoffs.reverse();
  // group layoffs by date
  const layoffsByDate: Record<string, LayoffsItem[]> = {};
  layoffs.forEach((item) => {
    const date = formatDate(item.date);
    if (!layoffsByDate[date]) {
      layoffsByDate[date] = [];
    }
    layoffsByDate[date].push(item);
  });

  return (
    <div className="mt-8">
      <div className="after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 relative pl-6 after:left-0 grid gap-10 dark:after:bg-gray-400/20">
        {Object.keys(layoffsByDate).map((date, index) => (
          <div key={index}>
            <Items items={layoffsByDate[date]} date={date} />
          </div>
        ))}
        {/* {layoffs.map((item: LayoffsItem, index: number) => (
          <div key={index}>{Item({ item })}</div>
        ))} */}
      </div>
    </div>
  );
};

export default Timeline;
