const axios = require('axios');

test('login test', async () => {
  const endpoint = 'http://localhost:3000/account/login';
  const data = {
    "username": "admin",
    "domainId": "default",
    "password": "devstack"
  };
  const response = await axios.post(endpoint, data);
  expect(response.status).toEqual(200);
  expect(response.data.user.name).toEqual('admin');
  const role = {
    name: 'admin',
    level: 0
  }
  expect(response.data.user.role).toEqual(role);
});