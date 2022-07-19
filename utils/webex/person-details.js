import fetch from 'node-fetch';
import handleResponse from '../handle-response.js';

function getPersonId(accessToken) {
  return fetch(process.env.WEBEX_API_URL + '/people/me', {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
    .then((r) => handleResponse(r))
    .then((r) => r.json())
    .then((r) => r.id);
}

export default getPersonId;
