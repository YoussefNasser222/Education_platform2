"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
const DB_2 = require("../../DB");
class AuthService {
    constructor() {
        this.userRepository = new DB_1.UserRepository();
        this.tokenRepository = new DB_2.TokenRepository();
        this.register = async (req, res) => {
            const registerDto = req.body;
            const userExist = await this.userRepository.exist({ email: registerDto.email });
            if (userExist) {
                throw new utils_1.ConflictException("user already exist");
            }
            const newUser = await this.userRepository.create({
                fullName: registerDto.fullName,
                email: registerDto.email,
                password: await (0, utils_1.hashPassword)(registerDto.password),
                role: registerDto.role ?? utils_1.Role.STUDENT,
                ispaid: registerDto.ispaid ?? utils_1.isPaid.NO,
                phoneNumber: registerDto.phoneNumber ?? "",
            });
            const { password, role, ispaid, ...other } = newUser.toObject();
            return res.status(201).json({
                message: "user created successfully",
                success: true,
                data: { ...other }
            });
        };
        this.login = async (req, res) => {
            const loginDto = req.body;
            const userExist = await this.userRepository.exist({ email: loginDto.email });
            if (!userExist) {
                throw new utils_1.NotFoundException("user not found");
            }
            const password = await (0, utils_1.comparePassword)(loginDto.password, userExist.password);
            if (!password) {
                throw new utils_1.BadRequestException("invalid credentials");
            }
            const token = (0, utils_1.generateToken)({
                payolad: {
                    _id: userExist._id,
                    role: userExist.role
                },
                options: { expiresIn: "2d" }
            });
            await this.tokenRepository.create({
                userId: userExist._id,
                token: token
            });
            return res.status(200).json({
                message: "user login successfully",
                success: true,
                data: { token }
            });
        };
    }
    ;
}
exports.default = new AuthService();
