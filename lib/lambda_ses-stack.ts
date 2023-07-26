import {Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events'
import * as targets from 'aws-cdk-lib/aws-events-targets'
import * as cdk from 'aws-cdk-lib';
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from 'constructs';
import { AWS_REGION_Project,SES_EMAIL_FROM,SES_EMAIL_TO } from '../env';

export class LambdaSesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);





    // Create the lambda function that sends the email
    // Load the local env file to the cdk env
  const walletMonitor = new lambda.Function(this, 'lambdaEmail', {
      runtime: lambda.Runtime.NODEJS_16_X,   
      code: lambda.Code.fromAsset('lambda'),  
      handler: 'lambdaEmailSender.handler',
      environment: {
        AWS_REGION_Project: AWS_REGION_Project,
        SES_EMAIL_FROM: SES_EMAIL_FROM,
        SES_EMAIL_TO: SES_EMAIL_TO,
      }              
    });

    // Only give the lambda the permission to send an email from a specific email address and region
    walletMonitor.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["ses:SendEmail"],
        resources: [`arn:aws:ses:${AWS_REGION_Project}:${
          cdk.Stack.of(this).account
        }:identity/${SES_EMAIL_FROM}`],
      })
    );

    // Create the Scheduler, In this case every 2 minutes the scheduler will invoke the lambda
      const lambdaEventRule = new events.Rule(this, 'lambdaScheduler', {
          schedule: cdk.aws_events.Schedule.rate(cdk.Duration.minutes(2)),
        });


    // Attach the scheduler to the lambda function
    lambdaEventRule.addTarget(new targets.LambdaFunction(walletMonitor))
    
  }
}
