import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

interface UserDuplicateObject {
  id?: string;
  nickname?: string;
}

@Controller({
  path: '/api',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user/sign-up')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserDuplicateObject> {
    const users = await this.userService.getUsers(createUserDto);
    const userDuplicateObject: UserDuplicateObject = {};

    if (users) {
      for (const user of users) {
        if (user.id === createUserDto.id) {
          userDuplicateObject.id = createUserDto.id;
        }
        if (user.nickname === createUserDto.nickname) {
          userDuplicateObject.nickname = createUserDto.nickname;
        }
      }
      return userDuplicateObject;
    }
    await this.userService.createUser(createUserDto);
    return userDuplicateObject;
  }
}
