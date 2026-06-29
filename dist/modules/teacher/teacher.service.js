"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
const node_console_1 = require("node:console");
class TeacherService {
    constructor() {
        this.userRepo = new DB_1.UserRepository();
        this.getAllStudents = async (req, res) => {
            const students = await this.userRepo.getAll({
                role: utils_1.Role.STUDENT
            });
            if (students.length == 0) {
                throw new utils_1.NotFoundException("No students found");
            }
            return res.status(200).json({
                message: "Students retrieved successfully",
                success: true,
                data: { students }
            });
        };
        this.getOneStudent = async (req, res) => {
            const student = await this.userRepo.exist({ _id: req.params.id, role: utils_1.Role.STUDENT });
            if (!student) {
                throw new utils_1.NotFoundException("Student not found");
            }
            return res.status(200).json({
                message: "Student retrieved successfully",
                success: true,
                data: { student }
            });
        };
        this.updateStudent = async (req, res) => {
            const updateUserDto = req.body;
            const studentId = req.params.id;
            const studentExist = await this.userRepo.exist({ _id: studentId });
            if (!studentExist) {
                throw new utils_1.NotFoundException("Student not found");
            }
            (0, node_console_1.log)(updateUserDto);
            const updatedStudent = await this.userRepo.findOneAndUpdate({ _id: studentId }, {
                fullName: updateUserDto.fullName ?? studentExist.fullName,
                userName: updateUserDto.userName ?? studentExist.userName,
                phoneNumber: updateUserDto.phoneNumber ?? studentExist.phoneNumber,
                password: updateUserDto.password
                    ? await (0, utils_1.hashPassword)(updateUserDto.password)
                    : studentExist.password,
                ispaid: updateUserDto.paid ?? studentExist.ispaid,
                level: updateUserDto.level ?? studentExist.level
            }, { new: true });
            return res.status(200).json({
                message: "Student updated successfully",
                success: true,
                data: { updatedStudent }
            });
        };
        this.deleteStudent = async (req, res) => {
            const studentId = req.params.id;
            const studentExist = await this.userRepo.exist({ _id: studentId });
            if (!studentExist) {
                throw new utils_1.NotFoundException("Student not found");
            }
            await this.userRepo.findOneAndDelete({ _id: studentId });
            return res.status(200).json({
                message: "Student deleted successfully",
                success: true
            });
        };
        this.getStudentByLevel = async (req, res) => {
            const level = req.params.level;
            const students = await this.userRepo.getAll({ level: level, role: utils_1.Role.STUDENT });
            if (!students || students.length === 0) {
                throw new utils_1.NotFoundException("Students not found");
            }
            return res.status(200).json({
                message: "Students retrieved successfully",
                success: true,
                data: { students }
            });
        };
        this.updatePaid = async (req, res) => {
            const studentId = req.params.id;
            const studentExist = await this.userRepo.exist({
                _id: studentId,
                role: utils_1.Role.STUDENT
            });
            if (!studentExist) {
                throw new utils_1.NotFoundException("Student not found");
            }
            let paidUntil;
            if (studentExist.paidUntil &&
                studentExist.paidUntil > new Date()) {
                paidUntil = new Date(studentExist.paidUntil);
            }
            else {
                paidUntil = new Date();
            }
            paidUntil.setMonth(paidUntil.getMonth() + 1);
            const updatedStudent = await this.userRepo.findOneAndUpdate({ _id: studentId }, {
                isPaid: utils_1.PAID.YES,
                paidUntil
            }, {
                new: true
            });
            return res.status(200).json({
                message: "Student payment updated successfully",
                success: true,
                data: { updatedStudent }
            });
        };
    }
}
exports.default = new TeacherService();
