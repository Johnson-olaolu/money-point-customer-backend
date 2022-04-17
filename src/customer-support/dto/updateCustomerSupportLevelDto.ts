import { IsNotEmpty,IsOptional, IsString } from "class-validator";

export class UpdateCustomerSupportLevelDto {
    @IsOptional() @IsString() @IsNotEmpty() name : string
    @IsOptional() @IsString() @IsNotEmpty() description : string
}