import AWS from "aws-sdk";

AWS.config.update({ region: process.env.AWS_S3});

const s3 = new AWS.S3({ apiVersion: '2006-03-01'});