import { IsNotEmpty, isNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateTicketDto {
    @IsString() @IsOptional() @IsNotEmpty() title : string;
    @IsString() @IsOptional() @IsNotEmpty() description : string;
}