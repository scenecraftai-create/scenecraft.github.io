import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BeforeAfterContainerProps {
  beforeImage?: string | null;
  afterImage?: string | null;
  isProcessing?: boolean;
  className?: string;
}

export default function BeforeAfterContainer({ 
  beforeImage, 
  afterImage, 
  isProcessing = false,
  className 
}: BeforeAfterContainerProps) {
  return (
    <div className={cn("grid md:grid-cols-2 gap-6", className)}>
      {/* Before Container */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Sua Foto Original</CardTitle>
            <Badge variant="secondary" data-testid="badge-before">Antes</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="aspect-video bg-muted relative overflow-hidden">
            {beforeImage ? (
              <img 
                src={beforeImage} 
                alt="Imagem original" 
                className="w-full h-full object-cover"
                data-testid="img-before"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center space-y-2">
                  <div className="text-sm font-medium">Nenhuma imagem selecionada</div>
                  <div className="text-xs">Faça upload de uma foto para começar</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* After Container */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Resultado com IA</CardTitle>
            <Badge 
              variant={isProcessing ? "outline" : "default"} 
              className={cn(
                isProcessing && "border-primary text-primary"
              )}
              data-testid="badge-after"
            >
              {isProcessing ? 'Processando...' : 'Depois'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="aspect-video bg-muted relative overflow-hidden">
            {isProcessing ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Processando com IA...</div>
                    <div className="text-xs text-muted-foreground">
                      Isso pode levar alguns minutos
                    </div>
                  </div>
                </div>
              </div>
            ) : afterImage ? (
              <img 
                src={afterImage} 
                alt="Imagem processada" 
                className="w-full h-full object-cover"
                data-testid="img-after"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center space-y-2">
                  <div className="text-sm font-medium">Resultado aparecerá aqui</div>
                  <div className="text-xs">Envie uma foto para ver a magia da IA</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}