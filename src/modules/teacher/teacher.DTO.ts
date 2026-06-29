import { PAID, LEVEL } from "../../utils";

export interface UpdateStudentDTO {
    fullName?: string;
    userName?: string;
    password?: string;
    paid? : PAID
    phoneNumber?: string,
    level? : LEVEL
}