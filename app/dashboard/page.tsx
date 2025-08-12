"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { productService } from "@/services/api";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Package, Search, LogOut, ShoppingCart, TrendingUp, DollarSign } from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    loadProducts();
  }, [isAuthenticated, router]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getActiveProducts();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadProducts();
      return;
    }
    
    try {
      setLoading(true);
      const data = await productService.searchProducts(searchQuery);
      setProducts(data);
    } catch (error) {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const calculateDiscount = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  if (!user) return null;

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
              <Button variant="ghost" className="text-white hover:bg-white/10" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Total Products</CardTitle>
              <Package className="h-5 w-5 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{products.length}</div>
              <p className="text-xs text-white/70">Available for trading</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Categories</CardTitle>
              <ShoppingCart className="h-5 w-5 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">7</div>
              <p className="text-xs text-white/70">Product categories</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Avg Discount</CardTitle>
              <TrendingUp className="h-5 w-5 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">35%</div>
              <p className="text-xs text-white/70">Below retail price</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gws-gold to-yellow-500 text-gws-navy border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gws-navy/90">Your Tier</CardTitle>
              <DollarSign className="h-5 w-5 text-gws-navy" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{user.tier.replace('TIER', 'T').replace('_', ' ')}</div>
              <p className="text-xs text-gws-navy/70">Membership level</p>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Card className="mb-8 bg-gradient-to-r from-white to-blue-50 border border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gws-navy to-gws-darknavy text-white rounded-t-lg">
            <CardTitle className="text-xl">🔍 Search Products</CardTitle>
            <CardDescription className="text-white/80">Find closeout deals and discounted merchandise</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex space-x-3">
              <Input
                placeholder="Search by name, brand, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="border-2 border-gws-gold/30 focus:border-gws-gold focus:ring-gws-gold/20 text-lg py-3"
              />
              <Button onClick={handleSearch} variant="gws" className="px-6 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Search className="h-5 w-5 mr-2" /> Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No products found</p>
            </div>
          ) : (
            products.map((product) => (
              <Card key={product.id} className="bg-white border border-gray-200 hover:shadow-2xl hover:border-gws-gold/50 transition-all duration-300 hover:scale-105 group">
                <CardHeader>
                  <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg mb-4 flex items-center justify-center group-hover:from-gws-gold/20 group-hover:to-yellow-100 transition-all duration-300">
                    <Package className="h-12 w-12 text-gws-gold group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="line-clamp-1 text-gws-navy group-hover:text-gws-darknavy">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2 text-gray-600 text-xs">
                    {product.description || "No description available"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-blue-600">Brand</span>
                    <span className="text-sm font-semibold text-gray-800">{product.brand || "Generic"}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-green-600">Category</span>
                    <span className="text-sm font-semibold text-gray-800">{product.category}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-purple-600">Quantity</span>
                    <span className="text-sm font-semibold text-gray-800">{product.quantity} units</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500 line-through">
                          ${product.originalPrice}
                        </p>
                        <p className="text-xl font-bold text-gws-gold">
                          ${product.discountedPrice}
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                        {calculateDiscount(product.originalPrice, product.discountedPrice)}% OFF
                      </div>
                    </div>
                  </div>
                  <Link href={`/products/${product.id}`}>
                    <Button className="w-full mt-4 bg-gradient-to-r from-gws-gold to-yellow-500 hover:from-yellow-500 hover:to-gws-gold text-gws-navy font-semibold shadow-lg hover:shadow-xl transition-all duration-300" variant="gws">
                      🛒 View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}