// src/user/user.repository.ts
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
  // 이메일로 사용자 조회
  async findByEmail(email: string): Promise<UserEntity> {
    return await this.findOne({ where: { email } });
  }

  // 사용자 생성
  async createUser(email: string, hashedPassword: string): Promise<UserEntity> {
    const user = this.create({ email, password: hashedPassword });
    return await this.save(user);
  }
}
