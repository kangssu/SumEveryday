import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
export interface UserErrorMessageObject {
  idErrorMessage?: string;
  nicknameErrorMessage?: string;
  passwordErrorMessage?: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{5,10}$/g, {
    message: '영문자 + 5~10 글자여야 합니다.',
  })
  id!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?=\S+$).{8,20}/, {
    message: '소문자 + 숫자 + 특수문자 조합의 8~20 글자여야 합니다.',
  })
  password!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nickname!: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
