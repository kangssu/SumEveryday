import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from 'src/entity/user.entity';
import { LoginUserDto, UserErrorMessageObject } from '../user/user.dto';
import * as bcrypt from 'bcrypt';
import { ErrorMessage } from 'src/enum/errorMessage.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  getUserByUserId(id: string) {
    return this.userService.getUserByUserId(id);
  }

  async validateUser(
    loginUserDto: LoginUserDto,
    user: User,
  ): Promise<{
    accessToken?: string;
    user?: User;
    userErrorMessageObject: UserErrorMessageObject;
  }> {
    const userLoginErrorMessageObject: UserErrorMessageObject = {};

    if (user) {
      const passwordCheck = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );

      if (!passwordCheck) {
        userLoginErrorMessageObject.passwordErrorMessage =
          ErrorMessage.USER_PASSWORD_NOTMATCH;
        return {
          userErrorMessageObject: userLoginErrorMessageObject,
        };
      } else {
        const payload = {
          id: user.id,
        };

        const accessToken = this.jwtService.sign(payload);
        return {
          accessToken: accessToken,
          user,
          userErrorMessageObject: {},
        };
      }
    }
  }
}
