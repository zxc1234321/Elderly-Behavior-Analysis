import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userRepository: UserRepository,
  ) { }
  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const url = `http://localhost:3000/verify?token=${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: '이메일 인증입니다.',
      template: '',
      context: { url },
    });
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
