import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AuthRepository } from './auth.repository';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AuthRepository])],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [TypeOrmModule.forFeature([AuthRepository]), AuthService],
})
export class AuthModule {}
 