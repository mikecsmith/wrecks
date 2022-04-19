import { z } from "zod";
import { voyageSchema } from "../schemas";

export type Voyage = z.infer<typeof voyageSchema>;
