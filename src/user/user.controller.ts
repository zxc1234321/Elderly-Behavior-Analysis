import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthDTO } from '../auth/dto/authDTO.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
  ) {}
  @Post('/signup')
  async signup(@Body() authDTO: AuthDTO.SignUp) {
    const { email, password } = authDTO;

    const hasEmail = await this.userRepository.findByEmail(email);
    if (hasEmail) {
      throw new ConflictException('이미 사용중인 이메일 입니다.');
    }
    const hashedPassword = await this.userService.hashPassword(password);

    // UserController에서 회원 생성 시 호출 부분 수정
    await this.userRepository.createUser(email, hashedPassword);

    return '회원가입성공';
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async getProfile(@Req() req: any) {
    const user = req.user;
    return user;
  }
  @Post('/signin')
  async signin(@Body() authDTO: AuthDTO.SignIn) {
    return this.userService.signIn(authDTO);
  }
}
