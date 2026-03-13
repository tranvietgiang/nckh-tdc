const TOKEN_KEY = "access_token";
const USER_KEY = "auth_user";

// Token
export const getToken = () => sessionStorage.getItem(TOKEN_KEY) || null;

export const setToken = (token) => {
  if (!token) return;
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => sessionStorage.removeItem(TOKEN_KEY);

// User
export const getUser = () => {
  const user = sessionStorage.getItem(USER_KEY);

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch  {
    sessionStorage.removeItem(USER_KEY);
    return null;
  }
};

export const setUser = (user) => {
  if (!user) return;
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeUser = () => sessionStorage.removeItem(USER_KEY);

// Clear all auth
export const clearAuth = () => {
  removeToken();
  removeUser();
};