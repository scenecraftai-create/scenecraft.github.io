import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle, Loader2, Send } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface FormspreeFormProps {
  selectedFile: File | null;
  onSubmissionSuccess?: () => void;
}

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export default function FormspreeForm({ selectedFile, onSubmissionSuccess }: FormspreeFormProps) {
  const [email, setEmail] = useState('');
  const [request, setRequest] = useState('');
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();

  const isFormValid = email && request && selectedFile;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      setErrorMessage('Por favor, preencha todos os campos e selecione uma imagem.');
      return;
    }

    setSubmissionState('submitting');
    setErrorMessage('');
    
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('upload', selectedFile);
      formData.append('request', request);
      
      console.log('Submitting to Formspree:', {
        email,
        fileName: selectedFile?.name,
        request: request.substring(0, 50) + '...'
      });
      
      const response = await fetch('https://formspree.io/f/xnngqoor', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmissionState('success');
        toast({
          title: "Sucesso!",
          description: "Sua solicitação foi enviada. Você receberá o resultado por email."
        });
        
        // Reset form
        setEmail('');
        setRequest('');
        onSubmissionSuccess?.();
      } else {
        throw new Error('Erro na submissão');
      }
      
    } catch (error) {
      console.error('Formspree submission error:', error);
      setSubmissionState('error');
      setErrorMessage('Erro ao enviar solicitação. Tente novamente.');
      toast({
        title: "Erro",
        description: "Não foi possível enviar sua solicitação. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  if (submissionState === 'success') {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">Solicitação Enviada!</h3>
            <p className="text-muted-foreground">
              Recebemos sua imagem e solicitação. Você receberá o resultado editado 
              no email <strong>{email}</strong> em breve.
            </p>
            <Button 
              onClick={() => {
                setSubmissionState('idle');
                console.log('Starting new request');
              }}
              data-testid="button-new-request"
            >
              Fazer Nova Solicitação
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Descreva sua Edição</CardTitle>
        <p className="text-center text-muted-foreground">
          Conte-nos como quer que sua imagem seja editada
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Seu Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                console.log('Email updated:', e.target.value);
              }}
              placeholder="seu.email@exemplo.com"
              required
              data-testid="input-email"
            />
            <p className="text-xs text-muted-foreground">
              Enviaremos o resultado editado para este email
            </p>
          </div>

          {/* Request Description */}
          <div className="space-y-2">
            <Label htmlFor="request">Descreva a Edição Desejada</Label>
            <Textarea
              id="request"
              name="request"
              value={request}
              onChange={(e) => {
                setRequest(e.target.value);
                console.log('Request updated:', e.target.value.substring(0, 30) + '...');
              }}
              placeholder="Ex: Remover fundo, melhorar iluminação, ajustar cores, aplicar efeito vintage..."
              rows={4}
              required
              data-testid="textarea-request"
            />
            <p className="text-xs text-muted-foreground">
              Seja específico sobre as melhorias que deseja
            </p>
          </div>

          {/* File Status */}
          <div className="space-y-2">
            <Label>Imagem Selecionada</Label>
            <div className="p-3 bg-muted rounded-md">
              {selectedFile ? (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>{selectedFile.name}</span>
                  <span className="text-muted-foreground">
                    ({(selectedFile.size / 1024 / 1024).toFixed(1)}MB)
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <span>Nenhuma imagem selecionada</span>
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full"
            disabled={!isFormValid || submissionState === 'submitting'}
            data-testid="button-submit-form"
          >
            {submissionState === 'submitting' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando para IA...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Enviar para Edição
              </>
            )}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            Processamento pode levar de 5-15 minutos dependendo da complexidade
          </p>
        </form>
      </CardContent>
    </Card>
  );
}