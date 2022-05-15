const server = require('../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('Authentication Endpoints', () => {

  it('GET /api/users should require authentication', async () => {
    const res = await requestWithSupertest.get('/api/users');
      expect(res.status).toEqual(401);
      // expect(res.type).toEqual(expect.stringContaining('json'));
      // expect(res.body).toHaveProperty('users')
  });

  it('GET /api/data should require authentication', async () => {
    const res = await requestWithSupertest.get('/api/data');
      expect(res.status).toEqual(401);
  });

  it('GET /api/anomalies should require authentication', async () => {
    const res = await requestWithSupertest.get('/api/anomalies');
      expect(res.status).toEqual(401);
  });

  it('GET /api/comments should require authentication', async () => {
    const res = await requestWithSupertest.get('/api/comments');
      expect(res.status).toEqual(401);
  });

  it('GET /api/reports should require authentication', async () => {
    const res = await requestWithSupertest.get('/api/reports');
      expect(res.status).toEqual(401);
  });

});