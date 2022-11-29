import {PrimaryGeneratedColumn, Column, Entity} from 'typeorm'
import { Role } from './enum/role.enum'

@Entity()
export class Auth{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    username: string

    @Column()
    password: string

    @Column({type: 'enum', enum: Role, default: Role.user})
    role: Role
}
