import * as sst from "@serverless-stack/resources";
import * as sqs from "aws-cdk-lib/aws-sqs";

export default class ETL extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    const cacheDeadLetterQueue = new sqs.Queue(this, "CacheDeadLetterQueue", {
      queueName: `${this.stage}-wrecks-CacheDeadLetterQueue`,
    });

    const cacheQueue = new sst.Queue(this, "CacheQueue", {
      sqsQueue: {
        deadLetterQueue: {
          maxReceiveCount: 2,
          queue: cacheDeadLetterQueue,
        },
      },
      consumer: {
        function: "src/etl/cache/lambda.handler",
        allowAllOutbound: true,
        reservedConcurrentExecutions: 10,
        environment: {
          DATABASE_URL: process.env.DATABASE_URL,
        },
      },
    });

    this.addOutputs({
      cacheQueueArn: cacheQueue.sqsQueue.queueArn,
      deadLetterQueueArn: cacheDeadLetterQueue.queueArn,
    });
  }
}
