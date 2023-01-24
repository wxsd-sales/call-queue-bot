import fetch from 'node-fetch';
import handleResponse from '../handle-response.js';

function createSipAddress(roomId) {
  return fetch(process.env.WEBEX_API_URL + '/rooms/' + roomId + '/meetingInfo', {
    headers: {
      'Authorization': 'Bearer ' + process.env.WEBEX_ACCESS_TOKEN,
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
    .then((r) => handleResponse(r))
    .then((r) => r.json())
    .then((r) => r.sipAddress);
}

export default createSipAddress;
