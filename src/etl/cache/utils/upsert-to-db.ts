import { logger } from "@wrecks/common/utils/logger";
import {
  Newspaper,
  Ship,
  Voyage,
  VoyageNewspaper,
} from "@wrecks/entities/types";

/**
 * This function accepts a JSON object representing one of the DB models and performs either a create or an upsert
 * based on whether an ID is present.
 *
 * @param prismaClient A PrismaClient delegate - i.e. ShipsDelegate, VoyagesDelegate, NewspapersDelegate, VoyageNewspapersDelegate
 * @param data Data on a single Ship, Voyage, Newspaper, or VoyageNewspaper
 */

export async function upsertToDb(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prismaClient: any,
  data: Ship | Voyage | Newspaper | VoyageNewspaper
) {
  try {
    if (data.id) {
      await prismaClient.upsert({
        where: { id: data.id },
        update: { ...data },
        create: { ...data },
      });
    } else {
      await prismaClient.create({ data: data });
    }
  } catch (error) {
    logger.error("Unable to upsert record to DB", {
      error,
      data,
    });
    throw error;
  }
}
