import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateFaqDto {
    @IsString() @IsNotEmpty() title : string
    @IsString() @IsNotEmpty() solution : string
    @IsArray() @IsNotEmpty() categoryIds : number[]
}