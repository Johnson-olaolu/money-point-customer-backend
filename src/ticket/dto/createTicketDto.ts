import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"


export class CreateTicketDto {
    @IsString() @IsNotEmpty() title : string
    @IsString() @IsNotEmpty() description : string
    @IsString() @IsNotEmpty() @IsEmail() email: string
    @IsNumber() @IsNotEmpty() categoryId : number
    @IsString() @IsNotEmpty() subCategory: string
    @IsOptional() @IsString() @IsNotEmpty() agentEmail : string
}

