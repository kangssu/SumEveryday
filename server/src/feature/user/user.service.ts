import { HttpException, Injectable } from '@nestjs/common';
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

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: [{ id: createUserDto.id }, { nickname: createUserDto.nickname }],
    });

    if (user) {
      if (user.id) {
        throw new HttpException(`${user.id} 아이디 가 이미 존재합니다.`, 500);
      }
      if (user.nickname) {
        throw new HttpException(
          `${user.nickname} 닉네임이 이미 존재합니다.`,
          500,
        );
      }
    }

    const bcryptPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = bcryptPassword;
    this.userRepository.save(createUserDto);
  }
}
