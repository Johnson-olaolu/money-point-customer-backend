import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateFaqDto {
    @IsOptional() @IsString() @IsNotEmpty() question : string
    @IsOptional() @IsString() @IsNotEmpty() solution : string
    @IsOptional() @IsArray() @IsNotEmpty() categoryId : number
    @IsOptional() @IsNotEmpty() @IsString() subCategory : string
}