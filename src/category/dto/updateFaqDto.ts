import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateFaqDto {
    @IsOptional() @IsString() @IsNotEmpty() question : string
    @IsOptional() @IsString() @IsNotEmpty() solution : string
    @IsOptional() @IsNumber() @IsNotEmpty() categoryId : number
    @IsOptional() @IsNotEmpty() @IsString() subCategory : string
}