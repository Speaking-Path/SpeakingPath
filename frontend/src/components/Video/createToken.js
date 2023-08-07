import axios from "axios";


const createToken = async (sessionId, APPLICATION_SERVER_URL) => {
  const data = {}
  const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', data, {
    headers: { 'Content-Type': 'application/json', },
  });
  return response.data;
}

export default createToken