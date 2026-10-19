import Link from "next/link";
import Image from "next/image";
import { Menu } from 'lucide-react';

export default function Header() {
     return(
          <header>
               <div className="top-bar">
                    <Image className="icon-logo" src='/logo-main.png' width={60} height={60} alt="the addis eats brand logo"/>
                    <h1>Addis <span className="span-head">Eats</span></h1>
               </div>

          </header>
     )
}
