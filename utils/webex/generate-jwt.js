import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import uuid from 'uuid';
import handleResponse from '../handle-response.js';

function generateJWT(name) {
  const payload = {
    sub: 'guest-user' + uuid.v1(),
    name,
    iss: process.env.WEBEX_ORG_ID
  };

  const token = jwt.sign(payload, Buffer.from(process.env.WEBEX_JWT_SECRET, 'base64'), {
    expiresIn: '1h'
  });

  return fetch(process.env.WEBEX_API_URL + '/jwt/login', {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  }).then((r) => handleResponse(r));
}

export default generateJWT;
