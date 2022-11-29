import { HouseType } from "../enum/houseType.enum"
import { AvailableLocation } from "../enum/location.enum"
import { IsNotEmpty } from "class-validator"

export class HouseDto{
    @IsNotEmpty()
    location: string
    
    @IsNotEmpty()
    houseType: string
}