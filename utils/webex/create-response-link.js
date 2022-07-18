function createResponseLink(accessToken, roomId) {
  const queryRecord = {
    headerToggle: 'false',
    destination: roomId,
    userType: 'licensed',
    token: accessToken
  };
  const usp = new URLSearchParams(queryRecord);

  return process.env.NINJA_API_URL + '/guest?' + usp;
}

export default createResponseLink;
