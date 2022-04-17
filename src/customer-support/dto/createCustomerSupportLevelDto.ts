import { isNotEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerSupportLevelDto {
    @IsNotEmpty() @IsString() name : string;
    @IsNotEmpty() @IsString() description : string
}