import { Request, Response } from "express";
import { UserRepository } from "../../DB";
import { LoginDto, RegisterDTO } from "./auth.DTO";
import { BadRequestException, comparePassword, ConflictException, hashPassword, isPaid, NotFoundException, Role, generateToken, LEVEL } from "../../utils";
import { TokenRepository } from "../../DB";
import { ObjectId } from "mongoose";

class AuthService {
    constructor() { };
    private readonly userRepository = new UserRepository();
    private readonly tokenRepository = new TokenRepository();
    register = async (req: Request, res: Response) => {
        const registerDto: RegisterDTO = req.body;
        const userExist = await this.userRepository.exist({ userName: registerDto.userName });
        if (userExist) {
            throw new ConflictException("user already exist");
        }
        const newUser = await this.userRepository.create({
            fullName: registerDto.fullName,
            userName: registerDto.userName,
            password: await hashPassword(registerDto.password),
            ispaid: registerDto.isPaid ?? isPaid.NO,
            phoneNumber: registerDto.phoneNumber,
            level: registerDto.level
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
        const userExist = await this.userRepository.exist({ userName: loginDto.userName });
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
    logOut = async(req: Request, res: Response) => {
        const token = req.headers.authorization;
        if(!token){
            throw new BadRequestException("Token is required");
        }
        const tokenExist = await this.tokenRepository.exist({ token });
        if(!tokenExist){
            throw new NotFoundException("token not found");
        }
        await this.tokenRepository.deleteOne({ token });
        return res.status(200).json({
            message: "user logout successfully",
            success: true
        });
    }

}


export default new AuthService();