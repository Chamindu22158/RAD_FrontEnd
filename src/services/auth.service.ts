import API, { setAccessToken } from "./api";

export const register = (payload: { name: string, email: string, password: string, role?: string }) => {
    return API.post("/auth/register", payload);
};

export const login = async (payload: { email: string, password: string }) => {
    const res = await API.post("/auth/login", payload);
    setAccessToken(res.data.accessToken);
    return res.data;
};

export const refresh = async () => {
    const res = await API.post("/auth/refresh", {}, { withCredentials: true });
    setAccessToken(res.data.accessToken);
    return res.data.accessToken;
};

export const logout = async () => {
    await API.post("/auth/logout");
    setAccessToken(null);
};
