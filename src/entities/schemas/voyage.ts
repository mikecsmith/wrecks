import { z } from "zod";

export const voyageSchema = z.object({
  id: z.number().int().positive().optional(),
  tstdId: z.number().int().positive().optional(),
  shipId: z.number().int().positive(),
  voyageYear: z.number().int().min(1400).max(1900).optional(),
  voyageBegan: z.date().optional(),
  voyageTradeBegan: z.date().optional(),
  voyageDepartedAfrica: z.date().optional(),
  voyageArrivedSlaves: z.date().optional(),
  voyageEnded: z.date().optional(),
  voyageLength: z.number().int().positive().optional(),
  middlePassageLength: z.number().int().positive().optional(),
  portDeparted: z.string().optional(),
  firstPortPurchase: z.string().optional(),
  secondPortPurchase: z.string().optional(),
  thirdPortPurchase: z.string().optional(),
  majorPortPurchase: z.string().optional(),
  firstPortSale: z.string().optional(),
  secondPortSale: z.string().optional(),
  thirdPortSale: z.string().optional(),
  majorPortSale: z.string().optional(),
  placeVoyageEnded: z.string().optional(),
  slaveResistance: z.boolean(),
  crewOutset: z.number().int().positive().optional(),
  crewSlaveSale: z.number().int().positive().optional(),
  crewDeaths: z.number().int().positive().optional(),
  slaveNumbersIntendedFirstPurchase: z.number().int().positive().optional(),
  slavesCarriedFirstPurchase: z.number().int().positive().optional(),
  slavesCarriedSecondPurchase: z.number().int().positive().optional(),
  slavesCarriedThirdPurchase: z.number().int().positive().optional(),
  totalSlavesEmbarked: z.number().int().positive().optional(),
  slaveNumbersFirstLanding: z.number().int().positive().optional(),
  slaveNumbersSecondLanding: z.number().int().positive().optional(),
  slaveNumbersThirdLanding: z.number().int().positive().optional(),
  totalSlavesDisembarked: z.number().int().positive().optional(),
  voyageOutcome: z.string().optional(),
  voyageOutcomeSlaves: z.string().optional(),
  voyageOutcomeCaptured: z.string().optional(),
  voyageOutcomeOwner: z.string().optional(),
  wreckRegion: z.string().optional(),
  wreckCountry: z.string().optional(),
  wreckLocation: z.string().optional(),
  refloated: z.boolean(),
  notes: z.string().optional(),
});
