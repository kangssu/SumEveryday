import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, UserErrorMessageObject } from '../user/user.dto';
import { User } from 'src/entity/user.entity';
import { ErrorMessage } from 'src/enum/errorMessage.enum';

@Controller({
  path: '/api/auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<{
    accessToken?: string;
    user?: User;
    userErrorMessageObject: UserErrorMessageObject;
  }> {
    const user = await this.authService.getUserByUserId(loginUserDto.id);
    const userLoginErrorMessageObject: UserErrorMessageObject = {};

    if (!user) {
      userLoginErrorMessageObject.idErrorMessage =
        ErrorMessage.USER_ID_NOTFOUND;
      return {
        userErrorMessageObject: userLoginErrorMessageObject,
      };
    } else {
      const validateUser = await this.authService.validateUser(
        loginUserDto,
        user,
      );

      return validateUser;
    }
  }
}
