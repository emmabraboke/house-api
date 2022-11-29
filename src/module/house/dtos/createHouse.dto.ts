import { HouseDto } from "./house.dto"
import { IsNotEmpty } from "class-validator"
import { HouseType } from "../enum/houseType.enum"
import { AvailableLocation } from "../enum/location.enum"

export class CreateHouseDto extends HouseDto{
    @IsNotEmpty()
    location: AvailableLocation
    
    @IsNotEmpty()
    houseType: HouseType

    @IsNotEmpty()
    price: number
}