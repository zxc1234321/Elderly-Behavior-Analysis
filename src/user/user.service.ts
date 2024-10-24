// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly mailerService: MailerService,
  ) {}

  // 사용자 생성
  async createUser(email: string, password: string): Promise<UserEntity> {
    const hashedPassword = await this.hashPassword(password);
    return await this.userRepository.createUser(email, hashedPassword);
  }

  // 이메일로 사용자 찾기
  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findByEmail(email);
  }

  // 비밀번호 해시화
  private async hashPassword(password: string): Promise<string> {
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
    user.status = 'deactivated';
    await this.userRepository.save(user);
  }
}
