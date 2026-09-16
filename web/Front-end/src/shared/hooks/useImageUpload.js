import { useState } from 'react';
import { cloudinaryService } from '../services/cloudinaryService';

export function useImageUpload() {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

    async function uploadImage(file) {
        setIsUploading(true);
        setError(null);
        try {
            return await cloudinaryService.uploadImage(file);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsUploading(false);
        }
    }

    return { uploadImage, isUploading, error };
}