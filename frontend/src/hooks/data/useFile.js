import { useState, useCallback, useEffect } from 'react';
import { fetchFile } from '../../services/fileService';

const useFile = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkImage = (filename) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    const extension = filename.split('.').pop().toLowerCase();
    setIsImage(imageExtensions.includes(extension));
  }

  const handleFetchFile = useCallback(async (filename) => {
    setLoading(true);
    checkImage(filename);
    setError(null);
    try {
      const url = await fetchFile(filename);
      setFileUrl(url);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fileUrl,
    loading,
    error,
    isImage,
    fetchFile: handleFetchFile
  };
};

export default useFile;
