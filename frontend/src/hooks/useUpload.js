import { useState } from 'react';
import { uploadFile, fetchFile } from '../services/uploadService';

const useUpload = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    setUploading(true);
    setError(null);

    try {
      const response = await uploadFile(file);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const loadFile = async (filePath) => {
    try {
      const blob = await fetchFile(filePath);
      setFileUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err);
    }
  };

  return { fileUrl, loadFile, handleUpload, uploading, error };
};

export default useUpload;
