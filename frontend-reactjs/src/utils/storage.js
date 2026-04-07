const TOKEN_KEY = "access_token";
const USER_KEY = "auth_user";

// Token
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const setToken = (token) => sessionStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => sessionStorage.removeItem(TOKEN_KEY);

// User
export const getUser = () => JSON.parse(sessionStorage.getItem(USER_KEY));
export const setUser = (user) =>
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
export const removeUser = () => sessionStorage.removeItem(USER_KEY);

// Clear all auth
export const clearAuth = () => {
  removeToken();
  removeUser();
};
