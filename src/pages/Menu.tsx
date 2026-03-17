import { useState } from "react";
import { usePizzas } from "@/hooks/usePizzas";
import { PizzaCard } from "@/components/PizzaCard";
import { Button } from "@/components/ui/button";
import { PizzaCategory } from "@/types";

const categories: { label: string; value: PizzaCategory }[] = [
  { label: "All Pizzas", value: "all" },
  { label: "Classic", value: "classic" },
  { label: "Veggie", value: "veggie" },
  { label: "Premium", value: "premium" },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<PizzaCategory>("all");
  const { data: pizzas, isLoading } = usePizzas(activeCategory);

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          From traditional favorites to gourmet creations, every pizza is handcrafted and baked to perfection in our wood-fired oven.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={activeCategory === cat.value ? "default" : "outline"}
            onClick={() => setActiveCategory(cat.value)}
            className="rounded-full px-6"
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-[400px] rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pizzas?.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>
      )}

      {!isLoading && pizzas?.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No pizzas found in this category.</p>
        </div>
      )}
    </div>
  );
}
