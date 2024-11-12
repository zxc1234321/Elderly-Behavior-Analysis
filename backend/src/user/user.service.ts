import {
  Inject,
  Injectable, NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthDTO } from '../auth/dto/authDTO.dto';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './user.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  private generateToken(): string {
    return Math.random().toString(36).substr(2);
  }
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  // 이메일 인증
  async verifyEmail(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { userId: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const token = this.generateToken();
    user.verificationToken = token;

    // 데이터베이스에 저장
    await this.userRepository.save(user);

    // 이메일 전송
    await this.authService.sendVerificationEmail(user.email, token);
  }



  // 비밀번호 변경
  async resetPassword(userId: number, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { userId: userId } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    user.password = await this.userRepository.hashPassword(newPassword);
    await this.userRepository.save(user);
  }

  // 이메일 변경
  async changeEmail(userId: number, newEmail: string): Promise<void> {
    await this.userRepository.changeByEmail(userId, newEmail, false);
  }

  // 로그 아웃
  async logout(userId: number): Promise<void> {
    await this.userRepository.leave(userId);
  }

  // 탈퇴
  async deleteUser(userId: number): Promise<void> {
    await this.userRepository.deleteUser(userId);
  }
}
