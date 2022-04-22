import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateFaqDto {
    @IsOptional() @IsString() @IsNotEmpty() title : string
    @IsOptional() @IsString() @IsNotEmpty() solution : string
    @IsOptional() @IsArray() @IsNotEmpty() categoryIds : number[]
}