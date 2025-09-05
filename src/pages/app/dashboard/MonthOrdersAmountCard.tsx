import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

import { getMonthOrdersAmount } from "@/api/GetMonthOrdersAmount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { MetricCardSkeleton } from "./MetricCardSkeleton";

export function MonthOrdersAmountCard() {
  const { data: monthOrderAmount, isError } = useQuery({
    queryKey: ["metrics", "month-orders-amount"],
    queryFn: getMonthOrdersAmount,
  });
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <Utensils className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent className="space-y-1">
        {isError ? (
          <div className="text-muted-foreground text-sm">
            Dados não disponíveis no momento
          </div>
        ) : monthOrderAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrderAmount.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-muted-foreground text-xs">
              {monthOrderAmount.diffFromLastMonth >= 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  {monthOrderAmount.diffFromLastMonth}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  {monthOrderAmount.diffFromLastMonth}%
                </span>
              )}
              em relação ao mês passado
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
