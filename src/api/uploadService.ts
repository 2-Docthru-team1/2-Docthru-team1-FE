import { putRequest } from './api';

export const uploadImage = async (uploadUrl: string, image: File) => {
  if (!uploadUrl) {
    return {
      success: false,
      error: 'Upload URL not provided'
    };
  }

  try {
    const response = await putRequest(uploadUrl, image, {
      'Content-Type': image.type || 'application/octet-stream'
    });

    if (response.status !== 200) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`
      };
    }

    return {
      success: true
    };
  } catch (error) {
    return {
      success: false,
      error
    };
  }
};
