import {
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthDTO } from '../auth/dto/authDTO.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
  ) {
  }

  @Post('/signup')
  async signup(@Body() authDTO: AuthDTO.SignUp) {
    const { email, password } = authDTO;

    const hasEmail = await this.userRepository.findByEmail(email);
    if (hasEmail) {
      throw new ConflictException('이미 사용중인 이메일 입니다.');
    }

    // 비밀번호 해싱
    const hashedPassword = await this.userRepository.hashPassword(password);
    console.log('Hashed Password (Signup):', hashedPassword); // 해싱된 비밀번호 로그

    // 사용자 생성
    await this.userRepository.createUser(email, hashedPassword);
    return '회원가입 성공';
  }
}