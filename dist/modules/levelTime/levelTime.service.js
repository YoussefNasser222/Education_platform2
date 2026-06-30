"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
class LevelTimeService {
    constructor() {
        this.levelTimeRepo = new DB_1.LevelTimeRepository();
        this.addLevelTime = async (req, res) => {
            const levelTimeDto = req.body;
            const levelTimeExist = await this.levelTimeRepo.exist({ level: levelTimeDto.level });
            if (levelTimeExist) {
                throw new utils_1.ConflictException("level already exist");
            }
            const leveTime = await this.levelTimeRepo.create({
                level: levelTimeDto.level,
                time: levelTimeDto.time
            });
            return res.status(201).json({
                message: "Level time created successfully",
                success: true,
                data: { leveTime }
            });
        };
        this.updateLevelTime = async (req, res) => {
            const { id } = req.params;
            const levelTimeDto = req.body;
            const levelTimeExist = await this.levelTimeRepo.exist({ _id: id });
            if (!levelTimeExist) {
                throw new utils_1.NotFoundException("level not found");
            }
            const leveTime = await this.levelTimeRepo.findOneAndUpdate({ _id: id }, {
                time: levelTimeDto.time
            }, { new: true });
            return res.status(200).json({
                message: "Level time updated successfully",
                success: true,
                data: { leveTime }
            });
        };
        this.getLevelTime = async (req, res) => {
            const levelTime = await this.levelTimeRepo.getAll();
            if (!levelTime || levelTime.length === 0) {
                throw new utils_1.NotFoundException("level time not found");
            }
            return res.status(200).json({
                message: "Level time fetched successfully",
                success: true,
                data: { levelTime }
            });
        };
        this.getLevelTimeByLevel = async (req, res) => {
            const level = req.params.level;
            const levelTime = await this.levelTimeRepo.exist({ level: level });
            if (!levelTime) {
                throw new utils_1.NotFoundException("level time not found");
            }
            return res.status(200).json({
                message: "Level time fetched successfully",
                success: true,
                data: { levelTime }
            });
        };
        this.deleteLeveTime = async (req, res) => {
            const { id } = req.params;
            const levelTimeExist = await this.levelTimeRepo.exist({ _id: id });
            if (!levelTimeExist) {
                throw new utils_1.NotFoundException("level time not found");
            }
            const levelTime = await this.levelTimeRepo.deleteOne({ _id: id });
            return res.status(200).json({
                message: "Level time deleted successfully",
                success: true
            });
        };
    }
}
exports.default = new LevelTimeService();
