/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handler } from "aws-lambda";
import { clsProxify, getClsHookedStorage } from "cls-proxify";
import winston from "winston";

const createLogger = (defaultMeta?: Record<string, any>) => {
  const consoleTransport = new winston.transports.Console({
    level: process.env.LOG_LEVEL ?? "info",
  });

  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    defaultMeta,
    transports: [consoleTransport],
    exceptionHandlers: [consoleTransport],
  });

  return logger;
};

export const logger = clsProxify(createLogger());

export const loggerHydrater =
  (baseHandler: Handler, input = {} as Record<string, any>): Handler =>
  (event, context, callback): any => {
    const loggerProxy = createLogger({
      aws: context,
      event,
      ...input,
    });

    return getClsHookedStorage().namespace.runAndReturn(async () => {
      getClsHookedStorage().set(loggerProxy);
      return await baseHandler(event, context, callback);
    });
  };
