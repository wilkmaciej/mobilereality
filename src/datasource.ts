import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'mobilereality',
  entities: [UserEntity],
  migrations: ['dist/migrations/*-migrations.js'],
});

export default AppDataSource;
