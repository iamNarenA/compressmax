import React, { useState, useCallback, useRef } from 'react';
import { Upload, Download, Image as ImageIcon, Trash2, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import AdBanner from './AdBanner';
import AffiliateSection from './AffiliateSection';
import SupportSection from './SupportSection';
import Footer from './Footer';

interface CompressedImage {
  id: string;
  originalFile: File;
  originalSize: number;
  compressedDataUrl: string;
  compressedSize: number;
  compressionRatio: number;
  isCompressing: boolean;
}

const ImageCompressor: React.FC = () => {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [quality, setQuality] = useState(80);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = useCallback((file: File, quality: number): Promise<{ dataUrl: string; size: number }> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        const maxWidth = 1920;
        const maxHeight = 1080;
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality / 100);
        const base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
        const size = (base64Length * 3) / 4;

        resolve({ dataUrl, size });
      };

      img.src = URL.createObjectURL(file);
    });
  }, []);

  const handleFileSelect = useCallback(async (files: FileList) => {
    const validFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/') && 
      ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)
    );

    for (const file of validFiles) {
      const id = Math.random().toString(36).substr(2, 9);
      const newImage: CompressedImage = {
        id,
        originalFile: file,
        originalSize: file.size,
        compressedDataUrl: '',
        compressedSize: 0,
        compressionRatio: 0,
        isCompressing: true,
      };

      setImages(prev => [...prev, newImage]);

      try {
        const { dataUrl, size } = await compressImage(file, quality);
        const compressionRatio = ((file.size - size) / file.size) * 100;

        setImages(prev => prev.map(img => 
          img.id === id 
            ? { 
                ...img, 
                compressedDataUrl: dataUrl, 
                compressedSize: size, 
                compressionRatio,
                isCompressing: false 
              }
            : img
        ));
      } catch (error) {
        console.error('Compression failed:', error);
        setImages(prev => prev.filter(img => img.id !== id));
      }
    }
  }, [compressImage, quality]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const downloadImage = useCallback((image: CompressedImage) => {
    const link = document.createElement('a');
    link.download = `compressed_${image.originalFile.name}`;
    link.href = image.compressedDataUrl;
    link.click();
  }, []);

  const downloadAll = useCallback(async () => {
    const { default: JSZip } = await import('jszip');
    const zip = new JSZip();

    images.forEach((image) => {
      if (image.compressedDataUrl) {
        const base64Data = image.compressedDataUrl.split(',')[1];
        zip.file(`compressed_${image.originalFile.name}`, base64Data, { base64: true });
      }
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.download = 'compressed_images.zip';
    link.href = URL.createObjectURL(content);
    link.click();
  }, [images]);

  const removeImage = useCallback((id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const recompressAll = useCallback(async () => {
    const imagesToRecompress = images.filter(img => !img.isCompressing);
    
    for (const image of imagesToRecompress) {
      setImages(prev => prev.map(img => 
        img.id === image.id ? { ...img, isCompressing: true } : img
      ));

      try {
        const { dataUrl, size } = await compressImage(image.originalFile, quality);
        const compressionRatio = ((image.originalSize - size) / image.originalSize) * 100;

        setImages(prev => prev.map(img => 
          img.id === image.id 
            ? { 
                ...img, 
                compressedDataUrl: dataUrl, 
                compressedSize: size, 
                compressionRatio,
                isCompressing: false 
              }
            : img
        ));
      } catch (error) {
        console.error('Recompression failed:', error);
        setImages(prev => prev.map(img => 
          img.id === image.id ? { ...img, isCompressing: false } : img
        ));
      }
    }
  }, [images, quality, compressImage]);

  const totalOriginalSize = images.reduce((sum, img) => sum + img.originalSize, 0);
  const totalCompressedSize = images.reduce((sum, img) => sum + img.compressedSize, 0);
  const totalSavings = totalOriginalSize > 0 ? ((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <ImageIcon className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">CompressMax</h1>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Compress your images without losing quality. Fast, secure, and completely free.
            </p>
          </header>

          {/* Top Banner Ad */}
          <AdBanner size="leaderboard" className="mb-8" />

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 mb-8 ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Drop your images here or click to browse
            </h3>
            <p className="text-gray-500 mb-4">
              Supports JPEG, PNG, and WebP files up to 10MB each
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Choose Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
            />
          </div>

          {/* Settings Panel */}
          {images.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Settings className="w-5 h-5 text-gray-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Compression Settings</h3>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={recompressAll}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Apply to All
                  </button>
                  {images.filter(img => !img.isCompressing && img.compressedDataUrl).length > 1 && (
                    <button
                      onClick={downloadAll}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download All
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Quality: {quality}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Higher compression</span>
                    <span>Better quality</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Total Savings</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Original:</span>
                      <span className="font-medium">{formatFileSize(totalOriginalSize)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Compressed:</span>
                      <span className="font-medium">{formatFileSize(totalCompressedSize)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-1">
                      <span className="text-gray-600">Saved:</span>
                      <span className="font-bold text-green-600">{totalSavings.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Show monetization sections even when images are present */}
          {images.length > 0 && (
            <>
              <div className="mt-16">
                {/* Support Section */}
                <SupportSection />
                
                {/* Banner Ad */}
                <div className="flex justify-center mb-8">
                  <AdBanner size="banner" />
                </div>
              </div>
            </>
          )}

          {/* Images Grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div key={image.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    {image.compressedDataUrl ? (
                      <img
                        src={image.compressedDataUrl}
                        alt={image.originalFile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                          <p className="text-sm text-gray-500">Compressing...</p>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h4 className="font-medium text-gray-800 mb-3 truncate" title={image.originalFile.name}>
                      {image.originalFile.name}
                    </h4>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Original:</span>
                        <span className="font-medium">{formatFileSize(image.originalSize)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Compressed:</span>
                        <span className="font-medium">
                          {image.isCompressing ? '...' : formatFileSize(image.compressedSize)}
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Saved:</span>
                        <span className={`font-bold ${image.compressionRatio > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                          {image.isCompressing ? '...' : `${image.compressionRatio.toFixed(1)}%`}
                        </span>
                      </div>
                    </div>

                    {!image.isCompressing && image.compressedDataUrl && (
                      <button
                        onClick={() => downloadImage(image)}
                        className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </button>
                    )}

                    {image.isCompressing && (
                      <div className="mt-4 bg-blue-50 rounded-lg p-3 flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                        <span className="text-sm text-blue-700">Processing...</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Features Section */}
          {images.length === 0 && (
            <>
              <div className="mt-16">
                {/* Support Section */}
                <SupportSection />
                
                {/* Rectangle Ad */}
                <div className="flex justify-center mb-12">
                  <AdBanner size="rectangle" />
                </div>
                
                {/* Affiliate Tools Section */}
                <AffiliateSection />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Quality Loss</h3>
                    <p className="text-gray-600">
                      Our advanced compression algorithms maintain image quality while reducing file size.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                    <AlertCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">100% Secure</h3>
                    <p className="text-gray-600">
                      All processing happens in your browser. Your images never leave your device.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                    <Download className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Batch Processing</h3>
                    <p className="text-gray-600">
                      Compress multiple images at once and download them as a ZIP file.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ImageCompressor;