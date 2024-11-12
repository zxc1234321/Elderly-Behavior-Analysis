import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export namespace AuthDTO {
  export class SignUp {
    @IsEmail({}, { message: '올바른 이메일 형식이어야 합니다.' })
    email: string;

    @IsNotEmpty({ message: '비밀번호는 필수 항목입니다.' })
    @Matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      {
        message:
          '비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해 8~16글자 여야 합니다.',
      },
    )
    password: string;
  }

  export class SignIn {
    @IsEmail({}, { message: '올바른 이메일 형식이어야 합니다.' })
    @IsNotEmpty()
    email: string;

    @Length(8, 16)
    @IsNotEmpty()
    password: string;
  }
}
