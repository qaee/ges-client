"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { productService } from "@/services/api";
import { Product } from "@/types";
import ProductImageGallery from "@/components/ProductImageGallery";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Package, 
  ShoppingCart, 
  TrendingDown, 
  Building, 
  Tag, 
  Boxes, 
  Calendar,
  Star,
  Truck,
  Shield,
  Info
} from "lucide-react";
import { toast } from "sonner";

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { user, isAuthenticated } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    if (params.id) {
      loadProduct(params.id as string);
    }
  }, [isAuthenticated, router, params.id]);

  const loadProduct = async (productId: string) => {
    try {
      setLoading(true);
      const data = await productService.getProductById(productId);
      setProduct(data);
    } catch (error) {
      toast.error("Failed to load product details");
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscount = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      ELECTRONICS: "bg-blue-500",
      FOOTWEAR: "bg-green-500", 
      APPAREL: "bg-purple-500",
      HOME_GOODS: "bg-orange-500",
      FURNITURE: "bg-red-500",
      ACCESSORIES: "bg-pink-500",
      GENERAL_MERCHANDISE: "bg-gray-500"
    };
    return colors[category as keyof typeof colors] || "bg-gray-500";
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "CLOSEOUT": return "🔥";
      case "OVERSTOCK": return "📦";
      case "FACTORY_OVERRUN": return "🏭";
      case "BRANDED": return "⭐";
      case "PRIVATE_LABEL": return "🏷️";
      default: return "📋";
    }
  };

  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Package className="h-16 w-16 text-gws-gold mx-auto mb-4 animate-pulse" />
              <p className="text-lg text-gray-600">Loading product details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 mb-2">Product Not Found</h2>
            <p className="text-gray-500 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/dashboard">
              <Button variant="gws">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-gws-navy to-gws-darknavy shadow-lg border-b border-gws-gold/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Image
                src="/logo_gws.png"
                alt="GWS Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="font-semibold text-lg text-white">MerchantConnect</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/90">
                Welcome, {user.firstName} {user.lastName}
              </span>
              <span className="text-xs bg-gws-gold text-gws-navy px-3 py-1 rounded-full font-semibold">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8">
          <Link href="/dashboard" className="text-gws-gold hover:text-gws-darkgold transition-colors">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/dashboard" className="text-gws-gold hover:text-gws-darkgold transition-colors">
            Products
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{product.name}</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Product Info */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-2 border-gws-gold/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-gws-navy to-gws-darknavy text-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{product.name}</CardTitle>
                    <div className="flex items-center space-x-3 mb-3">
                      <Badge className={`${getCategoryColor(product.category)} text-white`}>
                        {product.category}
                      </Badge>
                      <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                        {getTypeIcon(product.type)} {product.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                      {calculateDiscount(product.originalPrice, product.discountedPrice)}% OFF
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-8">
                {/* Product Image Gallery */}
                <div className="mb-6">
                  <ProductImageGallery 
                    images={product.images || []}
                    productName={product.name}
                  />
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gws-navy mb-4 flex items-center">
                    <Info className="h-5 w-5 mr-2" />
                    Product Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {product.description || "No description available for this product."}
                  </p>
                </div>

                {/* Product Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                      <Building className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">Brand</p>
                        <p className="text-lg font-semibold text-blue-900">{product.brand || "Generic"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                      <Tag className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-green-800">SKU</p>
                        <p className="text-lg font-semibold text-green-900">{product.sku || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                      <Boxes className="h-6 w-6 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium text-purple-800">Available Quantity</p>
                        <p className="text-lg font-semibold text-purple-900">{product.quantity} units</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
                      <ShoppingCart className="h-6 w-6 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium text-orange-800">Min Order</p>
                        <p className="text-lg font-semibold text-orange-900">{product.minOrderQuantity || 1} units</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-lg">
                    <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-green-800">Verified Merchant</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
                    <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-blue-800">Fast Shipping</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg">
                    <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-yellow-800">Quality Assured</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card className="bg-gradient-to-br from-gws-gold to-yellow-400 text-gws-navy border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <TrendingDown className="h-6 w-6 mr-2" />
                  Wholesale Pricing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm opacity-80">Original Price</p>
                    <p className="text-2xl font-bold line-through opacity-70">
                      {formatCurrency(product.originalPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Wholesale Price</p>
                    <p className="text-4xl font-bold">
                      {formatCurrency(product.discountedPrice)}
                    </p>
                  </div>
                  <div className="bg-gws-navy/10 p-3 rounded-lg">
                    <p className="text-sm font-semibold">
                      You Save: {formatCurrency(product.originalPrice - product.discountedPrice)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="border-2 border-gws-gold/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button className="w-full bg-gradient-to-r from-gws-gold to-yellow-500 hover:from-yellow-500 hover:to-gws-gold text-gws-navy font-bold text-lg py-6">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Request Quote
                  </Button>
                  <Button variant="outline" className="w-full border-gws-gold text-gws-navy hover:bg-gws-gold/10">
                    Contact Merchant
                  </Button>
                  <Button variant="ghost" className="w-full text-gws-navy">
                    Add to Watchlist
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Status Card */}
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-green-800">
                    {product.status === 'ACTIVE' ? 'Available Now' : product.status}
                  </span>
                </div>
                <p className="text-sm text-green-700">
                  This product is currently available for wholesale purchase.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}