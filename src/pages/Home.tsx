import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PizzaCard } from "@/components/PizzaCard";
import { usePizzas } from "@/hooks/usePizzas";
import { ChevronRight, Star, Clock, Truck } from "lucide-react";

export default function Home() {
  const { data: pizzas, isLoading } = usePizzas();
  const featuredPizzas = pizzas?.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden hero-gradient">
        <div className="container relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              The Best <span className="text-primary">Pizza</span> In Your Neighborhood
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Experience the authentic taste of wood-fired pizza made with premium ingredients and traditional recipes. Delivered hot to your doorstep.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/menu">
                <Button size="lg" className="h-14 px-8 text-lg font-bold">
                  Order Now
                </Button>
              </Link>
              <Link href="/menu">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold">
                  View Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 hidden lg:block">
          <img 
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1200" 
            alt="Delicious Pizza"
            className="rounded-l-full shadow-2xl transform rotate-12 translate-x-20"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Premium Quality</h3>
              <p className="text-muted-foreground">We use only the finest imported Italian flour and fresh local ingredients.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Fast Preparation</h3>
              <p className="text-muted-foreground">Our wood-fired ovens reach 900°F, cooking your pizza to perfection in 90 seconds.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Hot Delivery</h3>
              <p className="text-muted-foreground">Our specialized delivery bags ensure your pizza arrives as hot as it left the oven.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-20">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Choices</h2>
              <p className="text-muted-foreground">Our customers' most loved wood-fired pizzas.</p>
            </div>
            <Link href="/menu">
              <Button variant="ghost" className="gap-2">
                View Full Menu <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-[400px] rounded-lg bg-muted animate-pulse" />
              ))
            ) : (
              featuredPizzas?.map((pizza) => (
                <PizzaCard key={pizza.id} pizza={pizza} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
