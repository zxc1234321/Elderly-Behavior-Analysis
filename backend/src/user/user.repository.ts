import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { AuthDTO } from '../auth/dto/authDTO.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
  // 비밀번호 해시화
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  // 사용자 생성
  async createUser(email: string, hashedPassword: string): Promise<UserEntity> {
    const user = this.create({ email, password: hashedPassword });

    console.log('Password Before Save:', user.password); // 저장 전 로그
    const savedUser = await this.save(user);
    console.log('Password After Save:', savedUser.password); // 저장 후 로그

    return savedUser;
  }

  // 회원 탈퇴
  async deleteUser(userId: number): Promise<void> {
    const user = await this.findOne({ where: { userId } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    await this.remove(user);
  }

  // 로그 아웃
  async leave(userId: number): Promise<void> {
    const user = await this.findOne({ where: { userId: userId } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    user.status = 'deactivated';
    await this.save(user);
  }
  // 이메일로 사용자 조회
  async findByEmail(email: string): Promise<UserEntity> {
    return await this.findOne({ where: { email } });
  }

  // 최초 이메일 인증 상태 변경
  // async setEmailVerification(userId: number, isVerified: boolean): Promise<void> {
  //   const user = await this.findOne({ where: { userId: userId } });
  //   if (!user) {
  //     throw new NotFoundException('사용자를 찾을 수 없습니다.');
  //   }
  //   user.emailVerified = isVerified;
  //   await this.save(user);
  // }

  // 이메일 변경
  async changeByEmail(userId: number, email: string, isVerified: boolean): Promise<any> {
    const user = await this.findOne({ where: { userId: userId } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    user.email = email;
    user.emailVerified = isVerified;
    await this.save(user);
  }

}