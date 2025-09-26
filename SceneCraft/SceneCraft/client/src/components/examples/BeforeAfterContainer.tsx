import { useState } from 'react';
import BeforeAfterContainer from '../BeforeAfterContainer';
import { Button } from '@/components/ui/button';
import beforeImg from '@assets/generated_images/Vintage_camera_bag_before_5b2bd989.png';
import afterImg from '@assets/generated_images/Vintage_camera_bag_after_45c66077.png';

export default function BeforeAfterContainerExample() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAfter, setShowAfter] = useState(false);

  const handleStartProcessing = () => {
    setIsProcessing(true);
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setShowAfter(true);
    }, 3000);
  };

  const handleReset = () => {
    setIsProcessing(false);
    setShowAfter(false);
  };

  return (
    <div className="p-8 space-y-6">
      <BeforeAfterContainer 
        beforeImage={beforeImg}
        afterImage={showAfter ? afterImg : null}
        isProcessing={isProcessing}
      />
      
      <div className="flex gap-4 justify-center">
        <Button 
          onClick={handleStartProcessing} 
          disabled={isProcessing || showAfter}
          data-testid="button-start-processing"
        >
          {isProcessing ? 'Processando...' : 'Simular Processamento'}
        </Button>
        <Button 
          variant="outline" 
          onClick={handleReset}
          data-testid="button-reset"
        >
          Resetar
        </Button>
      </div>
    </div>
  );
}