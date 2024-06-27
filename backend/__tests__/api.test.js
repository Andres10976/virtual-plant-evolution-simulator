const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const server = app.listen();
const Plant = require('../models/Plant');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { dbName: 'test_plant_evolution' });
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

describe('Plant API', () => {
  let testPlantId;

  beforeEach(async () => {
    await Plant.deleteMany({});
    const plant = await Plant.create({
      name: 'Test Plant',
      genome: { height: 50, leafShape: 'oval', flowerColor: '#FF0000', resiliency: 70 }
    });
    testPlantId = plant._id;
  }, 10000);

  test('POST /api/plants - Create a new plant', async () => {
    const res = await request(server)
      .post('/api/plants')
      .send({
        name: 'Test Plant',
        genome: { height: 50, leafShape: 'oval', flowerColor: '#FF0000', resiliency: 70 }
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    testPlantId = res.body._id;
  });

  test('GET /api/plants - Get all plants', async () => {
    const res = await request(server).get('/api/plants');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test('GET /api/plants/:id - Get a specific plant', async () => {
    const res = await request(server).get(`/api/plants/${testPlantId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Test Plant');
  });

  test('PUT /api/plants/:id/grow - Grow a plant', async () => {
    const res = await request(server)
      .put(`/api/plants/${testPlantId}/grow`)
      .send({ temperature: 25, rainfall: 50, soilQuality: 0.7, sunlight: 12 });
    expect(res.statusCode).toBe(200);
    expect(res.body.growthStage).toBeGreaterThan(0);
  });

  test('POST /api/plants/breed - Breed two plants', async () => {
  const plant2 = await Plant.create({
    name: 'Test Plant 2',
    genome: { height: 70, leafShape: 'long', flowerColor: '#0000FF', resiliency: 80 }
  });

  const res = await request(server)
    .post('/api/plants/breed')
    .send({ plant1Id: testPlantId.toString(), plant2Id: plant2._id.toString() });
  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty('genome');
  expect(res.body.generation).toBe(2);
});

  test('GET /api/plants/:id - 404 for non-existent plant', async () => {
    const res = await request(server).get('/api/plants/nonexistentid');
    expect(res.statusCode).toBe(404);
  });

  test('PUT /api/plants/:id/grow - 404 for non-existent plant', async () => {
    const res = await request(server)
      .put('/api/plants/nonexistentid/grow')
      .send({ temperature: 25, rainfall: 50, soilQuality: 0.7, sunlight: 12 });
    expect(res.statusCode).toBe(404);
  });
});