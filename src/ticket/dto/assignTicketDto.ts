import { IsNumber, IsOptional, IsString } from "class-validator";

export class AssignTicketDto {
    @IsOptional() @IsNumber() assigneeId : number
    @IsString() ticketRef: string
    @IsNumber() customerSupportId : number
}