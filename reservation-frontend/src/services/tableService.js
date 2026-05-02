import { httpClient } from './httpClient';

export async function getTables() {
  return httpClient.get('/api/tables');
}
