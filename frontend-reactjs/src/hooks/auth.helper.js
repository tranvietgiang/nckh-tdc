import { getUser, getToken } from "../utils/storage";

export const isLoggedIn = () => {
  const user = getUser();
  const token = getToken();

  return !!user && !!token;
};
