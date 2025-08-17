"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Package, TrendingUp, Users, Shield } from "lucide-react";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gws-navy text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Global Wholesale Sources Inc.
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Revolutionizing global trade by connecting buyers and sellers of high-quality, 
              discounted merchandise through our AI-powered B2B e-commerce platform
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/register">
                <Button size="lg" className="bg-gws-gold text-gws-navy hover:bg-gws-darkgold">
                  Start Trading <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/explore">
                <Button size="lg" className="bg-gws-gold text-gws-navy hover:bg-gws-darkgold">
                  Explore Platform <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gws-navy mb-12">
          Why Choose GWS MerchantConnect?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border border-gray-300">
            <CardHeader>
              <Package className="h-10 w-10 text-gws-gold mb-2" />
              <CardTitle>Closeout Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access factory overruns, excess inventory, and liquidation deals across diverse categories
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border border-gray-300">
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-gws-gold mb-2" />
              <CardTitle>AI-Driven Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Real-time inventory matching, predictive pricing, and automated logistics coordination
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border border-gray-300">
            <CardHeader>
              <Users className="h-10 w-10 text-gws-gold mb-2" />
              <CardTitle>Three-Tier Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Tailored solutions for enterprise retailers, all retailers, and SMB resellers
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border border-gray-300">
            <CardHeader>
              <Shield className="h-10 w-10 text-gws-gold mb-2" />
              <CardTitle>Secure Trading</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Protected transactions with verified merchants and secure payment processing
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Market Segments */}
      <section className="bg-gws-navy text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Serving All Market Segments
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gws-gold text-gws-navy rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-2xl">T1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enterprise Retailers</h3>
              <p className="text-gray-300">
                High-touch partnerships for bulk closeout purchases and exclusive access to branded inventory
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gws-gold text-gws-navy rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-2xl">T2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">All Retailers</h3>
              <p className="text-gray-300">
                Aggressive outreach for liquidation deals through dynamic digital campaigns
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gws-gold text-gws-navy rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-2xl">T3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">SMB Resellers</h3>
              <p className="text-gray-300">
                Empowering Amazon, Walmart, and Shopify sellers with discounted inventory
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-gws-gold to-gws-darkgold rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gws-navy mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-gws-navy/80 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses leveraging our platform to optimize costs, 
            scale profitability, and thrive in competitive markets
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-gws-navy text-white hover:bg-gws-darknavy">
              Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="mb-2">© 2025 Global Wholesale Sources Inc. All rights reserved.</p>
            <p className="text-gray-400 italic">
              &ldquo;Empowering Global Trade, One Deal at a Time.&rdquo;
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}