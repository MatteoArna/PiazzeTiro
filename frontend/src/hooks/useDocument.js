import { useCallback, useEffect, useState } from "react";
import { uploadDocument, fetchDocumentsByUser, deleteDocument } from "../services/documentService";

const useDocument = (userEmail) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadDocuments = useCallback(async (userEmail) => {
        if (!userEmail) return;
        try {
            setLoading(true);
            const response = await fetchDocumentsByUser(userEmail);
            setDocuments(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        if (userEmail) {
            loadDocuments(userEmail);
        }
    }, [userEmail, loadDocuments]);

    const handleUploadDocument = async (documentData) => {
        try {
            setLoading(true);
            const response = await uploadDocument(documentData);
            setDocuments(prevDocuments => [...prevDocuments, response.data]);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteDocument = async (documentId) => {
        try {
            setLoading(true);
            await deleteDocument(documentId);
            setDocuments(prevDocuments => prevDocuments.filter(document => document.id !== documentId));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    return {
        documents,
        loading,
        error,
        uploadDocument: handleUploadDocument, 
        deleteDocument: handleDeleteDocument
    };
}

export default useDocument;