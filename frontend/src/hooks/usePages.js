import { useState, useEffect } from 'react';
import { fetchPages, fetchPageTypes, createPage, updatePage, deletePage } from '../services/pageService';

const usePages = (token) => {
  const [pages, setPages] = useState([]);
  const [pageTypes, setPageTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPages = async () => {
    try {
      setLoading(true);
      const [pagesResponse, pageTypesResponse] = await Promise.all([
        fetchPages(token),
        fetchPageTypes(token)
      ]);
      setPages(pagesResponse.data);
      setPageTypes(pageTypesResponse.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, [token]);

  const handleCreatePage = async (pageData) => {
    try {
      setLoading(true);
      const response = await createPage(token, pageData);
      setPages(prevPages => [...prevPages, response.data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePage = async (id, pageData) => {
    try {
      setLoading(true);
      const response = await updatePage(token, id, pageData);
      setPages(prevPages => prevPages.map(page => page.id === id ? response.data : page));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePage = async (id) => {
    try {
      setLoading(true);
      await deletePage(token, id);
      setPages(prevPages => prevPages.filter(page => page.id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    pages,
    pageTypes,
    loading,
    error,
    createPage: handleCreatePage,
    updatePage: handleUpdatePage,
    deletePage: handleDeletePage,
    reloadPages: loadPages // Esporta la funzione per ricaricare le pagine
  };
};

export default usePages;
