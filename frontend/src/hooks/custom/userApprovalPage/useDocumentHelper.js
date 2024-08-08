import { useState, useEffect, useCallback } from "react";
import useDocument from "../../useDocument";
import useUser from "../../useUser";
import { saveAs } from 'file-saver';
import { fetchFile } from "../../../services/fileService";

const useDocumentHelper = (userEmail) => {
    const { documents, loading, error, uploadDocument, deleteDocument } = useDocument(userEmail);
    const { user, setUserToNextStatus, loadUserById } = useUser(userEmail);

    const [status, setStatus] = useState(null);

    const getStatus = (statusId) => {
        switch (statusId) {
            case 0:
                return 'toLoad';
            case 1:
                return 'waiting';
            case 2:
                return 'toLoad';
            case 3:
                return 'waiting';
            case 4:
                return 'accepted';
            default:
                return 'unknown';
        }
    };

    

    useEffect(() => {
        if (user) {
            setStatus(getStatus(user.status));
        }
    }, [user, documents]);

    const handleUploadDocument = async (documentData) => {
        try {
            const currentYear = new Date().getFullYear(); 
            const renamedFile = new File([documentData], `${documentData.name}-${userEmail}-${currentYear}.pdf`, {
                type: 'application/pdf'
            });

            const data = new FormData();
            data.append('userId', userEmail);
            data.append('file', renamedFile, renamedFile.name);

            await uploadDocument(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteDocument = async (file) => {
        try {
            documents.forEach(doc => {
                if (doc.filePath === file) {
                    deleteDocument(doc.id);
                    return;
                }
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleDownloadFile = async (file) => {
        try {
            const filePath = process.env.REACT_APP_API_URL + "/uploads/"+ file;
            const blob = await fetchFile(filePath);
            saveAs(blob, file);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmitDocuments = useCallback(async () => {
        try {
            await setUserToNextStatus(userEmail);
            // Ricarica i dati dell'utente dopo aver aggiornato lo stato
            await loadUserById(userEmail);
        } catch (err) {
            console.error(err);
        }
    }, [setUserToNextStatus, loadUserById, userEmail]);

    return {
        documents,
        loading,
        error,
        status,
        uploadDocument: handleUploadDocument,
        deleteDocument: handleDeleteDocument,
        downloadFile: handleDownloadFile,
        submitDocuments: handleSubmitDocuments
    };
};

export default useDocumentHelper;
