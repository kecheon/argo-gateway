const axios = require('axios');
const endpoint = 'http://localhost:3000'
const data = { username: 'admin', password: 'devstack', domainId: 'default'};

describe('Namespace endpoints', () => {
  
  test('get access token', async () => {
    const res = await axios.post(`${endpoint}/account/login`, data);
    const accessToken = res.data.jwtToken;
    expect(res.status).toEqual(200);
    expect(accessToken.length > 0).toBeTruthy();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }

    const nsRes = await axios.get(`${endpoint}/namespace`, { headers });
    expect(nsRes.status).toEqual(200);
    console.log(nsRes.data);
  });
})