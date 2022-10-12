// http://localhost:3001/api/collections
import { getToken } from './users-service'
import sendRequest from './send-request'

const BASE_URL = '/api/songs'

export function addSong (song) {
  console.log('inside add song in songs api')
  // Just send itemId for best security (no pricing)
  return sendRequest(`${BASE_URL}/add-song`, 'POST', song)
}

export function getAll () {
  return sendRequest(BASE_URL)
}
