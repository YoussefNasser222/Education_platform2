import { Request, Response } from "express";
import { UserRepository } from "../../DB";
import { hashPassword, isPaid, LEVEL, NotFoundException, Role } from "../../utils";
import { UpdateStudentDTO } from "./teacher.DTO";
import { log } from "node:console";

class TeacherService {
    constructor() { }
    private readonly userRepo = new UserRepository()
    getAllStudents = async (req: Request, res: Response) => {
        const students = await this.userRepo.getAll({
            role: Role.STUDENT
        });
        if (students.length == 0) {
            throw new NotFoundException("No students found");
        }
        return res.status(200).json({
            message: "Students retrieved successfully",
            success: true,
            data: { students }
        });
    }
    getOneStudent = async (req: Request, res: Response) => {
        const student = await this.userRepo.exist({ _id: req.params.id, role: Role.STUDENT });
        if (!student) {
            throw new NotFoundException("Student not found");
        }
        return res.status(200).json({
            message: "Student retrieved successfully",
            success: true,
            data: { student }
        });
    }
    updateStudent = async (req: Request, res: Response) => {
        const updateUserDto: UpdateStudentDTO = req.body;
        const studentId = req.params.id;
        const studentExist = await this.userRepo.exist({ _id: studentId });
        if (!studentExist) {
            throw new NotFoundException("Student not found");
        }
        log(updateUserDto);
        const updatedStudent = await this.userRepo.findOneAndUpdate({ _id: studentId }, {
            fullName: updateUserDto.fullName ?? studentExist.fullName,
            userName: updateUserDto.userName ?? studentExist.userName,
            phoneNumber: updateUserDto.phoneNumber ?? studentExist.phoneNumber,
            password:
                updateUserDto.password
                    ? await hashPassword(updateUserDto.password)
                    : studentExist.password,
            ispaid: updateUserDto.paid ?? studentExist.ispaid,
            level: updateUserDto.level ?? studentExist.level
        }, { new: true });

        return res.status(200).json({
            message: "Student updated successfully",
            success: true,
            data: { updatedStudent }
        });
    }
    deleteStudent = async (req: Request, res: Response) => {
        const studentId = req.params.id;
        const studentExist = await this.userRepo.exist({ _id: studentId });
        if (!studentExist) {
            throw new NotFoundException("Student not found");
        }
        await this.userRepo.findOneAndDelete({ _id: studentId });
        return res.status(200).json({
            message: "Student deleted successfully",
            success: true
        });
    }
    getStudentByLevel = async (req: Request, res: Response) => {
        const level = req.params.level as LEVEL;
        const students = await this.userRepo.getAll({ level: level, role: Role.STUDENT });
        if (!students || students.length === 0) {
            throw new NotFoundException("Students not found");
        }
        return res.status(200).json({
            message: "Students retrieved successfully",
            success: true,
            data: { students }
        });
    }
        updatePaid = async (req: Request, res: Response) => {
            const studentId = req.params.id;

            const studentExist = await this.userRepo.exist({
                _id: studentId,
                role: Role.STUDENT
            });

            if (!studentExist) {
                throw new NotFoundException("Student not found");
            }
            let paidUntil = new Date(Date.now());

            // إضافة شهر
            paidUntil.setMonth(paidUntil.getMonth() + 1);
            log(paidUntil);
            const updatedStudent =
                await this.userRepo.findOneAndUpdate(
                    { _id: studentId },
                    {
                        isPaid: isPaid.YES,
                        paidUntil 
                    },
                    {
                        new: true
                    }
                );

            return res.status(200).json({
                message: "Student payment updated successfully",
                success: true,
                data: { updatedStudent }
            });
        }
}


export default new TeacherService();