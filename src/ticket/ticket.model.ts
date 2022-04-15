
export interface ITicket {
    id : string;
    title : string;
    description : string;
    status : ticketStatusTypes;
    uniqueCode : string;
    created_at : Date;
    updated_at : Date;
}

export enum ticketStatusTypes {
    SUBMITTED = "SUBMITTED",
    OPENED = "OPENED",
    COMPLETED = "COMPLETED",
    CLOSED = "CLOSED"
}