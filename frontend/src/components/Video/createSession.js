import axios from "axios";

const createSession = async (sessionId, APPLICATION_SERVER_URL) => {
  const data = JSON.stringify({ customSessionId: sessionId })
  const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', data, {
    headers: { 'Content-Type': 'application/json', },
  });
  return response.data;
}

export default createSession