import { Repository, EntityRepository } from 'typeorm'
import { House } from './app.entity';
import { CreateHouseDto } from './dtos/createHouse.dto';
import { HouseDto } from './dtos/house.dto';
import { BadRequestException, NotFoundException} from '@nestjs/common'

@EntityRepository(House)
export class HouseRepository extends Repository<House>{
    async getHouses(houseDto: HouseDto): Promise<House[]> {
        const { location, houseType } = houseDto
        const query = this.createQueryBuilder('house')


        if (location) {
            query.andWhere('house.location = LOWER(:location)', { location });
        }

        if (houseType) {
            query.andWhere('house.houseType = LOWER(:houseType)', { houseType });
        }


        try {
            const houses = await query.select('AVG(house.price)', 'averagePrice').getRawOne()

            if(!houses.averagePrice){
                throw new NotFoundException()
            }

            return {...houses, location: location?.toLowerCase()}
        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async createHouses(createHouseDto: CreateHouseDto): Promise<House> {
       
        const { houseType, location, price } = createHouseDto
        const house = this.create({ houseType, location, price })
        
        try {
            await this.save(house)      
        } catch (error) {
            throw new BadRequestException(error.message)
        }


        return house
    }
}
