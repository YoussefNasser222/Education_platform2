import { model } from "mongoose";
import { levelTimeSchema } from "./levelTime.schema";

export const levelTime = model("levelTime", levelTimeSchema);