import axios from "axios";

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';

export const getToken = async (mySessionId) => {
  const sessionId = await createSession(mySessionId, APPLICATION_SERVER_URL);
  return await createToken(sessionId);
}


export const createSession = async (sessionId) => {
  const data = JSON.stringify({ customSessionId: sessionId })
  const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', data, {
    headers: { 'Content-Type': 'application/json', },
  });
  console.log("세션이에요", response.data)
  return response.data
}

export const createToken = async (sessionId) => {
  const data = {}
  const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', data, {
    headers: { 'Content-Type': 'application/json', },
  });
  return response.data
}
