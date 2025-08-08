import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

import { getMonthCanceledOrdersAmount } from "@/api/GetMonthCanceledOrdersAmount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { MetricCardSkeleton } from "./MetricCardSkeleton";

export function MonthCanceledOrdersAmountCard() {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryKey: ["metrics", "month-canceled-orders-amount"],
    queryFn: getMonthCanceledOrdersAmount,
  });
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthCanceledOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrdersAmount.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-muted-foreground text-xs">
              {monthCanceledOrdersAmount.diffFromLastMonth < 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  {monthCanceledOrdersAmount.diffFromLastMonth}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  {monthCanceledOrdersAmount.diffFromLastMonth}%
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
