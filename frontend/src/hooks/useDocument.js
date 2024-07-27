import { useState } from "react";
import { uploadDocument, fetchDocumentsByUser, deleteDocument } from "../services/documentService";

const useDocument = (token) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadDocuments = async (userId) => {
        if (!userId) return;
        try {
            setLoading(true);
            const response = await fetchDocumentsByUser(token, userId);
            setDocuments(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadDocument = async (documentData) => {
        try {
            setLoading(true);
            const response = await uploadDocument(token, documentData);
            setDocuments(prevDocuments => [...prevDocuments, response.data]);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteDocument = async (documentId) => {
        try {
            setLoading(true);
            await deleteDocument(token, documentId);
            setDocuments(prevDocuments => prevDocuments.filter(document => document.id !== documentId));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        documents,
        loading,
        error,
        uploadDocument: handleUploadDocument,
        deleteDocument: handleDeleteDocument,
        loadDocuments // Esporta la funzione per caricare i documenti
    };
}

export default useDocument;