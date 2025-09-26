import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  className?: string;
}

export default function FileUpload({ onFileSelect, selectedFile, className }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleFileSelect(file);
      }
    }
  };

  const handleFileSelect = (file: File) => {
    onFileSelect(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    console.log('File selected:', file.name);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemoveFile = () => {
    onFileSelect(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    console.log('File removed');
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-200 hover-elevate",
        isDragOver && "border-primary bg-primary/5",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
        data-testid="input-file-upload"
      />
      
      {previewUrl ? (
        <div className="relative">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={handleClick}
                data-testid="button-change-file"
              >
                Alterar
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleRemoveFile}
                data-testid="button-remove-file"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {selectedFile && (
            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {selectedFile.name}
            </div>
          )}
        </div>
      ) : (
        <div 
          className="flex flex-col items-center justify-center h-64 p-8 cursor-pointer"
          onClick={handleClick}
          data-testid="area-file-drop"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className={cn(
              "p-4 rounded-full transition-colors",
              isDragOver ? "bg-primary text-primary-foreground" : "bg-muted"
            )}>
              {isDragOver ? (
                <Upload className="h-8 w-8" />
              ) : (
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">
                {isDragOver ? 'Solte sua imagem aqui' : 'Envie sua foto'}
              </h3>
              <p className="text-sm text-muted-foreground">
                Arraste e solte ou clique para selecionar
              </p>
              <p className="text-xs text-muted-foreground">
                Suporta JPG, PNG, WebP (máx. 10MB)
              </p>
            </div>
            
            <Button variant="outline" size="sm" data-testid="button-select-file">
              Selecionar Arquivo
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}