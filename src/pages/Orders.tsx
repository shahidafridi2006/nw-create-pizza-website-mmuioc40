import { useOrders } from "@/hooks/useOrders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { Clock, Package, Truck, CheckCircle2 } from "lucide-react";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "bg-yellow-500" },
  preparing: { label: "Preparing", icon: Package, color: "bg-blue-500" },
  out_for_delivery: { label: "Out for Delivery", icon: Truck, color: "bg-purple-500" },
  delivered: { label: "Delivered", icon: CheckCircle2, color: "bg-green-500" },
};

export default function Orders() {
  const { data: orders, isLoading } = useOrders();

  if (isLoading) {
    return (
      <div className="container py-12 space-y-6">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="h-48 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders?.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-lg">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
          <p className="text-muted-foreground">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders?.map((order) => {
            const status = statusConfig[order.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;

            return (
              <Card key={order.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">
                      Order #{order.id.slice(0, 8)}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                  <Badge className={`${status.color} text-white border-none`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {status.label}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-bold">Items</p>
                        <ul className="text-sm space-y-1">
                          {order.order_items?.map((item) => (
                            <li key={item.id} className="flex justify-between">
                              <span>{item.quantity}x {item.pizza?.name}</span>
                              <span className="text-muted-foreground">{formatPrice(item.price_at_time * item.quantity)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-bold">Delivery Address</p>
                        <p className="text-sm text-muted-foreground">{order.address}</p>
                        <p className="text-sm text-muted-foreground">{order.phone}</p>
                      </div>
                    </div>
                    <div className="border-t pt-4 flex justify-between items-center">
                      <span className="font-bold">Total Amount</span>
                      <span className="text-lg font-bold text-primary">{formatPrice(order.total_amount)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
