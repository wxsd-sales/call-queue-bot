import fetch from 'node-fetch';
import handleResponse from '../handle-response.js';

function createRoom(teamId, title = 'Nurse Support ' + new Date()) {
  const body = { title, teamId };
  return fetch(process.env.WEBEX_API_URL + '/rooms', {
    headers: {
      'Authorization': 'Bearer ' + process.env.WEBEX_ACCESS_TOKEN,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(body)
  })
    .then((r) => handleResponse(r))
    .then((r) => r.json())
    .then((r) => r.id);
}

export default createRoom;
