import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from '../config/mailer.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() =>AuthModule),
    PassportModule,
    MailerModule.forRootAsync(new mailerConfig()),
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
