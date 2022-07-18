import fetch from 'node-fetch';
import handleResponse from '../handle-response.js';

function createMembership(personId, roomId) {
  const body = { roomId, personId };

  return fetch(process.env.WEBEX_API_URL + '/memberships', {
    headers: {
      'Authorization': 'Bearer ' + process.env.WEBEX_ACCESS_TOKEN,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(body)
  })
    .then((r) => handleResponse(r))
    .then((r) => r.json());
}

export default createMembership;
