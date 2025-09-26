import { useState } from 'react';
import FileUpload from '../FileUpload';

export default function FileUploadExample() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="p-8">
      <FileUpload 
        onFileSelect={setSelectedFile}
        selectedFile={selectedFile}
      />
    </div>
  );
}