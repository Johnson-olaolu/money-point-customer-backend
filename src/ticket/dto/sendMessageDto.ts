import { IsDate, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class SendMessageDto {
    @IsOptional() @IsNumber() customerSupportId : number
    @IsString() message : string
    @IsDateString() sentAt : Date
}