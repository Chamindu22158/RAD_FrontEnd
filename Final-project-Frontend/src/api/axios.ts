import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token?: string) => void; reject: (err?: any) => void; }> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(p => {
        if (error) p.reject(error);
        else p.resolve(token!);
    });
    failedQueue = [];
};

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

API.interceptors.response.use(
    res => res,
    async (err) => {
        const originalRequest = err.config;
        if (err.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return axios(originalRequest);
                }).catch(err2 => Promise.reject(err2));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshRes = await axios.post('http://localhost:8000/api/auth/refresh', {}, { withCredentials: true });
                const newToken = refreshRes.data.accessToken;
                localStorage.setItem('accessToken', newToken);
                API.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
                processQueue(null, newToken);
                return API(originalRequest);
            } catch (e) {
                processQueue(e, null);
                // optional: clear local storage, redirect to login
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                return Promise.reject(e);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(err);
    }
);

export default API;
