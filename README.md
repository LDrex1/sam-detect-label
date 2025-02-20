# AWS SAM Project: Image Label Detection Pipeline

## Overview

This project implements an **AWS Serverless Application Model (SAM)** pipeline that detects labels from images uploaded to an S3 bucket using **Amazon Rekognition**. The results are stored in another S3 bucket, and notifications are sent via SNS.

## Architecture Overview

- **Amazon S3**: Stores the uploaded images and detected labels.
- **AWS Step Functions**: Orchestrates the workflow for image processing.
- **Amazon Rekognition**: Detects labels in the uploaded images.
- **AWS Lambda**: Generates pre-signed URLs for accessing detected labels.
- **CloudWatch Logs**: Captures logs for all processing activities.
- **Amazon SNS**: Sends notifications when processing is complete.

## Project Structure

├── src/ # Lambda function source code
│ └── index.js # Lambda handler for generating signed URLs
│
├── stateMachine.asl.yml # Step Functions state machine definition
├── template.yml  
└── README.md # Project documentation

## Prerequisites

- AWS CLI configured with necessary credentials.
- AWS SAM CLI installed.
- Node.js (for Lambda functions).
- AWS Infrastructure Composer (optional)

## Deployment

1. **Build the SAM application:**
   ```bash
   sam build
   ```
2. **Deploy the SAM application:**
   ```bash
   sam deploy --guided
   ```

### You can find the guide to this project in this medium [link](https://medium.com/@ldrex/building-a-serverless-image-label-detection-pipeline-with-aws-sam-ee2f64d1449c)
