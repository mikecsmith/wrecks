import { z } from "zod";
import { newspaperSchema } from "../schemas";

export type Newspaper = z.infer<typeof newspaperSchema>;
