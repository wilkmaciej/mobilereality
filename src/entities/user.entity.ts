import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty({
    required: true,
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsString()
  email: string;

  @Column({
    length: 50,
  })
  @ApiProperty({
    required: true,
    example: 'John',
  })
  @IsString()
  @MaxLength(50)
  firstName: string;

  @Column({
    length: 50,
  })
  @ApiProperty({
    required: true,
    example: 'Doe',
  })
  @IsString()
  @MaxLength(50)
  lastName: string;
}
