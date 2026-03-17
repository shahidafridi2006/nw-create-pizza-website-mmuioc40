import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/hooks/useCart";
import { useCreateOrder } from "@/hooks/useOrders";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingBag, MapPin, Phone, CreditCard } from "lucide-react";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        toast({ title: "Authentication required", description: "Please sign in to complete your order." });
        setLocation("/auth");
      }
    });
  }, [setLocation, toast]);

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button onClick={() => setLocation("/menu")}>Go to Menu</Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !phone) {
      toast({ variant: "destructive", title: "Missing information", description: "Please fill in all fields." });
      return;
    }

    createOrder({ items, address, phone, total }, {
      onSuccess: () => {
        toast({ title: "Order placed!", description: "Your pizza is being prepared." });
        clearCart();
        setLocation("/orders");
      },
      onError: (error: any) => {
        toast({ variant: "destructive", title: "Order failed", description: error.message });
      }
    });
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Delivery Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Input
                  id="address"
                  placeholder="Street address, Apartment, Suite"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-md bg-muted/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-background flex items-center justify-center border">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-xs text-muted-foreground">Pay when your pizza arrives</p>
                  </div>
                </div>
                <div className="h-4 w-4 rounded-full border-4 border-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <Button 
                className="w-full h-12 text-lg" 
                onClick={handleSubmit}
                disabled={isPending}
              >
                {isPending ? "Placing Order..." : "Place Order"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
