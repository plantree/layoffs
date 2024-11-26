import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';

import Timeline from "@/components/Timeline";

import type { LayoffsItem } from "@/lib/type";

export default function Home() {
  return (
    <main className="p-8">
      <div className="flex flex-row gap-4 mb-4">
        {" "}
        <h1 className="text-2xl font-bold my-auto inline-block">Layoffs Tracker</h1>
        <Button variant="outline"><Send />我要提交</Button>
      </div>

      <h2 className="text font-semibold mb-8 text-gray-400">
        专注中国就业市场
      </h2>
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">列表</TabsTrigger>
          <TabsTrigger value="trend">趋势</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <ListTab />
        </TabsContent>
        <TabsContent value="trend">
          <TrendTab />
        </TabsContent>
      </Tabs>
    </main>
  );
}

function ListTab() {
  // Mock 数据
  const lists: LayoffsItem[] = [
    {
      company: "Meta",
      employees: 11000,
      date: new Date("2023-01-15"),
      source: "https://example.com",
    },
    {
      company: "Google",
      employees: 12000,
      date: new Date("2023-03-10"),
      source: "https://example.com",
    },
  ];

  return (
    <div className="mt-4">
      <Timeline layoffs={lists} />
    </div>
  );
}

function TrendTab() {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">趋势分析</h2>
      <p>图表和分析内容（使用图表库实现，例如 Chart.js 或 Recharts）。</p>
    </div>
  );
}
