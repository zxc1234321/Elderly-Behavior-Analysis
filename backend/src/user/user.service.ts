import {
  Inject,
  Injectable, NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
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

  // 회원가입
  async signUp(authDTO: AuthDTO.SignUp): Promise<UserEntity> {
    const { email, password } = authDTO;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('이미 등록된 이메일입니다.');
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.userRepository.createUser(email, hashedPassword);

    return newUser;
  }
  // 로그인 검증
  async isOK(email: string, password: string, /*userId: number*/): Promise<any> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('잘못된 이메일입니다.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Stored hashed password:', user.password);
    console.log('Provided password:', password);
    if (!isMatch) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    return user;
  }
  // 로그인
  async signIn(authDTO: AuthDTO.SignIn) {
    const { email, password } = authDTO;
    const user = await this.isOK(email, password);

    const payload = { userId: user.userId, email: user.email };
    user.status = 'active';
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
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

  // 비밀번호 해시화
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  // 비밀번호 변경
  async resetPassword(userId: number, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { userId: userId } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    user.password = await this.hashPassword(newPassword);
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
