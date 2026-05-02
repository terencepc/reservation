import { API_BASE_URL } from '../constants/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload?.message || 'Request failed';
    throw new Error(message);
  }

  return payload;
}

export const httpClient = {
  get(path, options) {
    return request(path, { method: 'GET', ...options });
  },
  post(path, body, options) {
    return request(path, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options
    });
  }
};
