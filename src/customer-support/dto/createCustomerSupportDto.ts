import { IsEmail, isNotEmpty, IsNotEmpty, isNumber, IsNumber, IsString, MaxLength, MinLength} from "class-validator";

export class CreateCustomerSupportDto {
    @IsString() @MinLength(3)  firstName: string
    @IsString() @MinLength(3)  lastName : string
    @IsString() @IsEmail() email : string;
    @IsString() @MinLength(6) @MaxLength(20) password : string
    @IsNumber() levelId : number
 }