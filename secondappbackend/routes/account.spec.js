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
  // const role = {
  //   name: 'admin',
  //   level: 0
  // }
  // expect(response.data.user.role).toEqual(role);

  const headers = { Authorization: `Bearer ${jwtToken}`}
  const versionRes = await axios.get(`${endpoint}/api/v1/version`, {headers: headers})
  expect(versionRes.status).toEqual(200);
});