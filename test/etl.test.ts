import { Template } from "aws-cdk-lib/assertions";
import * as sst from "@serverless-stack/resources";
import ETL from "../stacks/etl";

test("ETL Stack", () => {
  const app = new sst.App();
  const stack = new ETL(app, "etl-test-stack");
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::Lambda::Function", 1);
  template.resourceCountIs("AWS::SQS::Queue", 2);
});
