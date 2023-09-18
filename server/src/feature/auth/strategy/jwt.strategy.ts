import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/feature/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any): Promise<Pick<User, 'id' | 'nickname'>> {
    const user = await this.userService.getUser(payload.id);
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('User Not Found');
    }
  }
}
