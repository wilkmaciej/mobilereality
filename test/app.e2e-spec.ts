import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from 'src/entities/user.entity';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userRepo: Repository<UserEntity>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    userRepo = app.get('UserEntityRepository');
  });

  describe('create user', () => {
    beforeEach(() => {
      userRepo.delete({});
    });

    test('no data', () => {
      return request(app.getHttpServer()).post('/users').expect(400);
    });

    test('incomplete data', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'johndoe@example.com',
          lastName: 'Doe',
        })
        .expect(400);
    });

    test('too long firstName', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'johndoe@example.com',
          firstName: 'JohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohn',
          lastName: 'Doe',
        })
        .expect(400);
    });

    test('wrong email', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          email: '123',
          firstName: 'John',
          lastName: 'Doe',
        })
        .expect(400);
    });

    test('correct data', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'johndoe@example.com',
          firstName: 'John',
          lastName: 'Doe',
        })
        .expect(201);
    });
  });

  afterAll(() => {
    userRepo.delete({});
  });
});
