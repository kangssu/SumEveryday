import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserErrorMessageObject } from './user.dto';
import { ErrorCode } from 'src/enum/errorCode.enum';
import { UserInfo } from 'src/decorator/userDecorator';
import { User } from 'src/entity/user.entity';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@Controller({
  path: '/api',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user/sign-up')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserErrorMessageObject> {
    const users = await this.userService.getUsers(createUserDto);
    const userDuplicateErrorMessageObject: UserErrorMessageObject = {};

    if (users.length !== 0) {
      for (const user of users) {
        if (user.id === createUserDto.id) {
          userDuplicateErrorMessageObject.idErrorMessage =
            ErrorCode.USER_ID_DUPLICATE;
        }
        if (user.nickname === createUserDto.nickname) {
          userDuplicateErrorMessageObject.nicknameErrorMessage =
            ErrorCode.USER_NICKNAME_DUPLICATE;
        }
      }
      return userDuplicateErrorMessageObject;
    }

    await this.userService.createUser(createUserDto);
    return userDuplicateErrorMessageObject;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  getUserByUserId(@UserInfo() user: User) {
    return this.userService.getUserByUserId(user.id);
  }
}
