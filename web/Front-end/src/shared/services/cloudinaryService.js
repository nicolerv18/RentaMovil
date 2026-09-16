const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dz6ohgjub/image/upload';
const UPLOAD_PRESET = 'dav32erzro';
const API_KEY = '172463377995151';

export const cloudinaryService = {
    async uploadImage(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);
        formData.append('api_key', API_KEY);

        const res = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData });
        if (!res.ok) throw new Error('Error subiendo imagen a Cloudinary');

        const data = await res.json();
        return data.secure_url || data.url;
    },
};