import { Injectable } from '@nestjs/common';
import { House } from './app.entity';
import { CreateHouseDto } from './dtos/createHouse.dto';
import { HouseDto } from './dtos/house.dto';
import { HouseRepository } from './house.repository';

@Injectable()
export class HouseService {
    constructor(private houseRepositry: HouseRepository){}

    async getHouses(houseDto: HouseDto): Promise<House[]>{
        return this.houseRepositry.getHouses(houseDto)
    }

    async createHouse(createHouseDto: CreateHouseDto): Promise<House>{
        return this.houseRepositry.createHouses(createHouseDto)
    }
}
