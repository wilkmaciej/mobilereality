import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  getUserById(id: string) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  editUser(id: string, updateData: Partial<UserEntity>) {
    return this.userRepository.update(
      {
        id,
      },
      updateData,
    );
  }

  createUser(data: UserEntity) {
    return this.userRepository.save(data);
  }

  deleteUserById(id: string) {
    return this.userRepository.delete({
      id,
    });
  }

  getUsers() {
    return this.userRepository.find();
  }
}
