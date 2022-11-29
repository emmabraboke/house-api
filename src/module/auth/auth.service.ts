import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Auth } from './auth.entity';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class AuthService {
    constructor(private authRepository: AuthRepository){}

    async signUp(createUserDto: CreateUserDto): Promise<Auth>{
        return this.authRepository.createUser(createUserDto)
    }
    async signIn(createUserDto: CreateUserDto, res: Response){
    
        return this.authRepository.signIn(createUserDto, res)
    }

    async getUser(username: string): Promise<Auth>{
        return this.authRepository.getUser(username)
    }
}
