import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFaqDto {
    @IsString() @IsNotEmpty() question : string
    @IsString() @IsNotEmpty() solution : string
    @IsNumber() @IsNotEmpty() categoryId : number
    @IsOptional() @IsNotEmpty() subCategory : string
}