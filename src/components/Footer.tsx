import { Pizza as PizzaIcon, Instagram, Twitter, Facebook } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <PizzaIcon className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold tracking-tight">NOVA PIZZA</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Crafting the finest wood-fired pizzas with love and the freshest ingredients since 2024.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/menu" className="hover:text-primary">Our Menu</Link></li>
              <li><Link href="/orders" className="hover:text-primary">Track Order</Link></li>
              <li><Link href="/auth" className="hover:text-primary">My Account</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>123 Pizza Lane, Dough City</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: hello@novapizza.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2024 Nova Pizza. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
