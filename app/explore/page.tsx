'use client';

import Link from 'next/link';
import { 
  ArrowRight, 
  Globe, 
  TrendingUp, 
  Package, 
  Shield, 
  Users, 
  BarChart3,
  Zap,
  Award,
  CheckCircle,
  DollarSign,
  Truck,
  Store,
  ShoppingBag,
  Target,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';

export default function ExplorePlatformPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />

      {/* Hero Section with Platform Overview */}
      <section className="bg-gws-navy text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-gws-gold/20 px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 mr-2 text-gws-gold" />
              <span className="text-gws-gold font-medium">AI-Powered B2B Platform</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Explore the Future of Wholesale Trading
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover how our innovative platform transforms the way businesses buy and sell wholesale merchandise globally
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-gws-gold text-gws-navy hover:bg-gws-darkgold">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" className="bg-gws-gold text-gws-navy hover:bg-gws-darkgold">
                  Watch Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gws-navy mb-4">
            Powerful Features for Modern Wholesale
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with industry expertise to deliver unmatched value
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card className="border border-gray-300">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-gws-gold to-gws-darkgold rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Global Marketplace</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Connect with verified suppliers and buyers from over 50 countries
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Multi-language support
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Currency conversion
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  International logistics
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="border border-gray-300">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-gws-gold to-gws-darkgold rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Smart Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                AI-driven insights to optimize your wholesale operations
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Predictive pricing
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Demand forecasting
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Performance metrics
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="border border-gray-300">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-gws-gold to-gws-darkgold rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Secure Trading</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Enterprise-grade security for all your transactions
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Escrow protection
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Verified suppliers
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Fraud prevention
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Feature 4 */}
          <Card className="border border-gray-300">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-gws-gold to-gws-darkgold rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Truck className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Smart Logistics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Streamlined shipping and fulfillment solutions
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Real-time tracking
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Automated routing
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Cost optimization
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Feature 5 */}
          <Card className="border border-gray-300">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-gws-gold to-gws-darkgold rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Package className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Product Discovery</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Advanced search and matching capabilities
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  AI-powered search
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Visual recognition
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Smart recommendations
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Feature 6 */}
          <Card className="border border-gray-300">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-gws-gold to-gws-darkgold rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Dynamic Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Competitive pricing with real-time market data
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Volume discounts
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Flash deals
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Price matching
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gws-navy text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              How GWS MerchantConnect Works
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Get started in minutes with our simple onboarding process
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-gws-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-gws-navy">1</span>
                  </div>
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gws-gold/30"></div>
                </div>
                <h3 className="font-semibold text-white mb-2">Sign Up</h3>
                <p className="text-sm text-gray-300">
                  Create your account and verify your business
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-gws-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-gws-navy">2</span>
                  </div>
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gws-gold/30"></div>
                </div>
                <h3 className="font-semibold text-white mb-2">Browse</h3>
                <p className="text-sm text-gray-300">
                  Explore products from verified suppliers
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-gws-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-gws-navy">3</span>
                  </div>
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gws-gold/30"></div>
                </div>
                <h3 className="font-semibold text-white mb-2">Negotiate</h3>
                <p className="text-sm text-gray-300">
                  Get best prices with bulk orders
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gws-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gws-navy">4</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Trade</h3>
                <p className="text-sm text-gray-300">
                  Complete secure transactions easily
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gws-navy mb-4">
            Explore Product Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Thousands of products across diverse categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { icon: Store, name: 'Electronics' },
            { icon: ShoppingBag, name: 'Apparel' },
            { icon: Package, name: 'Home Goods' },
            { icon: Target, name: 'Sports' },
            { icon: Award, name: 'Beauty' },
            { icon: Zap, name: 'Toys' },
          ].map((category, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-300 hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <category.icon className="h-8 w-8 text-gws-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-center text-sm font-medium text-gray-700">{category.name}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/register">
            <Button variant="outline" className="border-gws-navy text-gws-navy hover:bg-gws-navy hover:text-white">
              View All Categories <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="bg-gradient-to-br from-gws-navy to-gws-darknavy text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Platform Success Metrics
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Real results from real businesses using our platform
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-gws-gold mb-2">$50M+</div>
              <div className="text-blue-100">Monthly GMV</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gws-gold mb-2">15K+</div>
              <div className="text-blue-100">Active Buyers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gws-gold mb-2">500+</div>
              <div className="text-blue-100">Verified Suppliers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gws-gold mb-2">98%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-gws-gold to-gws-darkgold p-8 text-center">
              <h2 className="text-3xl font-bold text-gws-navy mb-4">
                See GWS MerchantConnect in Action
              </h2>
              <p className="text-gws-navy/80 mb-6">
                Watch how businesses transform their wholesale operations with our platform
              </p>
              <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gws-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-0 h-0 border-l-[30px] border-l-gws-navy border-t-[18px] border-t-transparent border-b-[18px] border-b-transparent ml-2"></div>
                  </div>
                  <p className="text-gray-600">Platform Demo Video</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-semibold text-gws-navy mb-4">Key Platform Benefits:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Reduce procurement costs by up to 40%</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Access exclusive closeout and liquidation deals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Streamline operations with AI-powered tools</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Scale your business with global reach</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gws-navy mb-4">
              Ready to Transform Your Wholesale Business?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of successful businesses already using GWS MerchantConnect
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-gws-navy text-white hover:bg-gws-darknavy">
                  Start Free 30-Day Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-gws-navy text-gws-navy">
                  Schedule a Demo
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              No credit card required • Setup in minutes • Cancel anytime
            </p>
          </div>
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