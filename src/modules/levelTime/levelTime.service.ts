import { Request, Response } from "express";
import { LevelTimeRepository } from "../../DB";
import { LevelTimeDto } from "./levelTime.DTO";
import { BadRequestException, ConflictException, LEVEL, NotFoundException } from "../../utils";

class LevelTimeService {
    constructor() { }
    private readonly levelTimeRepo = new LevelTimeRepository();
    addLevelTime = async (req: Request, res: Response) => {
        const levelTimeDto: LevelTimeDto = req.body;
        const levelTimeExist = await this.levelTimeRepo.exist({ level: levelTimeDto.level });
        if (levelTimeExist) {
            throw new ConflictException("level already exist")
        }
        const leveTime = await this.levelTimeRepo.create({
            level: levelTimeDto.level,
            time: levelTimeDto.time
        })
        return res.status(201).json({
            message: "Level time created successfully",
            success: true,
            data: { leveTime }
        })
    }
    updateLevelTime = async (req: Request, res: Response) => {
        const { id } = req.params;
        const levelTimeDto: LevelTimeDto = req.body;
        const levelTimeExist = await this.levelTimeRepo.exist({ _id: id });
        if (!levelTimeExist) {
            throw new NotFoundException("level not found")
        }
        const leveTime = await this.levelTimeRepo.findOneAndUpdate({ _id: id }, {
            time: levelTimeDto.time
        }, { new: true });
        return res.status(200).json({
            message: "Level time updated successfully",
            success: true,
            data: { leveTime }
        })
    }
    getLevelTime = async (req: Request, res: Response) => {
        const levelTime = await this.levelTimeRepo.getAll();
        if (!levelTime || levelTime.length === 0) {
            throw new NotFoundException("level time not found")
        }
        return res.status(200).json({
            message: "Level time fetched successfully",
            success: true,
            data: { levelTime }
        })
    }
    getLevelTimeByLevel = async (req: Request, res: Response) => {
        const level = req.params.level as LEVEL;
        const levelTime = await this.levelTimeRepo.exist({ level: level });
        if (!levelTime) {
            throw new NotFoundException("level time not found")
        }
        return res.status(200).json({
            message: "Level time fetched successfully",
            success: true,
            data: { levelTime }
        })
    }
    deleteLeveTime = async (req: Request, res: Response) => {
        const { id } = req.params;
        const levelTimeExist = await this.levelTimeRepo.exist({ _id: id });
        if (!levelTimeExist) {
            throw new NotFoundException("level time not found")
        }
        const levelTime = await this.levelTimeRepo.deleteOne({ _id: id });
        return res.status(200).json({
            message: "Level time deleted successfully",
            success: true
        })
    }
}




export default new LevelTimeService();