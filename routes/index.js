import express from 'express';
import generateJwt from '../utils/webex/generate-jwt.js';
import getPersonId from '../utils/webex/person-details.js';
import createRoom from '../utils/webex/create-room.js';
import createMembership from '../utils/webex/create-membership.js';
import createResponseLink from '../utils/webex/create-response-link.js';
import sendSoapboxRequest from '../utils/webex/send-soapbox-request.js';
import createSipAddress from '../utils/webex/create-sip-address.js';

const router = express.Router();

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/virtual-nurse-request', async function (req, res) {
  console.info(new Date().toUTCString(), req.body);
  const getNurseLink = (type, roomId) =>
    generateJwt(type)
      .then((r) => r.json())
      .then((r) => Promise.all([r.token, getPersonId(r.token)]))
      .then(([accessToken, personId]) =>
        Promise.all([accessToken, createMembership(personId, roomId), createResponseLink(accessToken, roomId)])
      );
  const roomId = createRoom(process.env.WEBEX_TEAM_ID);
  const virtualNurseLink = roomId
    .then((s) => getNurseLink(req.body.labels ? req.body.labels.responder : 'Responder', s))
    .then(([accessToken, membership, responseLink]) => responseLink);
  const gradNurseLink = roomId
    .then((s) => getNurseLink(req.body.labels ? req.body.labels.requester : 'Requester', s))
    .then(([accessToken, membership, responseLink]) => sendSoapboxRequest(false, req.body.guid, responseLink, null));

  return Promise.all([virtualNurseLink, gradNurseLink])
    .then(([linkResponse, _]) => res.json({ redirect: linkResponse }))
    .catch(async (e) => {
      console.error(await e.json());

      return res.status(500).json({ error: e });
    });
});

router.post('/virtual-nurse-sip-address-request', async function (req, res) {
  console.info(new Date().toUTCString(), req.body);
  const getNurseLink = (type, roomId) =>
    generateJwt(type)
      .then((r) => r.json())
      .then((r) => Promise.all([r.token, getPersonId(r.token)]))
      .then(([accessToken, personId]) =>
        Promise.all([accessToken, createMembership(personId, roomId), createSipAddress(roomId)])
      );
  const roomId = createRoom(process.env.WEBEX_TEAM_ID);
  const virtualNurseLink = roomId
    .then((s) => getNurseLink(req.body.labels ? req.body.labels.responder : 'Responder', s))
    .then(([accessToken, membership, sipAddress]) => Promise.all([accessToken, sipAddress]));
  const gradNurseLink = roomId
    .then((s) => getNurseLink(req.body.labels ? req.body.labels.requester : 'Requester', s))
    .then(([accessToken, membership, sipAddress]) => sendSoapboxRequest(true, req.body.guid, sipAddress, accessToken));

  return Promise.all([virtualNurseLink, gradNurseLink])
    .then(([linkResponse, _]) => res.json({ sipAddress: linkResponse[1], hostToken: linkResponse[0] }))
    .catch(async (e) => {
      console.error(await e);

      return res.status(500).json({ error: e });
    });
});

router.post('/issue-token', async function (req, res) {
  console.info(new Date().toUTCString(), req.body);
  const getAccessToken = generateJwt(req.body ? req.body.name : 'User')
    .then((r) => r.json())
    .then((r) => r.token);

  return getAccessToken
    .then((accessToken) => res.json({ accessToken: accessToken }))
    .catch(async (e) => {
      console.error(await e.json());

      return res.status(500).json({ error: e });
    });
});

export default router;
