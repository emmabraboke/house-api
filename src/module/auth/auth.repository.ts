import { Repository, EntityRepository } from 'typeorm'
import { BadRequestException, NotFoundException, UnauthorizedException} from '@nestjs/common'
import { Auth } from './auth.entity'
import { CreateUserDto } from './dtos/createUser.dto'
import { generateHash, validatePassword } from '../../utils/passwords'
import { generateToken } from '../../utils/jwt'
import { Response} from 'express'

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth>{
    
    async createUser(createUserDto: CreateUserDto): Promise<Auth>{
        const {username, password, role} = createUserDto

        const hash = await generateHash(password) 

        const user = this.create({username, password: hash, role})

        try {
            await this.save(user)
        } catch (error) {
            throw new BadRequestException(error.message)
        }
       

        return user
    }

    async signIn (createUserDto: CreateUserDto, res: Response) {
        const {username, password} = createUserDto


        const user = await this.findOne({username})

        if(!user){
            throw new UnauthorizedException()
        }
        
        const isValid = await validatePassword(password, user.password)

        if(!isValid){
            throw new UnauthorizedException()
        }

        const token = generateToken(username, res)

        return "successfully login"
    }

    async getUser (username: string): Promise<Auth> {


        const user = await this.findOne({username})

        if(!user){
            throw new NotFoundException()
        }
        

        return user
    }
}