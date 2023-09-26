import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserErrorMessageObject } from './user.dto';
import { ErrorCode } from 'src/enum/errorCode.enum';

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
}
