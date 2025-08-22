export type OrderStatusType =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

interface OrderStatusProps {
  status: OrderStatusType;
}

const orderStatusMap: Record<
  OrderStatusType,
  { value: string; color: string }
> = {
  pending: {
    value: "Pendente",
    color: "bg-slate-400",
  },
  canceled: {
    value: "Cancelado",
    color: "bg-rose-500",
  },
  processing: {
    value: "Em preparo",
    color: "bg-amber-500",
  },
  delivering: {
    value: "Em entrega",
    color: "bg-orange-500",
  },
  delivered: {
    value: "Entregue",
    color: "bg-emerald-500",
  },
};

export default function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        data-testid="badge"
        className={`h-2 w-2 rounded-full ${orderStatusMap[status].color}`}
      />
      <span className="text-muted-foreground font-medium">
        {orderStatusMap[status].value}
      </span>
    </div>
  );
}
