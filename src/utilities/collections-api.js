// http://localhost:3001/api/collections
import { getToken } from './users-service'
import sendRequest from './send-request'

const BASE_URL = '/api/collections'

export function addCollection (category) {
  console.log('inside add collection in collections api')
  // Just send itemId for best security (no pricing)
  return sendRequest(`${BASE_URL}/add-category`, 'POST', category)
}
