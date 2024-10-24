import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsEmail, IsIn, IsNotEmpty, Length } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  userId: number;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @Length(8, 16)
  @IsNotEmpty()
  password: string;

  @Column({ default: false })
  @IsBoolean()
  emailVerified: boolean;

  @Column({ default: 'user' })
  @IsIn(['user', 'admin'])
  role: string;

  @Column({ default: 'deactivated' })
  @IsIn(['active', 'deactivated', 'banned'])
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async beforeInsert() {
    if (!this.password) {
      throw new Error('비밀번호가 필요합니다.');
    }
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      throw new Error('비밀번호를 암호화하는데 실패하였습니다.');
    }
  }
}
