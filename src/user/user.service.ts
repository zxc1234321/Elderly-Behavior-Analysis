// src/user/user.service.ts
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthDTO } from '../auth/dto/authDTO.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  // 사용자 생성
  async create(email: string, password: string): Promise<UserEntity> {
    const hashedPassword = await this.hashPassword(password);
    return await this.userRepository.createUser(email, hashedPassword);
  }

  // 이메일로 사용자 찾기
  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findByEmail(email);
  }

  // 비밀번호 해시화
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  // 비밀번호 변경
  async resetPassword(userId: number, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    user.password = await this.hashPassword(newPassword);
    await this.userRepository.save(user);
  }

  // 회원 탈퇴
  async leave(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    await this.userRepository.save(user);
  }
  // 로그인 검증
  async isOK(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('잘못된 이메일입니다.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    return user;
  }
  // 로그인
  async signIn(authDTO: AuthDTO.SignIn) {
    const { email, password } = authDTO;

    // const user = await this.userRepository.findByEmail(email);
    // if (!user) {
    //   throw new UnauthorizedException('잘못된 이메일입니다.');
    // }
    //
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    // }
    const user = await this.isOK(email, password);

    const payload = { userId: user.userId, email: user.email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
