"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path ? "text-gws-navy font-medium" : "text-gray-600 hover:text-gws-navy";
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo_gws.png"
                alt="GWS Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="font-semibold text-lg">MerchantConnect</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className={isActive("/")}>Home</Link>
              <Link href="/about" className={isActive("/about")}>About</Link>
              <Link href="/services" className={isActive("/services")}>Services</Link>
              <Link href="/contact" className={isActive("/contact")}>Contact</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button variant="gws">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}