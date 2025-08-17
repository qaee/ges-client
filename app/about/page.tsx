'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Target, Award, Globe, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
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
                <span className="font-semibold text-lg">GWS MerchantConnect</span>
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link href="/" className="text-gray-600 hover:text-gws-navy">Home</Link>
                <Link href="/about" className="text-gws-navy font-medium">About</Link>
                <Link href="/services" className="text-gray-600 hover:text-gws-navy">Services</Link>
                <Link href="/contact" className="text-gray-600 hover:text-gws-navy">Contact</Link>
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

      {/* Hero Section */}
      <section className="bg-gws-navy text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">
              About Global Wholesale Solutions
            </h1>
            <p className="text-xl text-gray-300">
              Pioneering the future of wholesale trade through innovative technology and global partnerships
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gws-navy mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded with a vision to revolutionize global trade, Global Wholesale Solutions has emerged as a leading 
                B2B e-commerce platform connecting buyers and sellers of high-quality, discounted merchandise worldwide.
              </p>
              <p className="text-gray-600 mb-4">
                Our AI-powered platform streamlines the wholesale process, making it easier for businesses of all sizes 
                to access factory overruns, excess inventory, and liquidation deals across diverse product categories.
              </p>
              <p className="text-gray-600">
                From enterprise retailers to SMB resellers, we provide tailored solutions that help businesses optimize 
                costs, scale profitability, and thrive in competitive markets.
              </p>
            </div>
            <div className="bg-gws-navy text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">By the Numbers</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Active Suppliers</span>
                  <span className="font-bold">500+</span>
                </div>
                <div className="flex justify-between">
                  <span>Product Categories</span>
                  <span className="font-bold">50+</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Transactions</span>
                  <span className="font-bold">10,000+</span>
                </div>
                <div className="flex justify-between">
                  <span>Countries Served</span>
                  <span className="font-bold">25+</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer Satisfaction</span>
                  <span className="font-bold">98%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg">
                <Target className="h-12 w-12 text-gws-gold mb-4" />
                <h3 className="text-2xl font-bold text-gws-navy mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To democratize access to wholesale markets by providing a transparent, efficient, and secure platform 
                  that connects global suppliers with businesses seeking quality products at competitive prices.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg">
                <Award className="h-12 w-12 text-gws-gold mb-4" />
                <h3 className="text-2xl font-bold text-gws-navy mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To become the world&apos;s most trusted B2B marketplace, empowering businesses to grow and succeed 
                  through innovative technology, strategic partnerships, and exceptional service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gws-navy text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center border border-gray-300 rounded-lg p-6">
              <div className="bg-gws-gold/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-10 w-10 text-gws-gold" />
              </div>
              <h3 className="text-xl font-semibold text-gws-navy mb-2">Global Reach</h3>
              <p className="text-gray-600">
                Connecting businesses across continents to create opportunities for growth and expansion.
              </p>
            </div>
            <div className="text-center border border-gray-300 rounded-lg p-6">
              <div className="bg-gws-gold/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-gws-gold" />
              </div>
              <h3 className="text-xl font-semibold text-gws-navy mb-2">Partnership</h3>
              <p className="text-gray-600">
                Building lasting relationships with our clients based on trust, transparency, and mutual success.
              </p>
            </div>
            <div className="text-center border border-gray-300 rounded-lg p-6">
              <div className="bg-gws-gold/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Award className="h-10 w-10 text-gws-gold" />
              </div>
              <h3 className="text-xl font-semibold text-gws-navy mb-2">Excellence</h3>
              <p className="text-gray-600">
                Committed to delivering exceptional quality in every aspect of our platform and services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gws-navy text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Leadership Team</h2>
            <p className="text-gray-300 mb-8">
              Led by industry veterans with decades of experience in e-commerce, logistics, and global trade, 
              our team is dedicated to revolutionizing the wholesale marketplace.
            </p>
            <p className="text-gray-300">
              Our diverse team of professionals brings together expertise in technology, supply chain management, 
              customer service, and international business to deliver unparalleled value to our clients.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-gws-gold to-gws-darkgold rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gws-navy mb-4">
            Join Our Growing Network
          </h2>
          <p className="text-gws-navy/80 mb-8 max-w-2xl mx-auto">
            Become part of the GWS community and unlock new opportunities for your business
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