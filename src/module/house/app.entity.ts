import {Column, PrimaryGeneratedColumn, Entity} from 'typeorm'
import { HouseType } from './enum/houseType.enum'
import { AvailableLocation } from './enum/location.enum'

@Entity()
export class House{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    location: AvailableLocation

    @Column()
    price: number

    @Column()
    houseType: HouseType
}