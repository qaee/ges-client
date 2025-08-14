"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { aiExtractionService } from "@/services/api";
import ProductEditor from "@/components/ProductEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Upload, 
  ArrowLeft, 
  FileText, 
  Image as ImageIcon, 
  FileSpreadsheet,
  Mail,
  Bot,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Sparkles,
  ChevronRight,
  Plus
} from "lucide-react";
import { toast } from "sonner";

interface FileWithPreview extends File {
  preview?: string;
}

export default function ProductCreateWizardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploading, setUploading] = useState(false);
  const [extractionResult, setExtractionResult] = useState<{
    filename?: string;
    fileType?: string;
    extractedProducts?: any[];
  } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [creatingProducts, setCreatingProducts] = useState(false);
  const [createdProducts, setCreatedProducts] = useState<Array<{
    name: string;
    sku?: string;
    discountedPrice: number;
    quantity: number;
  }>>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Handle file drag and drop
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleSelectClick = () => {
    const input = document.getElementById('file-upload') as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      const validTypes = [
        'application/pdf',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'text/plain',
        'message/rfc822'
      ];
      return validTypes.includes(file.type) || 
             file.name.toLowerCase().endsWith('.eml') ||
             file.name.toLowerCase().endsWith('.msg');
    });

    if (validFiles.length !== newFiles.length) {
      toast.error("Some files were skipped. Only PDF, Excel, Images, and Email files are supported.");
    }

    setFiles(validFiles.map(file => {
      const fileWithPreview = file as FileWithPreview;
      if (file.type.startsWith('image/')) {
        fileWithPreview.preview = URL.createObjectURL(file);
      }
      return fileWithPreview;
    }));
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type.includes('pdf')) return <FileText className="h-8 w-8 text-red-500" />;
    if (file.type.includes('sheet') || file.type.includes('excel')) return <FileSpreadsheet className="h-8 w-8 text-green-500" />;
    if (file.type.startsWith('image/')) return <ImageIcon className="h-8 w-8 text-blue-500" />;
    if (file.type.includes('text') || file.name.includes('.eml') || file.name.includes('.msg')) return <Mail className="h-8 w-8 text-purple-500" />;
    return <FileText className="h-8 w-8 text-gray-500" />;
  };

  const processFiles = async () => {
    if (files.length === 0) {
      toast.error("Please select at least one file to process.");
      return;
    }

    setUploading(true);
    
    try {
      const result = await aiExtractionService.uploadAndProcess(files[0]);
      
      if (result.success) {
        // The new response format already includes products with images
        console.log('AI Extraction Result:', result);
        
        if (result.products && Array.isArray(result.products)) {
          result.extractedProducts = result.products;
        }
        
        // Ensure we have an array of products
        if (!result.extractedProducts) {
          result.extractedProducts = [];
        }
        
        setExtractionResult(result);
        setStep(2);
        toast.success("AI extraction completed successfully!");
      } else {
        toast.error(result.errorMessage || "Failed to process file");
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Failed to process file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProducts = async (editedProducts: Array<Record<string, unknown>>) => {
    setCreatingProducts(true);
    
    try {
      // Validate the products first
      const validationResult = await aiExtractionService.validateExtraction(editedProducts);
      
      if (!validationResult.valid) {
        toast.error("Please fix validation errors before creating products");
        setCreatingProducts(false);
        return;
      }
      
      // Create the products
      const result = await aiExtractionService.createProductsFromExtraction(editedProducts);
      
      if (result.success) {
        setCreatedProducts(result.createdProducts || []);
        setStep(3);
        toast.success(`Successfully created ${result.totalCreated} products!`);
      } else {
        toast.error("Failed to create products");
      }
    } catch (error) {
      console.error('Error creating products:', error);
      toast.error("Failed to create products. Please try again.");
    } finally {
      setCreatingProducts(false);
    }
  };

  const resetWizard = () => {
    setStep(1);
    setFiles([]);
    setExtractionResult(null);
    setCreatedProducts([]);
  };

  if (!isAuthenticated || !user) {
    return null;
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
          <span className="text-gray-600">AI Product Creation Wizard</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-gws-gold' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-gws-gold text-white' : 'bg-gray-200'}`}>
                {step > 1 ? <CheckCircle className="h-6 w-6" /> : '1'}
              </div>
              <span className="ml-2 font-medium">Upload Files</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
            <div className={`flex items-center ${step >= 2 ? 'text-gws-gold' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-gws-gold text-white' : 'bg-gray-200'}`}>
                {step > 2 ? <CheckCircle className="h-6 w-6" /> : '2'}
              </div>
              <span className="ml-2 font-medium">Review & Edit</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
            <div className={`flex items-center ${step >= 3 ? 'text-gws-gold' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-gws-gold text-white' : 'bg-gray-200'}`}>
                {step > 3 ? <CheckCircle className="h-6 w-6" /> : '3'}
              </div>
              <span className="ml-2 font-medium">Complete</span>
            </div>
          </div>
        </div>

        {/* Step 1: Upload Files */}
        {step === 1 && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-gws-navy to-gws-darknavy text-white">
              <CardTitle className="text-2xl flex items-center">
                <Bot className="h-6 w-6 mr-2" />
                AI-Powered Product Creation
              </CardTitle>
              <CardDescription className="text-white/80">
                Upload emails, PDFs, Excel files, or images containing product information. Our AI will extract and structure the data for you.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              {/* File Drop Zone */}
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-gws-gold bg-gws-gold/10' 
                    : 'border-gray-300 hover:border-gws-gold/50 hover:bg-gray-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-16 w-16 text-gws-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Drag & Drop Files Here
                </h3>
                <p className="text-gray-500 mb-6">
                  or click to select files from your computer
                </p>
                
                <input
                  type="file"
                  multiple
                  accept=".pdf,.xlsx,.xls,.jpg,.jpeg,.png,.gif,.txt,.eml,.msg"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                
                <Button 
                  variant="gws" 
                  className="cursor-pointer"
                  onClick={handleSelectClick}
                  type="button"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Select Files
                </Button>
                
                <div className="mt-6 text-sm text-gray-500">
                  <p>Supported formats: PDF, Excel (.xlsx, .xls), Images (JPG, PNG), Email files</p>
                  <p>Maximum file size: 10MB per file</p>
                </div>
              </div>

              {/* File Preview */}
              {files.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4">Selected Files ({files.length})</h4>
                  <div className="grid gap-4">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                        <div className="flex items-center space-x-3">
                          {file.preview ? (
                            <img src={file.preview} alt={file.name} className="h-12 w-12 object-cover rounded" />
                          ) : (
                            getFileIcon(file)
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <Button
                      onClick={processFiles}
                      disabled={uploading}
                      className="bg-gradient-to-r from-gws-gold to-yellow-500 hover:from-yellow-500 hover:to-gws-gold text-gws-navy font-semibold px-8 py-3 text-lg"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Processing with AI...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5 mr-2" />
                          Extract Product Data with AI
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Supported File Types */}
              <div className="mt-8 grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <FileText className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="font-medium text-red-700">PDF Files</p>
                  <p className="text-xs text-red-600">Product catalogs, invoices</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <FileSpreadsheet className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="font-medium text-green-700">Excel Files</p>
                  <p className="text-xs text-green-600">Product lists, inventory</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <ImageIcon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="font-medium text-blue-700">Images</p>
                  <p className="text-xs text-blue-600">Product photos, labels</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Mail className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="font-medium text-purple-700">Email Files</p>
                  <p className="text-xs text-purple-600">Client communications</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Review & Edit */}
        {step === 2 && extractionResult && (
          <Card className="max-w-6xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardTitle className="text-2xl flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                AI Extraction Complete
              </CardTitle>
              <CardDescription className="text-white/80">
                Review and modify the extracted product information before creating your products.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-800">Extraction Summary</h4>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-blue-600">File:</span> {extractionResult.filename}
                  </div>
                  <div>
                    <span className="text-blue-600">Type:</span> {extractionResult.fileType}
                  </div>
                  <div>
                    <span className="text-blue-600">Products Found:</span> {extractionResult.extractedProducts?.length || 0}
                  </div>
                </div>
              </div>

              {extractionResult.extractedProducts && extractionResult.extractedProducts.length > 0 ? (
                <ProductEditor
                  products={extractionResult.extractedProducts}
                  onSave={handleSaveProducts}
                  onCancel={() => setStep(1)}
                  isLoading={creatingProducts}
                />
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h3>
                  <p className="text-gray-600 mb-6">
                    The AI couldn't extract product information from your file. 
                    Please try with a different file or check the file content.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Try Another File
                    </Button>
                    <Button
                      variant="gws"
                      onClick={() => {
                        // Create empty product for manual entry
                        setExtractionResult({
                          ...extractionResult,
                          extractedProducts: [{
                            name: "",
                            description: "",
                            brand: "",
                            category: "GENERAL_MERCHANDISE",
                            type: "CLOSEOUT",
                            originalPrice: 0,
                            discountedPrice: 0,
                            quantity: 0,
                            minOrderQuantity: 1,
                            sku: "",
                            condition: "new",
                            confidenceScore: 1.0,
                            extractionSource: "manual"
                          }]
                        });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product Manually
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Complete */}
        {step === 3 && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardTitle className="text-2xl flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                Products Created Successfully!
              </CardTitle>
              <CardDescription className="text-white/80">
                Your products have been added to the catalog.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8 text-center">
              <div className="mb-8">
                <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {createdProducts.length} Products Created
                </h3>
                <p className="text-gray-600">
                  Your products have been successfully added to your catalog and are now available for trading.
                </p>
              </div>

              {createdProducts.length > 0 && (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-4">Created Products:</h4>
                  <div className="space-y-2 text-left max-h-60 overflow-y-auto">
                    {createdProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">SKU: {product.sku || 'N/A'}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gws-gold">${product.discountedPrice}</p>
                          <p className="text-sm text-gray-500">{product.quantity} units</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={resetWizard}
                  className="flex items-center"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Create More Products
                </Button>
                <Link href="/dashboard">
                  <Button variant="gws" className="flex items-center">
                    View Dashboard
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}