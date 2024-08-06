import { useState, useEffect, useCallback } from 'react';
import { fetchAllPages, fetchPageTypes, createPage, updatePage, deletePage } from '../services/pageService';

const usePages = () => {
  const [pages, setPages] = useState([]);
  const [pageTypes, setPageTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPageTypes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchPageTypes();
      setPageTypes(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadAllPages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try{
      const response = await fetchAllPages();
      setPages(response.data);
    }catch(err){
      setError(err);
    }finally{
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllPages();
    loadPageTypes();
  }, [loadAllPages, loadPageTypes]);

  const handleCreatePage = useCallback(async (data) =>{
    setLoading(true);
    setError(null);
    try{
      await createPage(data);
      loadAllPages();
    }catch (err){
      setError(err);
    }finally{
      setLoading(false);
    }
  }, []); 

  const handleUpdatePage = useCallback(async (id, data) =>{
    setLoading(true);
    setError(null);
    try{
      await updatePage(id, data);
      loadAllPages();
    }catch (err){
      setError(err);
    }finally{
      setLoading(false);
    }
  }, []);

  const handleDeletePage = useCallback(async (id) =>{
    setLoading(true);
    setError(null);
    try{
      await deletePage(id);
      setPages(prevPages => prevPages.filter(page => page.id !== id));
    }catch (err){
      setError(err);
    }finally{
      setLoading(false);
    }
  }, []);

  return{
    pages,
    pageTypes,
    createPage: handleCreatePage,
    updatePage: handleUpdatePage,
    deletePage: handleDeletePage,
    loading,
    error
  }
};

export default usePages;
