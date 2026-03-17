import { Switch, Route } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import Auth from "@/pages/Auth";
import Checkout from "@/pages/Checkout";
import Orders from "@/pages/Orders";
import { CartProvider } from "@/hooks/useCart";

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-grow">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/menu" component={Menu} />
            <Route path="/auth" component={Auth} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route>404 Page Not Found</Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
