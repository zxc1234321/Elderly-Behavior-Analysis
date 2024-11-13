import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, UnauthorizedException, NotFoundException } from '@nestjs/common';
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

  // 이메일 인증 요청 엔드포인트 추가 로직
  @Post('/send-email-verification')
  async sendEmailVerfication(@Body('email') email: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if(!user) {
      console.log('User not found:', email);
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 사용자 정보로 payload 생성
    const payload = { userId: user.userId, email: user.email };
    const token = this.authService.generateToken(payload);

    user.verificationToken = token;
    await this.userRepository.save(user);

    // 인증 이메일 전송
    // console.log('Sending verification email to:', email);
    await this.authService.sendVerificationEmail(email, token);
    // console.log('Verification email sent successfully');

    return '이메일 인증이 발송되었습니다.';

    // console.log({
    //   host: process.env.SMTP_HOST,
    //   port: process.env.SMTP_PORT,
    //   secure: process.env.SMTP_SSL,
    //   user: process.env.SMTP_EMAIL,
    //   pass: process.env.SMTP_PASSWORD ? '*******' : 'No password provided',
    // });
  }
  
  @Post('/signin')
  async signin(@Body() authDTO: AuthDTO.SignIn) {
    const { email, password } = authDTO;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('이메일을 확인 해 주세요.');
    }

    console.log('Stored Hashed Password:', user.password);
    console.log('Provided Password:', password);

    const isSamePassword = await bcrypt.compare(password, user.password);
    console.log('Password Match:', isSamePassword); // 로그로 비교 결과 출력

    if (!isSamePassword) {
      throw new UnauthorizedException('비밀번호를 확인 해 주세요.');
    }

    const payload = { userId: user.userId, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, userId: user.userId, role: user.role };
  }  @Get('verify')
  async verifyEmail(@Query('token') token: string): Promise<string> {
    const isVerified = await this.authService.verifyToken(token);
    if (!isVerified) {
      throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
    }
    return 'Email successfully verified!';
  }
}
