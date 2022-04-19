import { z } from "zod";

export const voyageNewspaperSchema = z.object({
  id: z.number().int().positive().optional(),
  voyageId: z.number().int().positive(),
  newspaperId: z.number().int().positive(),
  yearFrom: z.number().int().positive().optional(),
  yearTo: z.number().int().positive().optional(),
  monthFrom: z.number().int().min(1).max(12).optional(),
  monthTo: z.number().int().min(1).max(12).optional(),
  dayFrom: z.number().int().min(1).max(31).optional(),
  dayTo: z.number().int().min(1).max(31).optional(),
  issue: z.number().int().positive().optional(),
  startPage: z.number().int().positive().optional(),
  endPage: z.number().int().positive().optional(),
  sourceText: z.string().optional(),
  notes: z.string().optional(),
  specificLocation: z.boolean(),
});
