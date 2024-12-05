"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Send } from "lucide-react";

import Timeline from "@/app/components/Timeline";

import type { LayoffsItem } from "@/app/lib/type";
import Link from "next/link";
import { useEffect, useState } from "react";

function Footer() {
  return (
    <footer className="bg-white m-4 dark:bg-gray-800">
      <div className="flex flex-col gap-2 md:flex-row-reverse w-full mx-auto max-w-screen-xl p-4 justify-between">
        <ul className="flex items-center justify-center text-sm font-medium text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/about" className="hover:underline me-4 md:me-6">
              关于
            </Link>
          </li>
            <li>
            <Link href="/changelog" className="hover:underline me-4 md:me-6">
              变更日志
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/plantree/layoffs-tracker"
              className="hover:underline">
              GitHub
            </Link>
          </li>
        </ul>
        <span className="text-sm text-center text-gray-500 dark:text-gray-400">
          © 2024-present{" "}
          <Link href="https://plantree.me/" className="hover:underline">
            Plantree
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex items-center space-x-4 mt-8">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export default function Home() {
  const [lists, setLists] = useState<string[]>();
  const [loadIndex, setLoadIndex] = useState(-1);
  const [layoffs, setLayoffs] = useState<LayoffsItem[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // 1. fetch lists
      const listsData = await fetch("/api/list").then((res) => res.json());
      listsData.sort().reverse();
      setLists(listsData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (lists) {
      loadMore();
    }
  }, [lists]);

  function canLoad() {
    return loadIndex < lists!.length - 1;
  }

  // 2. fetch layoffs
  async function loadMore() {
    if (canLoad()) {
      setLoading(true);
      const layoffsData = await fetch(
        `/api/layoffs?date=${lists![loadIndex + 1]}`
      ).then((res) => res.json());
      layoffsData.forEach((item: LayoffsItem) => {
        item.date = new Date(item.date);
      });
      setLayoffs([...(layoffs || []), ...layoffsData]);
      setLoadIndex(loadIndex + 1);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main
        className="flex-1  w-full mx-auto max-w-screen-xl p-4 justify-between"
        role="main">
        <div className="flex flex-row gap-4 mb-4">
          {" "}
          <h1 className="text-2xl font-bold my-auto inline-block">
            Layoffs Tracker
          </h1>
          <Button variant="outline" asChild>
            <Link href="https://github.com/plantree/layoffs-tracker/issues">
              <Send />
              我要提交 / 纠错
            </Link>
          </Button>
        </div>
        <h2 className="text font-semibold mb-8 text-gray-400">
          专注中国就业市场 (数据采集自互联网, 仅供参考)
        </h2>
        <Tabs defaultValue="list">
          <TabsList>
            <TabsTrigger value="list">列表</TabsTrigger>
            <TabsTrigger value="trend">趋势</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            {loadIndex === -1 ? (
              <LoadingSkeleton />
            ) : (
              <>
                <ListTab lists={layoffs!} />{" "}
                {loading ? (
                  <LoadingSkeleton />
                ) : (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={loadMore}
                    disabled={!canLoad()}>
                    {canLoad() ? "加载更多" : "到底啦~"}
                  </Button>
                )}
              </>
            )}
          </TabsContent>
          <TabsContent value="trend">
            <TrendTab />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}

function ListTab({ lists }: { lists: LayoffsItem[] }) {
  return (
    <div className="mt-4">
      <Timeline layoffs={lists} />
    </div>
  );
}

function TrendTab() {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">(稍后推出)</h2>
      <p>图表和分析内容（使用图表库实现，例如 Chart.js 或 Recharts）。</p>
    </div>
  );
}
