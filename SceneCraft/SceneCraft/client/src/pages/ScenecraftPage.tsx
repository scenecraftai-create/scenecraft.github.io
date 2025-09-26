import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FileUpload from '@/components/FileUpload';
import BeforeAfterContainer from '@/components/BeforeAfterContainer';
import FormspreeForm from '@/components/FormspreeForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ScenecraftPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      console.log('File selected for preview:', file.name);
    } else {
      setPreviewUrl(null);
      console.log('File selection cleared');
    }
    
    // Reset processing state when new file is selected
    setIsProcessing(false);
    setProcessedUrl(null);
  };

  const handleSubmissionSuccess = () => {
    console.log('Starting AI processing simulation');
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      // For demo purposes, we'll show a success message
      // In real implementation, this would be handled by email
      console.log('Processing completed (simulated)');
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        
        {/* Upload Section */}
        <section id="upload-section" className="py-16 px-8">
          <div className="container mx-auto max-w-6xl space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Começe Aqui</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Faça upload da sua imagem e veja a transformação acontecer
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* File Upload */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>1. Selecione sua Imagem</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FileUpload 
                      onFileSelect={handleFileSelect}
                      selectedFile={selectedFile}
                    />
                  </CardContent>
                </Card>
              </div>
              
              {/* Form */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">2. Descreva a Edição</h3>
                  <FormspreeForm 
                    selectedFile={selectedFile}
                    onSubmissionSuccess={handleSubmissionSuccess}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Separator className="my-8" />
        
        {/* Before/After Section */}
        <section className="py-16 px-8 bg-muted/30">
          <div className="container mx-auto max-w-6xl space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Veja a Transformação</h2>
              <p className="text-lg text-muted-foreground">
                Compare sua imagem original com o resultado editado pela IA
              </p>
            </div>
            
            <BeforeAfterContainer 
              beforeImage={previewUrl}
              afterImage={processedUrl}
              isProcessing={isProcessing}
            />
          </div>
        </section>
        
        {/* How it Works Section */}
        <section className="py-16 px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold">Como Funciona</h2>
              <p className="text-lg text-muted-foreground">
                Nossa IA transforma suas fotos em três passos simples
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    1
                  </div>
                  <CardTitle>Upload</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Faça upload da sua imagem e descreva as melhorias que deseja aplicar.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-chart-2/10 text-chart-2 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    2
                  </div>
                  <CardTitle>Processamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Nossa IA analisa sua imagem e aplica as edições com precisão profissional.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-chart-3/10 text-chart-3 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    3
                  </div>
                  <CardTitle>Resultado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Receba sua imagem editada profissionalmente por email em poucos minutos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-8 px-8">
        <div className="container mx-auto max-w-6xl text-center text-muted-foreground">
          <p>© 2024 Scenecraft. Transformando fotos com Inteligência Artificial.</p>
        </div>
      </footer>
    </div>
  );
}