import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import AppDataSource from './datasource';
import { UserEntity } from './entities/user.entity';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(AppDataSource.options),
        TypeOrmModule.forFeature([UserEntity]),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const newUser = new UserEntity();
      newUser.email = 'johndoe@example.com';
      newUser.firstName = 'John';
      newUser.lastName = 'Doe';

      expect(appController.createUser(newUser)).not.toBeUndefined();
    });
  });
});
