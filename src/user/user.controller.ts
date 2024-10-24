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
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/signup')
  async signup(@Body() authDTO: AuthDTO.SignUp) {
    const { email } = authDTO;

    const hasEmail = await this.userService.findByEmail(email);
    if (hasEmail) {
      throw new ConflictException('이미 사용중인 이메일 입니다.');
    }

    await this.userService.create(authDTO);

    return '회원가입성공';
  }
  @UseGuards(AuthGuard())
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
