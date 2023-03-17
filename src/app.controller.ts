import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import { ApiOkResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UserEntity } from './entities/user.entity';

class editUserDto extends PartialType(UserEntity) {}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users/:userId')
  @ApiOkResponse({
    type: UserEntity,
  })
  async getUserById(
    @Param('userId', ParseUUIDPipe)
    id: string,
  ) {
    const user = await this.appService.getUserById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  @Patch('/users/:userId')
  editUser(
    @Param('userId', ParseUUIDPipe)
    id: string,
    @Body() updateData: editUserDto,
  ) {
    return this.appService.editUser(id, updateData);
  }

  @Post('/users')
  @ApiOkResponse({
    type: UserEntity,
  })
  createUser(@Body() data: UserEntity) {
    return this.appService.createUser(data);
  }

  @Delete('/users/:userId')
  deleteUserById(
    @Param('userId', ParseUUIDPipe)
    id: string,
  ) {
    return this.appService.deleteUserById(id);
  }

  @Get('/users')
  @ApiOkResponse({
    type: UserEntity,
    isArray: true,
  })
  getUsers() {
    return this.appService.getUsers();
  }
}
