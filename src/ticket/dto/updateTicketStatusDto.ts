import { IsEnum} from "class-validator";
import { ticketStatusTypes } from "../ticket.enum";

export class UpdateTicketStatusDto {
   @IsEnum(ticketStatusTypes) status : ticketStatusTypes
}