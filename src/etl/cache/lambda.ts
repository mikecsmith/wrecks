import { SQSHandler } from "aws-lambda";
import { logger, loggerHydrater } from "@wrecks/common/utils/logger";
import { dbWriter } from "./utils/db-writer";

const baseHandler: SQSHandler = async (event) => {
  logger.debug("Initializing ETL caching lambda");
  const { Records } = event;

  for (const record of Records) {
    const { body } = record;
    const { entity, data } = JSON.parse(body);
    await dbWriter(entity, data);
    logger.debug("ETL caching lambda complete");
  }
};

const loggerMeta = {
  namespace: "wrecks.etl.cache",
};

export const handler = loggerHydrater(baseHandler, loggerMeta);
