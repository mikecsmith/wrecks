import { PrismaClient } from "@prisma/client";
import { logger } from "@wrecks/common/utils/logger";
import {
  newspaperSchema,
  shipSchema,
  voyageNewspaperSchema,
  voyageSchema,
} from "@wrecks/entities/schemas";
import { upsertToDb } from "./upsert-to-db";

/**
 * This function validates that the record is valid for the entity type and then either creates or updates the record
 * the record in the database based on whether an ID is present on the record.
 *
 * @param entity The entity type (e.g. "ship", "voyage", "newspaper", "voyage-newspaper")
 * @param record A JS object representing a single record of the entity type
 */

export async function dbWriter(
  entity: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  record: Record<string, any>
): Promise<void> {
  const prisma = new PrismaClient();

  switch (entity) {
    case "ship": {
      const parsedShip = shipSchema.safeParse(record);

      if (!parsedShip.success) {
        logger.error("Unable to parse ship record", {
          rawShip: record,
          parsedShip,
        });
        throw parsedShip.error;
      }

      await upsertToDb(prisma.ships, parsedShip.data);

      break;
    }
    case "voyage": {
      const parsedVoyage = voyageSchema.safeParse(record);

      if (!parsedVoyage.success) {
        logger.error("Unable to parse voyage record", {
          rawVoyage: record,
          parsedVoyage,
        });
        throw parsedVoyage.error;
      }

      await upsertToDb(prisma.voyages, parsedVoyage.data);

      break;
    }
    case "newspaper": {
      const parsedNewspaper = newspaperSchema.safeParse(record);

      if (!parsedNewspaper.success) {
        logger.error("Unable to parse newspaper record", {
          rawNewspaper: record,
          parsedNewspaper,
        });
        throw parsedNewspaper.error;
      }

      await upsertToDb(prisma.newspapers, parsedNewspaper.data);

      break;
    }
    case "voyage-newspaper": {
      const parsedVoyageNewspaper = voyageNewspaperSchema.safeParse(record);

      if (!parsedVoyageNewspaper.success) {
        logger.error("Unable to parse voyage-newspaper record", {
          rawVoyageNewspaper: record,
          parsedVoyageNewspaper,
        });
        throw parsedVoyageNewspaper.error;
      }

      await upsertToDb(prisma.voyagesNewspapers, parsedVoyageNewspaper.data);

      break;
    }
    default: {
      throw new Error(`Unknown entity: ${entity}`);
    }
  }
}
