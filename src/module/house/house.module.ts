import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import {TypeOrmModule} from '@nestjs/typeorm'
import { HouseRepository } from './house.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HouseRepository])],
  providers: [HouseService],
  controllers: [HouseController]
})
export class HouseModule {}
