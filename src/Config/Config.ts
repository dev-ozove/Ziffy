const endpoint = '/api/firestore';
const BackendConstants = {
  Url: `https://ozove-backend.onrender.com${endpoint}`, //This URL is for developemnt which is uploaded on the render.com
  // Fallback URL in case the main one fails
  FallbackUrl: `https://ozove-backend.onrender.com${endpoint}`,
  // Timeout for API requests in milliseconds
  Timeout: 10000,
};

export default BackendConstants;
