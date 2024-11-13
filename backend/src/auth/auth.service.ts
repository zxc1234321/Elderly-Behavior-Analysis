import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly userRepository: UserRepository,
  ) { }

  // JWT 토큰 생성 메서드
  generateToken(payload: { userId: number; email: string}): string {
    return this.JwtService.sign(payload);
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const url = `http://localhost:3000/verify?token=${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: '이메일 인증입니다.',
      template: './email-verification', // 템플릿 파일 예시로 정의
      context: { url },
    });
  } catch(error) {
    console.error('Failed to send verfication email:', error);
    throw new Error('이메일 전송에 실패');
  }
  async verifyToken(token: string): Promise<boolean> {
    // Retrieve and validate the token from your database
    const user = await this.userRepository.findOne({ where: { verificationToken: token } });
    if (user) {
      user.emailVerified = true;
      user.verificationToken = null;
      await this.userRepository.save(user);
      return true;
    }
    return false;
  }
}
