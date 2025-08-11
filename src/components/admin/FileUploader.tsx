'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Loader2, Upload } from 'lucide-react';

const MAX_FILE_SIZE_KB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_KB * 1024;

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
       if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
        toast({
          variant: 'destructive',
          title: 'File Too Large',
          description: `Please select a file smaller than ${MAX_FILE_SIZE_KB}KB.`,
        });
        // Reset file input
        event.target.value = '';
        setFile(null);
      } else {
        setFile(selectedFile);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No File Selected',
        description: 'Please select a PDF file to upload.',
      });
      return;
    }
    
    if (file.size > MAX_FILE_SIZE_BYTES) {
       toast({
        variant: 'destructive',
        title: 'File Too Large',
        description: `The uploaded file must not be larger than ${MAX_FILE_SIZE_KB}KB.`,
      });
      return;
    }


    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/ingest', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.details || 'Failed to upload file.');
      }

      toast({
        title: 'Upload Successful',
        description: result.message,
      });
      setFile(null);
      // Reset the file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: error.message || 'An unknown error occurred.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          id="file-input"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="flex-grow"
          disabled={isUploading}
        />
        <Button type="submit" disabled={isUploading || !file}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
                <Upload className="mr-2 h-4 w-4" />
                Upload & Teach AI
            </>
          )}
        </Button>
      </div>
       {file && (
        <p className="text-sm text-muted-foreground">
          Selected: <span className="font-medium">{file.name}</span>
        </p>
      )}
    </form>
  );
}
