import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './dto/authDTO.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/user.repository';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
@Controller('auth')
export class AuthController {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}
  @Post('/signin')
  async signin(@Body() authDTO: AuthDTO.SignIn) {
    const { email, password } = authDTO;
    const user = await this.userService.isOK(email, password);

    const payload = { userId: user.userId, email: user.email };
    user.status = 'active';
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
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
