import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
    @IsOptional() @IsString()  @IsNotEmpty() title : string
    @IsOptional() @IsString() @IsNotEmpty() description : string
    @IsOptional() @IsArray() subCategories : string[]
    @IsOptional() @IsArray() customerSupportLevels : number[]
}