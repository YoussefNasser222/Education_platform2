import { isPaid, Role } from "../../utils";

export interface RegisterDTO {
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    role : Role;
    ispaid?: isPaid;
}

export interface LoginDto {
    email: string;
    password: string; 
}
