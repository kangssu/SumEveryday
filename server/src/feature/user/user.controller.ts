import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller({
  path: '/api',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user/sign-up')
  createUser(@Body() createUserDto: CreateUserDto) {
    this.userService.createUser(createUserDto);
  }
}
