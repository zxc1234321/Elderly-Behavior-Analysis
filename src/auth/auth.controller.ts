import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './dto/authDTO.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/user.repository';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}
  @Post('/signin')
  async signin(@Body() authDTO: AuthDTO.SignIn) {
    const { email, password } = authDTO;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해 주세요.');
    }

    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (!isSamePassword) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해 주세요.');
    }

    const payload = {
      userId: user.userId,
    };

    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }
  @Get('verify')
  async verifyEmail(@Query('token') token: string): Promise<string> {
    const isVerified = await this.authService.verifyToken(token);
    if (!isVerified) {
      throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
    }
    return 'Email successfully verified!';
  }
}
