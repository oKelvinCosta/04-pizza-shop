import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

import { getDayOrdersAmount } from "@/api/GetDayOrdersAmount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { MetricCardSkeleton } from "./MetricCardSkeleton";

export function DayOrdersAmountCard() {
  const { data: dayOrderAmount, isPending } = useQuery({
    queryKey: ["metrics", "day-orders-amount"],
    queryFn: getDayOrdersAmount,
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent className="space-y-1">
        {dayOrderAmount && !isPending ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrderAmount.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-muted-foreground text-xs">
              {dayOrderAmount.diffFromYesterday >= 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  {dayOrderAmount.diffFromYesterday}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  {dayOrderAmount.diffFromYesterday}%
                </span>
              )}
              em relação a ontem
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
