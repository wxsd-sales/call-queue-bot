import fetch from 'node-fetch';
import handleResponse from '../handle-response.js';

function createRoom(accessToken, title = new Date()) {
  const body = { title };
  console.log('create room');
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
