import { z } from "zod";

export const newspaperSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string(),
  url: z.string().optional(),
  notes: z.string().optional(),
});
