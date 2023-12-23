export const APP_URL = import.meta.env.APP_URL || "http://localhost:3000";
const API_URL = `${APP_URL}/api`;

export const REGISTER_URL = `${API_URL}/register`;
export const LOGIN_URL = `${API_URL}/login`;
export const LOGOUT_URL = `${API_URL}/logout`;
export const REFRESH_TOKEN_URL = `${API_URL}/refresh`;

export const LOCAL_STORAGE_ACCESS_TOKEN_KEY = "socialMediaAppAccessToken";
