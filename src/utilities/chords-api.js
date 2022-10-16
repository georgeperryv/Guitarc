import sendRequest from './send-request'

const BASE_URL = '/api/chords'

export function getAllChords (activeSong) {
  // Just send itemId for best security (no pricing)
  //   console.log('this is songObject', songObject)
  return sendRequest(`${BASE_URL}/song-panel/${activeSong}`, 'GET')
}

export function getAllIndependentChords () {
  // Just send itemId for best security (no pricing)
  //   console.log('this is songObject', songObject)
  return sendRequest(`${BASE_URL}/chord-library`)
}

export function changeLearnedStatus (chordId) {
  // Just send itemId for best security (no pricing)
  //   console.log('this is songObject', songObject)
  return sendRequest(`${BASE_URL}/change-learned-status/${chordId}`, 'PUT')
}
