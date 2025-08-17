'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
                <Link href="/about" className="text-gray-600 hover:text-gws-navy">About</Link>
                <Link href="/services" className="text-gray-600 hover:text-gws-navy">Services</Link>
                <Link href="/contact" className="text-gws-navy font-medium">Contact</Link>
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
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300">
              We&apos;re here to help you grow your wholesale business. Reach out to our team today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center border border-gray-300">
              <CardHeader>
                <Phone className="h-8 w-8 text-gws-gold mx-auto mb-2" />
                <CardTitle className="text-lg">Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Sales: 1-800-GWS-SALE</p>
                <p className="text-gray-600">Support: 1-800-GWS-HELP</p>
              </CardContent>
            </Card>

            <Card className="text-center border border-gray-300">
              <CardHeader>
                <Mail className="h-8 w-8 text-gws-gold mx-auto mb-2" />
                <CardTitle className="text-lg">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">info@gws.com</p>
                <p className="text-gray-600">support@gws.com</p>
              </CardContent>
            </Card>

            <Card className="text-center border border-gray-300">
              <CardHeader>
                <MapPin className="h-8 w-8 text-gws-gold mx-auto mb-2" />
                <CardTitle className="text-lg">Office</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">123 Commerce St</p>
                <p className="text-gray-600">New York, NY 10001</p>
              </CardContent>
            </Card>

            <Card className="text-center border border-gray-300">
              <CardHeader>
                <Clock className="h-8 w-8 text-gws-gold mx-auto mb-2" />
                <CardTitle className="text-lg">Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Mon-Fri: 9AM-6PM EST</p>
                <p className="text-gray-600">24/7 Online Support</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="border-2 border-ring rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gws-navy mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us more about your needs..."
                  />
                </div>

                <Button type="submit" className="w-full bg-gws-navy hover:bg-gws-darknavy">
                  Send Message <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gws-navy mb-6">Why Contact GWS?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MessageSquare className="h-6 w-6 text-gws-gold mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Sales Inquiries</h3>
                    <p className="text-gray-600 text-sm">
                      Learn about our wholesale solutions, pricing plans, and how we can help scale your business.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MessageSquare className="h-6 w-6 text-gws-gold mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Partnership Opportunities</h3>
                    <p className="text-gray-600 text-sm">
                      Explore strategic partnerships, become a verified supplier, or join our network.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MessageSquare className="h-6 w-6 text-gws-gold mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Technical Support</h3>
                    <p className="text-gray-600 text-sm">
                      Get help with platform features, integrations, or technical issues.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MessageSquare className="h-6 w-6 text-gws-gold mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">General Questions</h3>
                    <p className="text-gray-600 text-sm">
                      Have questions about our services? We&apos;re here to provide answers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gws-gold/10 rounded-lg">
                <h3 className="font-semibold text-gws-navy mb-3">Quick Response Guarantee</h3>
                <p className="text-gray-600 text-sm">
                  We aim to respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call our support hotline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gws-navy text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-gws-navy mb-2">What are your minimum order quantities?</h3>
                <p className="text-gray-600">
                  Minimum order quantities vary by supplier and product category. Our SMB tier offers low MOQs 
                  suitable for small businesses, while enterprise solutions provide bulk ordering options.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-gws-navy mb-2">How do I become a verified supplier?</h3>
                <p className="text-gray-600">
                  Contact our partnership team through this form or email partners@gws.com. We&apos;ll guide you 
                  through our verification process and onboarding requirements.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-gws-navy mb-2">Do you offer international shipping?</h3>
                <p className="text-gray-600">
                  Yes, we provide comprehensive international shipping and logistics support, including 
                  customs clearance assistance for shipments to over 25 countries.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-gws-navy mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept wire transfers, ACH payments, major credit cards, and offer net payment terms 
                  for qualified enterprise accounts.
                </p>
              </div>
            </div>
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