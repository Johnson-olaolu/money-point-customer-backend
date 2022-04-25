import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateFaqDto {
    @IsString() @IsNotEmpty() question : string
    @IsString() @IsNotEmpty() solution : string
    @IsArray() @IsNotEmpty() categoryId : number
    @IsOptional() @IsNotEmpty() subCategory : string
}