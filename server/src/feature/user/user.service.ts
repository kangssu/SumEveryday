import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const bcryptPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = bcryptPassword;
    const user = await this.userRepository.save(createUserDto);

    return user;
  }

  getUsers(createUserDto: CreateUserDto): Promise<User[]> {
    const users = this.userRepository.find({
      where: [{ id: createUserDto.id }, { nickname: createUserDto.nickname }],
    });

    return users;
  }

  getUserByUserId(id: string): Promise<User> {
    const user = this.userRepository.findOne({
      where: { id },
    });
    return user;
  }
}
