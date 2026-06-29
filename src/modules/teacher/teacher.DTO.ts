import { isPaid, LEVEL } from "../../utils";

export interface UpdateStudentDTO {
    fullName?: string;
    userName?: string;
    password?: string;
    paid? : isPaid
    phoneNumber?: string,
    level? : LEVEL
}