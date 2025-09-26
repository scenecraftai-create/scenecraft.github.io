import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

export default function HeroSection() {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload-section');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
    console.log('Scrolling to upload section');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-24 px-8">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container relative mx-auto max-w-6xl">
        <div className="text-center space-y-8">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Tecnologia de IA Avançada
          </div>
          
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Transforme suas fotos com
              <span className="block text-primary">Inteligência Artificial</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Envie uma foto comum e receba uma imagem editada profissionalmente. 
              Nossa IA analisa e aplica melhorias automáticas que levariam horas para um designer.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="text-lg px-8" 
              onClick={scrollToUpload}
              data-testid="button-start-editing"
            >
              Começar Edição
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8"
              onClick={() => console.log('View examples clicked')}
              data-testid="button-view-examples"
            >
              Ver Exemplos
            </Button>
          </div>
          
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 text-left">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Rápido e Automático</h3>
              <p className="text-muted-foreground">
                Resultados profissionais em poucos minutos, sem necessidade de conhecimento técnico.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-chart-2" />
              </div>
              <h3 className="font-semibold text-lg">Qualidade Profissional</h3>
              <p className="text-muted-foreground">
                Nossa IA foi treinada com milhares de edições profissionais para garantir excelência.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-chart-3" />
              </div>
              <h3 className="font-semibold text-lg">Simples de Usar</h3>
              <p className="text-muted-foreground">
                Faça upload, descreva o que quer e receba sua imagem transformada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}