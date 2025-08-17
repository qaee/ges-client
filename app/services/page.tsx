'use client';

import Link from 'next/link';
import { ArrowRight, Package, Truck, Shield, BarChart, Globe, Zap, HeadphonesIcon, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gws-navy text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">
              Our Services & Solutions
            </h1>
            <p className="text-xl text-gray-300">
              Comprehensive wholesale solutions designed to accelerate your business growth
            </p>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gws-navy text-center mb-12">Core Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-300">
              <CardHeader>
                <Package className="h-12 w-12 text-gws-gold mb-4" />
                <CardTitle className="text-xl">Product Sourcing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Access to extensive network of verified suppliers offering:
                </CardDescription>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Factory overruns & excess inventory</li>
                  <li>• Closeout and liquidation deals</li>
                  <li>• Branded merchandise</li>
                  <li>• Private label opportunities</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-gray-300">
              <CardHeader>
                <BarChart className="h-12 w-12 text-gws-gold mb-4" />
                <CardTitle className="text-xl">AI-Powered Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Leverage advanced technology for:
                </CardDescription>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Real-time inventory matching</li>
                  <li>• Predictive pricing models</li>
                  <li>• Demand forecasting</li>
                  <li>• Market trend analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-gray-300">
              <CardHeader>
                <Truck className="h-12 w-12 text-gws-gold mb-4" />
                <CardTitle className="text-xl">Logistics Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  End-to-end supply chain solutions:
                </CardDescription>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Automated logistics coordination</li>
                  <li>• International shipping</li>
                  <li>• Customs clearance assistance</li>
                  <li>• Warehousing solutions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gws-navy text-center mb-12">Tailored Solutions for Every Business</h2>
            
            <div className="space-y-8">
              {/* Tier 1 */}
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="flex items-start">
                  <div className="bg-gws-gold text-gws-navy rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-xl">T1</span>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-2xl font-bold text-gws-navy mb-2">Enterprise Solutions</h3>
                    <p className="text-gray-600 mb-4">
                      High-touch partnerships for large-scale retailers and distributors
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>✓ Dedicated account management</li>
                        <li>✓ Exclusive access to premium inventory</li>
                        <li>✓ Custom pricing structures</li>
                      </ul>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>✓ Priority fulfillment</li>
                        <li>✓ Advanced analytics dashboard</li>
                        <li>✓ API integration support</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tier 2 */}
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="flex items-start">
                  <div className="bg-gws-gold text-gws-navy rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-xl">T2</span>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-2xl font-bold text-gws-navy mb-2">Retail Partners</h3>
                    <p className="text-gray-600 mb-4">
                      Dynamic solutions for mid-size retailers and regional chains
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>✓ Access to liquidation deals</li>
                        <li>✓ Flexible ordering options</li>
                        <li>✓ Marketing support</li>
                      </ul>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>✓ Competitive bulk pricing</li>
                        <li>✓ Standard analytics tools</li>
                        <li>✓ Email & chat support</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tier 3 */}
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="flex items-start">
                  <div className="bg-gws-gold text-gws-navy rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-xl">T3</span>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-2xl font-bold text-gws-navy mb-2">SMB Resellers</h3>
                    <p className="text-gray-600 mb-4">
                      Empowering small businesses and online sellers
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>✓ Low minimum order quantities</li>
                        <li>✓ Marketplace integration tools</li>
                        <li>✓ Product listing assistance</li>
                      </ul>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>✓ Competitive reseller pricing</li>
                        <li>✓ Educational resources</li>
                        <li>✓ Community support forum</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gws-navy text-center mb-12">Value-Added Services</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center border border-gray-300 rounded-lg p-6">
              <Shield className="h-10 w-10 text-gws-gold mx-auto mb-3" />
              <h3 className="font-semibold text-gws-navy mb-2">Quality Assurance</h3>
              <p className="text-sm text-gray-600">Rigorous vetting of all suppliers and products</p>
            </div>
            <div className="text-center border border-gray-300 rounded-lg p-6">
              <FileCheck className="h-10 w-10 text-gws-gold mx-auto mb-3" />
              <h3 className="font-semibold text-gws-navy mb-2">Documentation</h3>
              <p className="text-sm text-gray-600">Complete paperwork and compliance support</p>
            </div>
            <div className="text-center border border-gray-300 rounded-lg p-6">
              <HeadphonesIcon className="h-10 w-10 text-gws-gold mx-auto mb-3" />
              <h3 className="font-semibold text-gws-navy mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Round-the-clock customer service</p>
            </div>
            <div className="text-center border border-gray-300 rounded-lg p-6">
              <Zap className="h-10 w-10 text-gws-gold mx-auto mb-3" />
              <h3 className="font-semibold text-gws-navy mb-2">Fast Processing</h3>
              <p className="text-sm text-gray-600">Quick order fulfillment and shipping</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="bg-gws-navy text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Industries We Serve</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gws-gold">Retail & E-commerce</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Department stores</li>
                  <li>• Online marketplaces</li>
                  <li>• Specialty retailers</li>
                  <li>• Discount chains</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gws-gold">Distribution</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Wholesale distributors</li>
                  <li>• Import/Export companies</li>
                  <li>• Regional suppliers</li>
                  <li>• Logistics providers</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gws-gold">Resellers</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Amazon FBA sellers</li>
                  <li>• eBay merchants</li>
                  <li>• Shopify store owners</li>
                  <li>• Social commerce sellers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-gws-gold to-gws-darkgold rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gws-navy mb-4">
            Ready to Scale Your Business?
          </h2>
          <p className="text-gws-navy/80 mb-8 max-w-2xl mx-auto">
            Join thousands of successful businesses leveraging our comprehensive wholesale solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-gws-navy text-white hover:bg-gws-darknavy">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-gws-navy text-gws-navy">
                Contact Sales
              </Button>
            </Link>
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