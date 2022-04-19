import { z } from "zod";
import { shipSchema } from "../schemas";

export type Ship = z.infer<typeof shipSchema>;
