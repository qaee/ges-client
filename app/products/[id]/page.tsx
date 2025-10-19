"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { productService } from "@/services/api";
import { Product, ProductVariant } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Package,
  Star,
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { user, isAuthenticated } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [mainImage, setMainImage] = useState<string>("");
  const [showRawJson, setShowRawJson] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

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
      const data = await productService.getMerchantProductById(productId);
      console.log("Loaded product data:", data);
      console.log("Product name:", data?.name);
      console.log("Product price:", data?.discountedPrice);
      console.log("Product category:", data?.category);
      console.log("Product type:", data?.type);

      if (!data) {
        throw new Error("No product data received");
      }

      setProduct(data);

      // Set initial main image
      if (data.images && data.images.length > 0) {
        const primaryIndex = data.primaryImageIndex || 0;
        setMainImage(data.images[primaryIndex] || data.images[0]);
      }

      // If product has variants, select the first one by default
      if (data.variantType === 'PARENT' && data.variants && data.variants.length > 0) {
        const firstVariant = data.variants[0];
        setSelectedVariant(firstVariant);
        setSelectedAttributes(firstVariant.attributes || {});

        // Set variant image if available
        if (firstVariant.images && firstVariant.images.length > 0) {
          setMainImage(firstVariant.images[firstVariant.primaryImageIndex || 0] || firstVariant.images[0]);
        }
      }
    } catch (error: any) {
      console.error("Failed to load product:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to load product details";
      toast.error(errorMessage);
      setTimeout(() => router.push("/dashboard"), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleAttributeChange = (attributeName: string, value: string) => {
    const newAttributes = { ...selectedAttributes, [attributeName]: value };
    setSelectedAttributes(newAttributes);

    // Find matching variant
    if (product?.variants) {
      const matchingVariant = product.variants.find(variant => {
        if (!variant.attributes) return false;
        return Object.keys(newAttributes).every(
          key => variant.attributes![key] === newAttributes[key]
        );
      });

      if (matchingVariant) {
        setSelectedVariant(matchingVariant);

        // Update image if variant has specific images
        if (matchingVariant.images && matchingVariant.images.length > 0) {
          setMainImage(matchingVariant.images[matchingVariant.primaryImageIndex || 0] || matchingVariant.images[0]);
        }
      }
    }
  };

  const formatPrice = (price: number | undefined) => {
    if (!price) return "$0.00";
    return `$${price.toFixed(2)}`;
  };

  const getImageUrl = (url: string) => {
    if (!url) return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";
    if (url.startsWith('http')) return url;
    if (url.startsWith('/api/')) return url;
    return `/api${url}`;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    // Prevent infinite loop by checking if we're already showing the placeholder
    if (!target.src.startsWith('data:image/svg+xml')) {
      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";
    }
  };

  const openLightbox = (imageUrl: string) => {
    const availableImages = selectedVariant?.images && selectedVariant.images.length > 0
      ? selectedVariant.images
      : product?.images || [];

    const index = availableImages.findIndex(img => img === imageUrl);
    setLightboxImageIndex(index >= 0 ? index : 0);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    const availableImages = selectedVariant?.images && selectedVariant.images.length > 0
      ? selectedVariant.images
      : product?.images || [];

    setLightboxImageIndex((prev) => (prev + 1) % availableImages.length);
  };

  const previousImage = () => {
    const availableImages = selectedVariant?.images && selectedVariant.images.length > 0
      ? selectedVariant.images
      : product?.images || [];

    setLightboxImageIndex((prev) => (prev - 1 + availableImages.length) % availableImages.length);
  };

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxOpen) {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [lightboxOpen]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Package className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-pulse" />
              <p className="text-lg text-gray-600">Loading product details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 mb-2">Product Not Found</h2>
            <Link href="/dashboard">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get available images (product or variant)
  const availableImages = selectedVariant?.images && selectedVariant.images.length > 0
    ? selectedVariant.images
    : product.images || [];

  // Get current price and quantity
  const currentPrice = selectedVariant?.discountedPrice || product.discountedPrice;
  const currentOriginalPrice = selectedVariant?.originalPrice || product.originalPrice;
  const currentQuantity = selectedVariant?.quantity !== undefined ? selectedVariant.quantity : product.quantity;

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Debug Panel */}
      <div className="container mx-auto px-4 py-2">
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-xs">
          <strong>DEBUG:</strong> Name: {product.name || 'NULL'} |
          Price: {String(product.discountedPrice) || 'NULL'} |
          Category: {product.category || 'NULL'} |
          Type: {product.type || 'NULL'} |
          VariantType: {product.variantType || 'NULL'}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Main Product Layout - Amazon Style */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Column - Images (Amazon style with vertical thumbnails) */}
          <div className="md:col-span-5">
            <div className="flex gap-4">
              {/* Vertical Thumbnails */}
              {availableImages.length > 1 && (
                <div className="flex flex-col gap-2 w-16">
                  {availableImages.map((img, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <button
                        onClick={() => setMainImage(img)}
                        className={`border-2 rounded overflow-hidden hover:border-blue-500 transition ${
                          mainImage === img ? 'border-blue-500' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={getImageUrl(img)}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-16 object-cover"
                          onError={handleImageError}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Main Image */}
              <div className="flex-1 border rounded-lg overflow-hidden bg-gray-50 relative group cursor-pointer"
                   onClick={() => openLightbox(mainImage || availableImages[0])}>
                <img
                  src={getImageUrl(mainImage || availableImages[0])}
                  alt={product.name}
                  className="w-full h-auto object-contain"
                  style={{ minHeight: '400px', maxHeight: '600px' }}
                  onError={handleImageError}
                />
                {/* Zoom overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                  <ZoomIn className="h-12 w-12 text-white opacity-0 group-hover:opacity-80 transition-opacity" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info (Amazon style) */}
          <div className="md:col-span-7">
            {/* Brand */}
            {product.brand && (
              <Link href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Visit the {product.brand} Store
              </Link>
            )}

            {/* Product Title */}
            <h1 className="text-2xl font-normal mt-1 mb-2">
              {product.name}
            </h1>

            {/* Rating (Mock for now) */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[1,2,3,4,5].map(star => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-blue-600">4.5</span>
              <span className="text-sm text-gray-600">|</span>
              <button className="text-sm text-blue-600 hover:text-blue-800">Search this page</button>
            </div>

            <div className="border-t border-b py-3 mb-4">
              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-normal">{formatPrice(currentPrice)}</span>
                {currentOriginalPrice && currentOriginalPrice > currentPrice && (
                  <>
                    <span className="text-sm text-gray-600 line-through">
                      {formatPrice(currentOriginalPrice)}
                    </span>
                    <Badge variant="destructive" className="ml-2">
                      {Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)}% OFF
                    </Badge>
                  </>
                )}
              </div>

              {/* Additional info */}
              <div className="text-sm text-gray-600 mt-1">
                <span className="text-blue-600">FREE Returns</span>
              </div>
            </div>

            {/* Variant Selectors - Amazon Style */}
            {product.variantType === 'PARENT' && product.variantOptions && (
              <div className="space-y-4 mb-6">
                {Object.entries(product.variantOptions).map(([attributeName, values]) => {
                  const displayName = attributeName.charAt(0).toUpperCase() + attributeName.slice(1);
                  const selectedValue = selectedAttributes[attributeName];

                  // Check if this is a color attribute (show as swatches)
                  const isColorAttribute = attributeName.toLowerCase().includes('color');

                  return (
                    <div key={attributeName}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-sm">{displayName}:</span>
                        <span className="text-sm">{selectedValue || 'Select'}</span>
                      </div>

                      {isColorAttribute ? (
                        /* Color Swatches - Amazon Style */
                        <div className="flex flex-wrap gap-2">
                          {values.map((value) => {
                            // Find variant with this color to show price
                            const variantWithThisValue = product.variants?.find(v =>
                              v.attributes && v.attributes[attributeName] === value
                            );
                            const isSelected = selectedValue === value;

                            return (
                              <button
                                key={value}
                                onClick={() => handleAttributeChange(attributeName, value)}
                                className={`border-2 rounded-lg p-2 hover:border-blue-500 transition ${
                                  isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
                                }`}
                                style={{ minWidth: '80px' }}
                              >
                                {variantWithThisValue?.images && variantWithThisValue.images[0] ? (
                                  <img
                                    src={getImageUrl(variantWithThisValue.images[0])}
                                    alt={value}
                                    className="w-full h-16 object-cover rounded mb-1"
                                    onError={handleImageError}
                                  />
                                ) : (
                                  <div className="w-full h-16 bg-gray-200 rounded mb-1 flex items-center justify-center">
                                    <Package className="h-6 w-6 text-gray-400" />
                                  </div>
                                )}
                                <div className="text-xs font-semibold">{formatPrice(variantWithThisValue?.discountedPrice || 0)}</div>
                                <div className="text-xs text-gray-600">{value}</div>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        /* Size/Other Buttons - Amazon Style */
                        <div className="flex flex-wrap gap-2">
                          {values.map((value) => {
                            const isSelected = selectedValue === value;

                            return (
                              <button
                                key={value}
                                onClick={() => handleAttributeChange(attributeName, value)}
                                className={`px-4 py-2 border rounded-lg hover:border-blue-500 transition ${
                                  isSelected
                                    ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50'
                                    : 'border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                <span className="font-medium">{value}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Selected Variant Info */}
                {selectedVariant && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                    <div className="font-semibold text-blue-900 mb-1">Selected Variant</div>
                    <div className="text-blue-800">
                      {selectedVariant.sku && <div>SKU: {selectedVariant.sku}</div>}
                      {selectedVariant.quantity !== undefined && (
                        <div>Available: {selectedVariant.quantity} units</div>
                      )}
                      {selectedVariant.minOrderQuantity && (
                        <div>Min Order: {selectedVariant.minOrderQuantity} units</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Stock Status */}
            {currentQuantity !== undefined && (
              <div className={`text-lg mb-4 ${currentQuantity > 0 ? 'text-green-700' : 'text-red-700'}`}>
                {currentQuantity > 0 ? `In Stock (${currentQuantity} units available)` : 'Out of Stock'}
              </div>
            )}

            {/* Product Metadata */}
            <div className="space-y-2 text-sm mb-6">
              <div className="flex gap-2">
                <span className="text-gray-600 w-32">Category:</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-600 w-32">Type:</span>
                <span className="font-medium">{product.type}</span>
              </div>
              {product.sku && (
                <div className="flex gap-2">
                  <span className="text-gray-600 w-32">SKU:</span>
                  <span className="font-medium">{product.sku}</span>
                </div>
              )}
              {product.minOrderQuantity && (
                <div className="flex gap-2">
                  <span className="text-gray-600 w-32">Min Order:</span>
                  <span className="font-medium">{product.minOrderQuantity} units</span>
                </div>
              )}
            </div>

            {/* About this item */}
            {product.description && (
              <div className="mb-6">
                <h2 className="font-bold text-lg mb-2">About this item</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Section - Amazon Style */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Product details</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Product Details */}
            <div>
              <table className="w-full text-sm">
                <tbody>
                  {product.brand && (
                    <tr className="border-b">
                      <td className="py-3 font-semibold text-gray-700 w-1/3">Brand</td>
                      <td className="py-3">{product.brand}</td>
                    </tr>
                  )}
                  {product.category && (
                    <tr className="border-b">
                      <td className="py-3 font-semibold text-gray-700">Category</td>
                      <td className="py-3">{product.category}</td>
                    </tr>
                  )}
                  {product.type && (
                    <tr className="border-b">
                      <td className="py-3 font-semibold text-gray-700">Product Type</td>
                      <td className="py-3">{product.type}</td>
                    </tr>
                  )}
                  {product.material && (
                    <tr className="border-b">
                      <td className="py-3 font-semibold text-gray-700">Material</td>
                      <td className="py-3">{product.material}</td>
                    </tr>
                  )}
                  {product.condition && (
                    <tr className="border-b">
                      <td className="py-3 font-semibold text-gray-700">Condition</td>
                      <td className="py-3">{product.condition}</td>
                    </tr>
                  )}
                  {product.compliance?.rnNumber && (
                    <tr className="border-b">
                      <td className="py-3 font-semibold text-gray-700">RN Number</td>
                      <td className="py-3">{product.compliance.rnNumber}</td>
                    </tr>
                  )}
                  {product.compliance?.upcCode && (
                    <tr className="border-b">
                      <td className="py-3 font-semibold text-gray-700">UPC</td>
                      <td className="py-3">{product.compliance.upcCode}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Right Column - Additional Info */}
            <div>
              {product.shipping && (
                <div className="mb-6">
                  <h3 className="font-bold text-base mb-3">Shipping Information</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      {product.shipping.weight && (
                        <tr className="border-b">
                          <td className="py-2 font-semibold text-gray-700 w-1/3">Weight</td>
                          <td className="py-2">{product.shipping.weight} lbs</td>
                        </tr>
                      )}
                      {product.shipping.dimensions && (
                        <tr className="border-b">
                          <td className="py-2 font-semibold text-gray-700">Dimensions</td>
                          <td className="py-2">
                            {product.shipping.dimensions.length} x {product.shipping.dimensions.width} x {product.shipping.dimensions.height} {product.shipping.dimensions.unit}
                          </td>
                        </tr>
                      )}
                      {product.shipping.leadTime && (
                        <tr className="border-b">
                          <td className="py-2 font-semibold text-gray-700">Lead Time</td>
                          <td className="py-2">{product.shipping.leadTime} days</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {product.merchant && (
                <div>
                  <h3 className="font-bold text-base mb-3">Merchant Information</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-semibold text-gray-700 w-1/3">Name</td>
                        <td className="py-2">{product.merchant.firstName} {product.merchant.lastName}</td>
                      </tr>
                      {product.merchant.companyName && (
                        <tr className="border-b">
                          <td className="py-2 font-semibold text-gray-700">Company</td>
                          <td className="py-2">{product.merchant.companyName}</td>
                        </tr>
                      )}
                      <tr className="border-b">
                        <td className="py-2 font-semibold text-gray-700">Email</td>
                        <td className="py-2">{product.merchant.email}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* All Variants Table (if PARENT) */}
          {product.variantType === 'PARENT' && product.variants && product.variants.length > 0 && (
            <div className="mt-8">
              <h3 className="font-bold text-lg mb-4">All Available Variants ({product.variants.length})</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Variant</th>
                      <th className="px-4 py-3 text-left font-semibold">SKU</th>
                      <th className="px-4 py-3 text-left font-semibold">Attributes</th>
                      <th className="px-4 py-3 text-right font-semibold">Price</th>
                      <th className="px-4 py-3 text-right font-semibold">Quantity</th>
                      <th className="px-4 py-3 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.variants.map((variant, idx) => (
                      <tr key={variant.id || idx} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{variant.variantName || `Variant ${idx + 1}`}</td>
                        <td className="px-4 py-3 font-mono text-xs">{variant.sku || '-'}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {variant.attributes && Object.entries(variant.attributes).map(([key, value]) => (
                              <Badge key={key} variant="outline" className="text-xs">
                                {key}: {value}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold">
                          {formatPrice(variant.discountedPrice || variant.originalPrice)}
                        </td>
                        <td className="px-4 py-3 text-right">{variant.quantity || 0}</td>
                        <td className="px-4 py-3">
                          <Badge variant={variant.status === 'ACTIVE' ? 'default' : 'secondary'}>
                            {variant.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Developer Tools - Raw JSON */}
          <div className="mt-8 border-t pt-6">
            <Button
              variant="outline"
              onClick={() => setShowRawJson(!showRawJson)}
              className="mb-4"
            >
              {showRawJson ? 'Hide' : 'Show'} Complete Backend Response (JSON)
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showRawJson ? 'rotate-180' : ''}`} />
            </Button>

            {showRawJson && (
              <div className="bg-slate-900 rounded-lg p-4 overflow-auto max-h-96">
                <pre className="text-xs text-green-400 font-mono">
                  {JSON.stringify(product, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
            >
              <X className="h-8 w-8 text-white" />
            </button>

            {/* Previous Button */}
            {availableImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  previousImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
              >
                <ChevronLeft className="h-10 w-10 text-white" />
              </button>
            )}

            {/* Next Button */}
            {availableImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
              >
                <ChevronRight className="h-10 w-10 text-white" />
              </button>
            )}

            {/* Main Lightbox Image */}
            <div
              className="relative max-w-7xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImageUrl(availableImages[lightboxImageIndex])}
                alt={`${product.name} - Image ${lightboxImageIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain"
                onError={handleImageError}
              />

              {/* Image Counter */}
              {availableImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black bg-opacity-60 text-white rounded-full text-sm">
                  {lightboxImageIndex + 1} / {availableImages.length}
                </div>
              )}
            </div>

            {/* Thumbnail Strip (if multiple images) */}
            {availableImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black bg-opacity-60 p-2 rounded-lg max-w-[90vw] overflow-x-auto">
                {availableImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImageIndex(idx);
                    }}
                    className={`flex-shrink-0 w-16 h-16 border-2 rounded overflow-hidden ${
                      idx === lightboxImageIndex ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={getImageUrl(img)}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
