"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  X, 
  AlertCircle, 
  CheckCircle,
  Edit2,
  Trash2,
  Plus,
  DollarSign,
  Package,
  Tag,
  Hash,
  FileText,
  Boxes,
  Image as ImageIcon
} from "lucide-react";
import { toast } from "sonner";

interface ExtractedProduct {
  name: string;
  description: string;
  brand: string;
  category: string;
  type: string;
  originalPrice: number;
  discountedPrice: number;
  wholesalePrice?: number;
  retailPrice?: number;
  quantity: number;
  minOrderQuantity: number;
  maxOrderQuantity?: number;
  sku: string;
  
  // Product specifications
  material?: string;
  size?: string;
  color?: string;
  model?: string;
  condition: string;
  
  // Business information
  costPrice?: number;
  currency: string;
  
  // Compliance & certification
  rnNumber?: string;
  upcCode?: string;
  
  // Shipping info
  casePack?: number;
  weight?: number;
  fobPort?: string;
  
  specifications?: string;
  confidenceScore?: number;
  extractionSource?: string;
  extractionNotes?: string;
  images?: string[];
  primaryImageIndex?: number;
}

interface ProductEditorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (products: any[]) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const categories = [
  "ELECTRONICS",
  "APPAREL",
  "FURNITURE",
  "GENERAL_MERCHANDISE",
  "FOOTWEAR",
  "HOME_GOODS",
  "ACCESSORIES",
  "HEALTH_BEAUTY",
  "AUTOMOTIVE",
  "SPORTS_OUTDOORS",
  "TOYS_GAMES",
  "FOOD_BEVERAGE",
  "INDUSTRIAL"
];

const productTypes = [
  "CLOSEOUT",
  "OVERSTOCK",
  "FACTORY_OVERRUN",
  "BRANDED",
  "PRIVATE_LABEL",
  "LIQUIDATION",
  "SHELF_PULLS"
];


export default function ProductEditor({ products: initialProducts, onSave, onCancel, isLoading }: ProductEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [validationErrors, setValidationErrors] = useState<Record<number, string[]>>({});
  const [selectedImage, setSelectedImage] = useState<{ url: string; productName: string; imageIndex: number; allImages: string[] } | null>(null);
  const [selectedImages, setSelectedImages] = useState<Record<number, boolean[]>>({});
  const [primaryImages, setPrimaryImages] = useState<Record<number, number>>({});  // productIndex -> imageIndex

  // Initialize selectedImages and primaryImages when products change
  useEffect(() => {
    const initialSelectedImages: Record<number, boolean[]> = {};
    const initialPrimaryImages: Record<number, number> = {};
    
    products.forEach((product, productIndex) => {
      if (product.images && product.images.length > 0) {
        initialSelectedImages[productIndex] = new Array(product.images.length).fill(true);
        initialPrimaryImages[productIndex] = 0; // First image is primary by default
      }
    });
    
    setSelectedImages(initialSelectedImages);
    setPrimaryImages(initialPrimaryImages);
  }, [products]);

  // Validate products when products or selectedImages change
  useEffect(() => {
    const validateProducts = () => {
      const errors: Record<number, string[]> = {};
      
      products.forEach((product, index) => {
        const productErrors: string[] = [];
        
        if (!product.name || product.name.trim() === "") {
          productErrors.push("Product name is required");
        }
        
        if (!product.originalPrice || product.originalPrice <= 0) {
          productErrors.push("Original price must be greater than 0");
        }
        
        if (!product.discountedPrice || product.discountedPrice <= 0) {
          productErrors.push("Discounted price must be greater than 0");
        }
        
        if (product.discountedPrice >= product.originalPrice) {
          productErrors.push("Discounted price must be less than original price");
        }
        
        if (!product.quantity || product.quantity <= 0) {
          productErrors.push("Quantity must be greater than 0");
        }
        
        // Check if product has images but none are selected
        if (product.images && product.images.length > 0) {
          const selectedCount = selectedImages[index]?.filter(Boolean).length || 0;
          if (selectedCount === 0) {
            productErrors.push("At least one image must be selected");
          }
        }
        
        if (productErrors.length > 0) {
          errors[index] = productErrors;
        }
      });
      
      setValidationErrors(errors);
    };

    validateProducts();
  }, [products, selectedImages]);

  // Keyboard navigation for image modal
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = selectedImage.imageIndex;
        const newIndex = currentIndex > 0 ? currentIndex - 1 : selectedImage.allImages.length - 1;
        setSelectedImage({
          ...selectedImage,
          url: selectedImage.allImages[newIndex],
          imageIndex: newIndex
        });
      } else if (e.key === 'ArrowRight') {
        const currentIndex = selectedImage.imageIndex;
        const newIndex = currentIndex < selectedImage.allImages.length - 1 ? currentIndex + 1 : 0;
        setSelectedImage({
          ...selectedImage,
          url: selectedImage.allImages[newIndex],
          imageIndex: newIndex
        });
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedImage]);


  const updateProduct = (index: number, field: keyof ExtractedProduct, value: string | number) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value
    };
    setProducts(updatedProducts);
  };

  const deleteProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    toast.success("Product removed");
  };

  const addNewProduct = () => {
    const newProduct: ExtractedProduct = {
      name: "",
      description: "",
      brand: "",
      category: "GENERAL_MERCHANDISE",
      type: "CLOSEOUT",
      originalPrice: 0,
      discountedPrice: 0,
      wholesalePrice: 0,
      retailPrice: 0,
      quantity: 0,
      minOrderQuantity: 1,
      maxOrderQuantity: 1000,
      sku: "",
      
      // Product specifications
      material: "",
      size: "",
      color: "",
      model: "",
      condition: "NEW",
      
      // Business information
      costPrice: 0,
      currency: "USD",
      
      // Compliance & certification
      rnNumber: "",
      upcCode: "",
      
      // Shipping info
      casePack: 1,
      weight: 0,
      fobPort: "",
      
      confidenceScore: 1.0,
      extractionSource: "manual"
    };
    setProducts([...products, newProduct]);
    setExpandedIndex(products.length);
    setEditingIndex(products.length);
    toast.success("New product added");
  };

  const handleSave = () => {
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix validation errors before saving");
      return;
    }
    
    // Filter products to only include selected images
    const productsWithSelectedImages = products.map((product, productIndex) => {
      if (!product.images || product.images.length === 0) {
        return product;
      }
      
      const selectedImageIndices = selectedImages[productIndex] || [];
      const filteredImages = product.images.filter((imageUrl: string, imageIndex: number) => 
        selectedImageIndices[imageIndex] === true
      );
      
      
      // Calculate the new primary image index after filtering
      const originalPrimaryIndex = primaryImages[productIndex] || 0;
      let newPrimaryIndex = 0;
      
      if (filteredImages.length > 0) {
        // Find which position the original primary image is in the filtered array
        let filteredPrimaryIndex = 0;
        let selectedCount = 0;
        
        for (let i = 0; i <= originalPrimaryIndex && i < product.images.length; i++) {
          if (selectedImageIndices[i]) {
            if (i === originalPrimaryIndex) {
              filteredPrimaryIndex = selectedCount;
              break;
            }
            selectedCount++;
          }
        }
        newPrimaryIndex = filteredPrimaryIndex;
      }
      
      return {
        ...product,
        images: filteredImages,
        primaryImageIndex: newPrimaryIndex
      };
    });
    
    
    onSave(productsWithSelectedImages);
  };

  const getConfidenceBadge = (score?: number) => {
    if (!score) return null;
    
    if (score >= 0.8) {
      return <Badge className="bg-green-100 text-green-800">High Confidence</Badge>;
    } else if (score >= 0.5) {
      return <Badge className="bg-yellow-100 text-yellow-800">Medium Confidence</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">Low Confidence - Review Required</Badge>;
    }
  };

  const calculateDiscount = (original: number, discounted: number) => {
    if (!original || original <= 0) return 0;
    return Math.round(((original - discounted) / original) * 100);
  };

  const toggleImageSelection = (productIndex: number, imageIndex: number) => {
    setSelectedImages(prev => {
      const currentSelections = prev[productIndex] || [];
      const newSelections = currentSelections.map((selected, idx) => 
        idx === imageIndex ? !selected : selected
      );
      
      // If we're unselecting the primary image, find a new primary
      if (currentSelections[imageIndex] && primaryImages[productIndex] === imageIndex) {
        const firstSelectedIndex = newSelections.findIndex(selected => selected);
        if (firstSelectedIndex !== -1) {
          setPrimaryImages(prevPrimary => ({
            ...prevPrimary,
            [productIndex]: firstSelectedIndex
          }));
        }
      }
      
      return {
        ...prev,
        [productIndex]: newSelections
      };
    });
  };

  const setPrimaryImage = (productIndex: number, imageIndex: number) => {
    // Only allow setting primary if the image is selected
    if (selectedImages[productIndex]?.[imageIndex]) {
      setPrimaryImages(prev => ({
        ...prev,
        [productIndex]: imageIndex
      }));
    }
  };

  const selectAllImages = (productIndex: number, selectAll: boolean) => {
    const product = products[productIndex];
    if (product.images) {
      setSelectedImages(prev => ({
        ...prev,
        [productIndex]: new Array(product.images.length).fill(selectAll)
      }));
      
      // Set primary image to first one if selecting all, or reset if deselecting all
      if (selectAll) {
        setPrimaryImages(prev => ({
          ...prev,
          [productIndex]: 0
        }));
      }
    }
  };

  const getSelectedImageCount = (productIndex: number) => {
    return selectedImages[productIndex]?.filter(Boolean).length || 0;
  };

  return (
    <>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gws-navy">Review Extracted Products</h3>
          <p className="text-gray-600 mt-1">
            Review and edit the AI-extracted product information. Click on any field to modify.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-lg px-3 py-1">
            <Package className="h-4 w-4 mr-1" />
            {products.length} Products
          </Badge>
        </div>
      </div>

      {/* Validation Summary */}
      {Object.keys(validationErrors).length > 0 && (
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-red-800 flex items-center text-lg">
              <AlertCircle className="h-5 w-5 mr-2" />
              Validation Issues Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 text-sm">
              {Object.keys(validationErrors).length} product(s) have validation errors. Please review and fix them.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Products List */}
      <div className="space-y-4">
        {products.map((product, index) => (
          <Card 
            key={index} 
            className={`transition-all duration-300 ${
              expandedIndex === index ? 'ring-2 ring-gws-gold shadow-lg' : ''
            } ${
              validationErrors[index] ? 'border-red-300' : 'border-gray-200'
            }`}
          >
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center">
                    <span className="mr-3 text-gws-gold">#{index + 1}</span>
                    <Input
                      value={product.name}
                      onChange={(e) => updateProduct(index, 'name', e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className={`font-semibold ${validationErrors[index]?.some(error => error.includes('Product name')) ? 'border-red-500' : ''}`}
                      placeholder="Product Name"
                    />
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline">{product.category}</Badge>
                    <Badge variant="outline">{product.type}</Badge>
                    {getConfidenceBadge(product.confidenceScore)}
                    {product.extractionSource && (
                      <Badge variant="outline" className="bg-blue-50">
                        Source: {product.extractionSource}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {validationErrors[index] && (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingIndex(editingIndex === index ? null : index);
                      setExpandedIndex(index);
                    }}
                  >
                    {editingIndex === index ? <X className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProduct(index);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {expandedIndex === index && (
              <CardContent className="pt-0">
                {/* Validation Errors */}
                {validationErrors[index] && (
                  <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-sm font-medium text-red-800 mb-1">Please fix the following issues:</p>
                    <ul className="list-disc list-inside text-sm text-red-700">
                      {validationErrors[index].map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div>
                      <Label className="flex items-center mb-1">
                        <FileText className="h-4 w-4 mr-1" />
                        Description
                      </Label>
                      {editingIndex === index ? (
                        <textarea
                          value={product.description}
                          onChange={(e) => updateProduct(index, 'description', e.target.value)}
                          className="w-full p-2 border rounded-lg"
                          rows={3}
                          placeholder="Product description"
                        />
                      ) : (
                        <p className="text-sm text-gray-700">{product.description || "No description"}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="flex items-center mb-1">
                          <Tag className="h-4 w-4 mr-1" />
                          Brand
                        </Label>
                        {editingIndex === index ? (
                          <Input
                            value={product.brand}
                            onChange={(e) => updateProduct(index, 'brand', e.target.value)}
                            placeholder="Brand name"
                          />
                        ) : (
                          <p className="text-sm font-medium">{product.brand || "Generic"}</p>
                        )}
                      </div>

                      <div>
                        <Label className="flex items-center mb-1">
                          <Hash className="h-4 w-4 mr-1" />
                          SKU
                        </Label>
                        {editingIndex === index ? (
                          <Input
                            value={product.sku}
                            onChange={(e) => updateProduct(index, 'sku', e.target.value)}
                            placeholder="SKU/Model"
                          />
                        ) : (
                          <p className="text-sm font-medium">{product.sku || "N/A"}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="mb-1">Category</Label>
                        {editingIndex === index ? (
                          <select
                            value={product.category}
                            onChange={(e) => updateProduct(index, 'category', e.target.value)}
                            className="w-full p-2 border rounded-lg"
                          >
                            {categories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        ) : (
                          <p className="text-sm font-medium">{product.category}</p>
                        )}
                      </div>

                      <div>
                        <Label className="mb-1">Type</Label>
                        {editingIndex === index ? (
                          <select
                            value={product.type}
                            onChange={(e) => updateProduct(index, 'type', e.target.value)}
                            className="w-full p-2 border rounded-lg"
                          >
                            {productTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        ) : (
                          <p className="text-sm font-medium">{product.type}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Inventory */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="flex items-center mb-1">
                          <DollarSign className="h-4 w-4 mr-1" />
                          Original Price
                        </Label>
                        <Input
                          type="number"
                          value={product.originalPrice}
                          onChange={(e) => updateProduct(index, 'originalPrice', parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                          step="0.01"
                          className={validationErrors[index]?.some(error => error.includes('Original price')) ? 'border-red-500' : ''}
                        />
                      </div>

                      <div>
                        <Label className="flex items-center mb-1">
                          <DollarSign className="h-4 w-4 mr-1" />
                          Wholesale Price
                        </Label>
                        <Input
                          type="number"
                          value={product.discountedPrice}
                          onChange={(e) => updateProduct(index, 'discountedPrice', parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                          step="0.01"
                          className={validationErrors[index]?.some(error => error.includes('Discounted price')) ? 'border-red-500' : ''}
                        />
                      </div>
                    </div>

                    {product.originalPrice > 0 && product.discountedPrice > 0 && (
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm font-medium text-green-800">
                          Discount: {calculateDiscount(product.originalPrice, product.discountedPrice)}% OFF
                        </p>
                        <p className="text-xs text-green-700 mt-1">
                          Savings: ${(product.originalPrice - product.discountedPrice).toFixed(2)}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="flex items-center mb-1">
                          <Boxes className="h-4 w-4 mr-1" />
                          Quantity
                        </Label>
                        <Input
                          type="number"
                          value={product.quantity}
                          onChange={(e) => updateProduct(index, 'quantity', parseInt(e.target.value) || 0)}
                          placeholder="0"
                          className={validationErrors[index]?.some(error => error.includes('Quantity')) ? 'border-red-500' : ''}
                        />
                      </div>

                      <div>
                        <Label className="flex items-center mb-1">
                          <Package className="h-4 w-4 mr-1" />
                          Min Order
                        </Label>
                        <Input
                          type="number"
                          value={product.minOrderQuantity}
                          onChange={(e) => updateProduct(index, 'minOrderQuantity', parseInt(e.target.value) || 1)}
                          placeholder="1"
                        />
                      </div>
                    </div>

                    {product.condition && (
                      <div>
                        <Label className="mb-1">Condition</Label>
                        {editingIndex === index ? (
                          <Input
                            value={product.condition}
                            onChange={(e) => updateProduct(index, 'condition', e.target.value)}
                            placeholder="new, refurbished, etc."
                          />
                        ) : (
                          <p className="text-sm font-medium capitalize">{product.condition}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Images */}
                {product.images && product.images.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="flex items-center">
                        <ImageIcon className="h-4 w-4 mr-1" />
                        Product Images ({product.images.length})
                        <span className="ml-2 text-sm text-green-600">
                          ({getSelectedImageCount(index)} selected)
                        </span>
                      </Label>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => selectAllImages(index, true)}
                          className="text-xs px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded"
                        >
                          Select All
                        </button>
                        <button
                          type="button"
                          onClick={() => selectAllImages(index, false)}
                          className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded"
                        >
                          Select None
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {product.images.map((imageUrl: string, imgIndex: number) => {
                        const isSelected = selectedImages[index]?.[imgIndex] ?? true;
                        const isPrimary = primaryImages[index] === imgIndex;
                        return (
                          <div key={imgIndex} className="relative group">
                            {/* Selection checkbox */}
                            <div className="absolute top-2 left-2 z-10">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleImageSelection(index, imgIndex)}
                                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                            
                            {/* Primary image button */}
                            {isSelected && (
                              <div className="absolute top-2 right-2 z-10">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPrimaryImage(index, imgIndex);
                                  }}
                                  className={`text-xs px-2 py-1 rounded text-white font-medium ${
                                    isPrimary 
                                      ? 'bg-gws-gold hover:bg-yellow-500' 
                                      : 'bg-gray-600 hover:bg-gray-700'
                                  }`}
                                >
                                  {isPrimary ? '★ Primary' : 'Set Primary'}
                                </button>
                              </div>
                            )}
                            
                            {/* Selection overlay */}
                            {!isSelected && (
                              <div className="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-lg flex items-center justify-center z-5">
                                <span className="text-white text-xs bg-black bg-opacity-70 px-2 py-1 rounded">
                                  Not Selected
                                </span>
                              </div>
                            )}

                            <div 
                              className={`aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 transition-colors cursor-pointer ${
                                isSelected ? 'border-gray-200 hover:border-gws-gold' : 'border-gray-400 opacity-75'
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedImage({
                                  url: imageUrl,
                                  productName: product.name,
                                  imageIndex: imgIndex,
                                  allImages: product.images
                                });
                              }}
                            >
                              <img
                                src={imageUrl.startsWith('http') ? imageUrl : imageUrl}
                                data-original-src={imageUrl}
                                alt={`Product ${product.name} - Image ${imgIndex + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  // Show fallback SVG for failed images
                                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzk5OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDE5VjVjMC0xLjEtLjktMi0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnpNOC41IDEzLjVsMi41IDMuMDFMMTQuNSAxMmw0LjUgNkg1bDMuNS00LjV6Ii8+Cjwvc3ZnPg==';
                                  target.style.filter = 'brightness(0.5)';
                                  target.title = `Failed to load: ${target.getAttribute('data-original-src') || 'Unknown URL'}`;
                                }}
                              />
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                #{imgIndex + 1}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* AI Extraction Notes */}
                {product.extractionNotes && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-sm font-medium text-yellow-800 mb-1">AI Extraction Notes:</p>
                    <p className="text-xs text-yellow-700">{product.extractionNotes}</p>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Add New Product Button */}
      <div className="flex justify-center">
        <Button
          onClick={addNewProduct}
          variant="outline"
          className="border-dashed border-2 border-gws-gold hover:bg-gws-gold/10"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Product
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600">
            {Object.keys(validationErrors).length === 0 ? (
              <span className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                All products valid
              </span>
            ) : (
              <span className="flex items-center text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                Fix {Object.keys(validationErrors).length} issue(s)
              </span>
            )}
          </span>
          
          <Button
            onClick={handleSave}
            disabled={Object.keys(validationErrors).length > 0 || isLoading}
            className="bg-gradient-to-r from-gws-gold to-yellow-500 hover:from-yellow-500 hover:to-gws-gold text-gws-navy font-semibold"
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Creating Products..." : `Create ${products.length} Product(s)`}
          </Button>
        </div>
      </div>
    </div>


      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-7xl max-h-screen w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation buttons */}
            {selectedImage.allImages.length > 1 && (
              <>
                <button
                  onClick={() => {
                    const currentIndex = selectedImage.imageIndex;
                    const newIndex = currentIndex > 0 ? currentIndex - 1 : selectedImage.allImages.length - 1;
                    setSelectedImage({
                      ...selectedImage,
                      url: selectedImage.allImages[newIndex],
                      imageIndex: newIndex
                    });
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 transition-all z-10"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={() => {
                    const currentIndex = selectedImage.imageIndex;
                    const newIndex = currentIndex < selectedImage.allImages.length - 1 ? currentIndex + 1 : 0;
                    setSelectedImage({
                      ...selectedImage,
                      url: selectedImage.allImages[newIndex],
                      imageIndex: newIndex
                    });
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 transition-all z-10"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Main image */}
            <div className="flex flex-col items-center justify-center max-w-full max-h-full">
              <img
                src={selectedImage.url.startsWith('http') ? selectedImage.url : selectedImage.url}
                alt={`${selectedImage.productName} - Image ${selectedImage.imageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzk5OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDE5VjVjMC0xLjEtLjktMi0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnpNOC41IDEzLjVsMi41IDMuMDFMMTQuNSAxMmw0LjUgNkg1bDMuNS00LjV6Ii8+Cjwvc3ZnPg==';
                }}
              />
              
              {/* Image info */}
              <div className="mt-4 text-center text-white">
                <p className="text-lg font-semibold">{selectedImage.productName}</p>
                <p className="text-sm opacity-75">
                  Image {selectedImage.imageIndex + 1} of {selectedImage.allImages.length}
                  {selectedImage.allImages.length > 1 && (
                    <span className="ml-2 text-xs">• Use ← → arrow keys to navigate</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}