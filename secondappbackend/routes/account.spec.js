const axios = require('axios');

test('login test', async () => {
  const endpoint = 'http://localhost:3000';
  const data = {
    "username": "admin",
    "domainId": "default",
    "password": "devstack"
  };
  const response = await axios.post(`${endpoint}/account/login`, data);
  console.log(response.data);
  expect(response.status).toEqual(200);
  expect(response.data.name).toEqual('admin');
  const jwtToken = response.data.jwtToken;
  expect(jwtToken.length > 0).toBeTruthy();
  const headers = { Authorization: `Bearer ${jwtToken}`}
  const versionRes = await axios.get(`${endpoint}/api/v1/version`, {headers: headers})
  expect(versionRes.status).toEqual(200);

  const fraudToken = 'hello devstack';
  const fraudHeaders = { Authorization: `Bearer ${fraudToken}`}
  try {
    await axios.get(`${endpoint}/api/v1/version`, {headers: fraudHeaders})
  } catch(err) {
    expect(err.response.status).toEqual(401);
  }
});

test('login test w wrong password', async () => {
  const endpoint = 'http://localhost:3000';
  const data = {
    "username": "admin",
    "domainId": "default",
    "password": "hellodevstack"
  };
  try {
    await axios.post(`${endpoint}/account/login`, data);
  } catch(err) {
    expect(err.response.status).toEqual(401);
  }
});