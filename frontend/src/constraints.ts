const APP_URL = import.meta.env.APP_URL || "http://localhost:3000";
const API_URL = `${APP_URL}/api`;

export const REGISTER_URL = `${API_URL}/register`;
export const LOGIN_URL = `${API_URL}/login`;
export const LOGOUT_URL = `${API_URL}/logout`;
