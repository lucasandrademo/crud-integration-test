import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Users End-to-End Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Test User', email: 'test@example.com' })
      .expect(201)
      .expect(res => {
        expect(res.body.name).toBe('Test User');
        expect(res.body.email).toBe('test@example.com');
      });
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(res => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('/users/:id (GET)', async () => {
    const createdUser = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Test User', email: 'test@example.com' });

    return request(app.getHttpServer())
      .get(`/users/${createdUser.body.id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.id).toBe(createdUser.body.id);
      });
  });

  it('/users/:id (PATCH)', async () => {
    const createdUser = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Test User', email: 'test@example.com' });

    const updatedUser = { name: 'Updated User', email: 'test@example.com' };

    return request(app.getHttpServer())
      .patch(`/users/${createdUser.body.id}`)
      .send(updatedUser)
      .expect(200)
      .expect(res => {
        expect(res.body.name).toBe('Updated User');
        expect(res.body.email).toBe('test@example.com');
      });
  });

  it('/users/:id (DELETE)', async () => {
    const createdUser = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Test User', email: 'test@example.com' });

    return request(app.getHttpServer())
      .delete(`/users/${createdUser.body.id}`)
      .expect(200);
  });
});
