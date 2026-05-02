const AUTH_TOKEN_KEY = 'reservation.auth.token';

export const authStorage = {
  getToken() {
    return window.localStorage.getItem(AUTH_TOKEN_KEY) || '';
  },
  setToken(token) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  },
  clearToken() {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};
