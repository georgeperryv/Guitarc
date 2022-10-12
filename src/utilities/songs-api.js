// http://localhost:3001/api/collections
import { getToken } from './users-service'
import sendRequest from './send-request'

const BASE_URL = '/api/songs'

export function addSong (songObject) {
  // Just send itemId for best security (no pricing)
  console.log('this is songObject', songObject)
  return sendRequest(`${BASE_URL}/add-song`, 'POST', songObject)
}

export function getAll () {
  return sendRequest(BASE_URL)
}
