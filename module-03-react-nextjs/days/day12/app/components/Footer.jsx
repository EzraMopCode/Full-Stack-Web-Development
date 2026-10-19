import { Home, ShoppingBag, Heart, User, Compass } from "lucide-react";
import Link  from "next/link";


export default function Footer() {
     return (
          <section className="mobile-footer-nav">
               <nav>
                    <ul className="bottom-navbar">
                         <li>
                              <Link href="/" className="bottom-nav-link">
                                   <Home/><p>Home</p>
                              </Link>
                         </li>

                         <li>
                              <Link href="/menu" className="bottom-nav-link">
                                   <Compass/> <p>Explore</p>
                              </Link>
                         </li>

                         <li>
                              <Link href="/fevourites" className="bottom-nav-link">
                                   <Heart/><p>Favorites</p>
                              </Link>
                         </li>


                         <li>
                              <Link href="/order" className="bottom-nav-link">
                                   <ShoppingBag/><p>Orders</p>
                              </Link>
                         </li>
                         <li>
                              <Link href="/profile" className="bottom-nav-link">
                                   <User/><p>Profile</p>
                              </Link>
                         </li>
                    </ul>
               </nav>
          </section>
     )
}
