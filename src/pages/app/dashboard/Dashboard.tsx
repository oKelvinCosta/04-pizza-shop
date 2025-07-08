import { DayOrdersAmountCard } from "./DayOrdersAmountCard";
import { MonthCanceledOrdersAmountCard } from "./MontCanceledOrdersAmount";
import { MonthOrdersAmountCard } from "./MonthOrdersAmountCard";
import { MonthRevenueCard } from "./MonthRevenueCard";
import PopularProductsChart from "./PopuplarProductsChart";
import RevenueChart from "./RevenueChart";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <MonthRevenueCard />
        <MonthOrdersAmountCard />
        <DayOrdersAmountCard />
        <MonthCanceledOrdersAmountCard />
      </div>

      <div className="grid grid-cols-9 gap-4">
        <RevenueChart />
        <PopularProductsChart />
      </div>
    </div>
  );
}
