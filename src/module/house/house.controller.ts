import { Controller, Get, Query, Post, Body, UseGuards } from '@nestjs/common';
import { House } from './app.entity';
import { CreateHouseDto } from './dtos/createHouse.dto';
import { HouseDto } from './dtos/house.dto';
import { HouseService } from './house.service';
import {Roles} from '../../decorators/role.decorator'

@Controller('house')
export class HouseController {
    constructor( private houseService: HouseService){}

    @Get()
    async getHouses(@Query() houseDto: HouseDto): Promise<House[]>{
        return await this.houseService.getHouses(houseDto)
    }

    @Post()
    @Roles('admin')
    async createHouses(@Body() createHouseDto: CreateHouseDto): Promise<House>{
        return await this.houseService.createHouse(createHouseDto)
    }
    
}
