import { z } from "zod";

export const shipSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string(),
  flag: z.string().optional(),
  rig: z.string().optional(),
  tonnage: z.number().int().positive().optional(),
  standardisedTonnage: z.number().int().positive().optional(),
  yearConstructed: z.number().int().min(1400).max(1900).optional(),
  placeRegistered: z.string().optional(),
  yearRegistered: z.number().int().min(1400).max(1900).optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
});
