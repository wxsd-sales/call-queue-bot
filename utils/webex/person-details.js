import fetch from 'node-fetch';
import handleResponse from '../handle-response.js';

function getPersonID() {
  return fetch(process.env.WEBEX_API_URL + '/people/me', {
    headers: {
      Authorization: 'Bearer ' + process.env.WEBEX_ACCESS_TOKEN
    },
    method: 'GET'
  })
    .then((r) => handleResponse(r))
    .then((r) => r.json())
    .then((r) => r.id);
}

export default getPersonID;
