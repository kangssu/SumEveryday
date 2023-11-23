import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserErrorMessageObject } from './user.dto';
import { ErrorMessage } from 'src/enum/errorMessage.enum';
import { UserInfo } from 'src/decorator/userDecorator';
import { User } from 'src/entity/user.entity';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@Controller({
  path: '/api/users',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserErrorMessageObject> {
    const users = await this.userService.getUsers(createUserDto);
    const userDuplicateErrorMessageObject: UserErrorMessageObject = {};

    if (users.length !== 0) {
      for (const user of users) {
        if (user.id === createUserDto.id) {
          userDuplicateErrorMessageObject.idErrorMessage =
            ErrorMessage.USER_ID_DUPLICATE;
        }
        if (user.nickname === createUserDto.nickname) {
          userDuplicateErrorMessageObject.nicknameErrorMessage =
            ErrorMessage.USER_NICKNAME_DUPLICATE;
        }
      }
      return userDuplicateErrorMessageObject;
    }

    await this.userService.createUser(createUserDto);
    return userDuplicateErrorMessageObject;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserByUserId(@UserInfo() user: User) {
    return this.userService.getUserByUserId(user.id);
  }
}
