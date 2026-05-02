import { httpClient } from './httpClient';

export async function loginAdmin(credentials) {
  return httpClient.post('/api/admin/login', credentials);
}
