import { model } from "mongoose";
import { attemptSchema } from "./attempt.schema";

export const Attempt = model("Attempt", attemptSchema);