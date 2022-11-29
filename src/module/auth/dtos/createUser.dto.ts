import { Role } from "../enum/role.enum"
import {IsNotEmpty} from 'class-validator'

export class CreateUserDto{
    
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string

    role: Role
}