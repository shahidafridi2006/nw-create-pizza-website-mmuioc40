import { Pizza } from "@/types";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { Plus } from "lucide-react";

interface PizzaCardProps {
  pizza: Pizza;
}

export function PizzaCard({ pizza }: PizzaCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden group transition-all hover:shadow-xl border-none bg-card/50 backdrop-blur-sm">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={pizza.image_url}
          alt={pizza.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider bg-primary text-white rounded-full">
            {pizza.category}
          </span>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{pizza.name}</h3>
          <span className="text-primary font-bold">{formatPrice(pizza.price)}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {pizza.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full gap-2" 
          variant="secondary"
          onClick={() => addToCart(pizza)}
        >
          <Plus className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
