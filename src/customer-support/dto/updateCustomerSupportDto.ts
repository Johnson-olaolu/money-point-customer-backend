import { IsNumber, isNumber } from "class-validator";

export class UpdateCustomerSupportDto {
    @IsNumber() customerSupportLevelId : number
}