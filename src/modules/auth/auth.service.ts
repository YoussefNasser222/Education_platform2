import { Request, Response } from "express";
import { UserRepository } from "../../DB";
import { LoginDto, RegisterDTO } from "./auth.DTO";
import { BadRequestException, comparePassword, ConflictException, hashPassword, isPaid, NotFoundException, Role, generateToken } from "../../utils";
import { TokenRepository } from "../../DB";
import { ObjectId } from "mongoose";

class AuthService {
    constructor() { };
    private readonly userRepository = new UserRepository();
    private readonly tokenRepository = new TokenRepository();
    register = async (req: Request, res: Response) => {
        const registerDto: RegisterDTO = req.body;
        const userExist = await this.userRepository.exist({ email: registerDto.email });
        if (userExist) {
            throw new ConflictException("user already exist");
        }
        const newUser = await this.userRepository.create({
            fullName: registerDto.fullName,
            email: registerDto.email,
            password: await hashPassword(registerDto.password),
            role: registerDto.role ?? Role.STUDENT,
            ispaid: registerDto.ispaid ?? isPaid.NO,
            phoneNumber: registerDto.phoneNumber ?? "",
        })
        const { password, role, ispaid, ...other } = newUser.toObject();
        return res.status(201).json({
            message: "user created successfully",
            success: true,
            data: { ...other }
        });
    }
    login = async (req: Request, res: Response) => {
        const loginDto: LoginDto = req.body;
        const userExist = await this.userRepository.exist({ email: loginDto.email });
        if (!userExist) {
            throw new NotFoundException("user not found");
        }
        const password = await comparePassword(loginDto.password, userExist.password);
        if (!password) {
            throw new BadRequestException("invalid credentials");
        }
        const token = generateToken({
            payolad: {
                _id: userExist._id,
                role: userExist.role
            },
            options: { expiresIn: "2d" }
        })
        // save token into DB
        await this.tokenRepository.create({
            userId: userExist._id,
            token: token
        })
        return res.status(200).json({
            message: "user login successfully",
            success: true,
            data: { token }
        });
    }

}


export default new AuthService();