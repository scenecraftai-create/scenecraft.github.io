import { useState } from 'react';
import FormspreeForm from '../FormspreeForm';
import { Button } from '@/components/ui/button';

export default function FormspreeFormExample() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = () => {
    // Simulate file selection
    const mockFile = new File([''], 'example-photo.jpg', { type: 'image/jpeg' });
    setSelectedFile(mockFile);
    console.log('Mock file selected');
  };

  const handleSubmissionSuccess = () => {
    setSelectedFile(null);
    console.log('Form submitted successfully');
  };

  return (
    <div className="p-8 space-y-6">
      <div className="text-center">
        <Button 
          onClick={handleFileSelect} 
          variant="outline"
          data-testid="button-mock-file"
        >
          Simular Arquivo Selecionado
        </Button>
      </div>
      
      <FormspreeForm 
        selectedFile={selectedFile}
        onSubmissionSuccess={handleSubmissionSuccess}
      />
    </div>
  );
}