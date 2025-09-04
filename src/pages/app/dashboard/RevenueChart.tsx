import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";

import { getDailyRevenueInPeriod } from "@/api/GetDailyRevenueInPeriod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import type { DateRange } from "react-day-picker";

// const data = [
//   { date: "10/12", revenue: 1200 },
//   { date: "11/12", revenue: 800 },
//   { date: "12/12", revenue: 900 },
//   { date: "13/12", revenue: 400 },
//   { date: "14/12", revenue: 2300 },
//   { date: "15/12", revenue: 800 },
//   { date: "16/12", revenue: 640 },
// ];

export default function RevenueChart() {
  // By default, get current date and subtract 7 days
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const {
    data: dailyRevenueInPeriod,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["metrics", "daily-receipt-in-period", dateRange],
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  });

  const chartData = useMemo(() => {
    if (!dailyRevenueInPeriod || !Array.isArray(dailyRevenueInPeriod)) {
      console.error("Invalid dailyRevenueInPeriod data:", dailyRevenueInPeriod);
      return [];
    }

    return dailyRevenueInPeriod.map((chartItem) => ({
      date: chartItem.date,
      receipt: chartItem.receipt / 100,
    }));
  }, [dailyRevenueInPeriod]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center text-red-500">
        Error loading revenue data
      </div>
    );
  }

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div className="flex">
          <Label>Período</Label>
          <DateRangePicker
            date={dateRange}
            onDateChange={setDateRange}
            className="ml-2"
          />
        </div>
      </CardHeader>
      <CardContent>
        {dailyRevenueInPeriod ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }
              />
              <Line
                stroke={colors.violet[500]}
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
              />
              <CartesianGrid vertical={false} stroke="#ffffff3a" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
