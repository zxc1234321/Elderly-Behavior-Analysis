// src/user/user.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  // 이메일로 사용자 조회
  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.findOne({ where: { email } });
  }

  // 사용자 생성
  async createUser(email: string, hashedPassword: string): Promise<UserEntity> {
    const user = this.create({ email, password: hashedPassword });
    return await this.save(user);
  }
}
