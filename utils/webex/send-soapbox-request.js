import fetch from 'node-fetch';
import handleResponse from '../handle-response.js';

function sendSoapboxRequest(isSipAddress, guid, link, accessToken) {
  var body;
  if (isSipAddress) {
    body = { room: guid, data: { event: 'room-sip-address', payload: link, guestToken: accessToken } };
  } else {
    body = { room: guid, data: { event: 'meeting-link', payload: link } };
  }

  return fetch(process.env.SOAPBOX_API_URL + '/message', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(body)
  })
    .then((r) => handleResponse(r))
    .then((r) => r.json());
}

export default sendSoapboxRequest;
