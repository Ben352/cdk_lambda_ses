# AWS CDK with lambda and SES

A simple program to better understand the AWS cdk. This programm will create a lambda function that is invoked by a scheduler (AWS EventBridge) and then sends an email using AWS SES.
Deploy using * `cdk deploy`  and then delete by using * `cdk destroy` 
## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
