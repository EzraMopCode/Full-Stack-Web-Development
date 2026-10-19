import  Link  from "next/link";
import "./globals.css";
import { ShoppingCart } from "lucide-react";

export default function Page() {
     return(
          <main className="home-content">
               <h1>Real Ethiopian Food, <span className="second-text">Made Fresh.</span></h1>
               <p className="head-text">Authentic Ethiopian dishes made with fresh, local ingredients and delivered to your table.</p>
               <Link className="btn-main" href='/menu'>Explore Our Foods</Link>
          </main>
     )
}
