import axios from 'axios';

// Function to get the access token from localStorage (if stored there)
export const getUserToken = () => {
    return localStorage.getItem('userToken') ? `Bearer ${localStorage.getItem('userToken')}` : null;
};


// Function to save tokens after login or refresh
export const saveTokens = (accessToken:any) => {
    localStorage.setItem('userToken', accessToken); // Store access token in localStorage
};

// Axios instance configuration
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_baseURL || 'http://localhost:4000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': getUserToken(), // Automatically get the token on initialization
    }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        console.error("Request interceptor error: ", error);
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    response => response, // Return the response if successful
    async error => {
        const originalRequest = error.config;

        // Check if the error is due to an expired access token (401)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const accessToken = getUserToken();

            if (!accessToken) {
                try {
                    const response = await axios.post(`${process.env.VITE_API_baseURL}/refreshToken`, {
                        token: accessToken
                    });

                    const newAccessToken = response.data.accessToken;

                    // Store the new access token in localStorage
                    saveTokens(newAccessToken);

                    // Update the original request with the new access token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    // Retry the original request with the new access token
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    console.error('Failed to refresh token', refreshError);
                    localStorage.removeItem('userToken');
                    window.location.href = '/login';
                }
            } else {
                console.log("No refresh token available. Redirecting to login");
                localStorage.removeItem('userToken');
                window.location.href = '/login';
            }
        }
        // Log other errors for easier debugging
        console.error("Response interceptor error: ", error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
