import { z } from "zod";
import { voyageNewspaperSchema } from "../schemas";

export type VoyageNewspaper = z.infer<typeof voyageNewspaperSchema>;
