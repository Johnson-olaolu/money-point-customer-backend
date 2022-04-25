import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()  @IsNotEmpty() title : string
    @IsString() @IsNotEmpty() description : string
    @IsArray() @IsNotEmpty() subCategories : string[]
    @IsArray() @IsNotEmpty() customerSupportLevels : number[]
}