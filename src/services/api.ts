import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    withCredentials: true
});

let accessToken: string | null = null;
export const setAccessToken = (token: string | null) => { accessToken = token; };

API.interceptors.request.use(config => {
    if (accessToken && config.headers) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

// response interceptor that attempts refresh once on 401
type FailedRequest = {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(p => {
        if (error) p.reject(error);
        else if (token) p.resolve(token);
    });

    failedQueue = [];
};

API.interceptors.response.use(
    res => res,
    async err => {
        const originalRequest = err.config;
        if (err.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axios(originalRequest);
                });
            }
            originalRequest._retry = true;
            isRefreshing = true;
            try {
                const resp = await axios.post(`${API.defaults.baseURL}/auth/refresh`, {}, { withCredentials: true });
                const newToken = resp.data.accessToken;
                setAccessToken(newToken);
                processQueue(null, newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(err);
    }
);


export default API;
