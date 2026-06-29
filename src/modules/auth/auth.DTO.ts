import { isPaid, LEVEL, Role } from "../../utils";

export interface RegisterDTO {
    fullName: string;
    userName: string;
    password: string;
    phoneNumber: string;
    isPaid?: isPaid;
    level: LEVEL;
}

export interface LoginDto {
    userName: string;
    password: string; 
}
