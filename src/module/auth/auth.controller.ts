import { Controller, Post, Body, Res, Param, Get } from '@nestjs/common';
import { Auth } from './auth.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @Get('/:username')
    async getUser(@Param('username') username: string): Promise<Auth>{
        return this.authService.getUser(username)
    }
    @Post()
    async signUp(@Body() createUserDto: CreateUserDto): Promise<Auth> {
        return await this.authService.signUp(createUserDto)
    }

    
    @Post('/login')
    async signIn(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
        return await this.authService.signIn(createUserDto, res )
    }
}
