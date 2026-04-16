import { getUser, getToken } from "./storage";

export const isLoggedIn = () => {
  const user = getUser();
  const token = getToken();

  return !!user && !!token;
};
