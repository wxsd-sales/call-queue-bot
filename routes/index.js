import express from 'express';
import generateJwt from '../utils/webex/generate-jwt.js';
import getPersonId from '../utils/webex/person-details.js';
import createRoom from '../utils/webex/create-room.js';
import createMembership from '../utils/webex/create-membership.js';
import createResponseLink from '../utils/webex/create-response-link.js';
import sendSoapboxRequest from '../utils/webex/send-soapbox-request.js';

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
    .then((s) => getNurseLink(req.body.labels ? req.body.labels.responder : 'Virtual Nurse', s))
    .then(([accessToken, membership, responseLink]) => responseLink);
  const gradNurseLink = roomId
    .then((s) => getNurseLink(req.body.labels ? req.body.labels.requester : 'Grad Nurse', s))
    .then(([accessToken, membership, responseLink]) => sendSoapboxRequest(req.body.guid, responseLink));

  return Promise.all([virtualNurseLink, gradNurseLink])
    .then(([linkResponse, _]) => res.json({ redirect: linkResponse }))
    .catch(async (e) => {
      console.error(await e.json());

      return res.status(500).json({ error: e });
    });
});

export default router;
