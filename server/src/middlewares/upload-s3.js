import AWS from "aws-sdk";

AWS.config.update({ region: process.env.AWS_S3});

const s3 = new AWS.S3({ apiVersion: '2006-03-01'});

module.exports = async (fileStream, fileName) => {
    try {
        let uploadParams = {
            Bucket: process.env.AWS_S3,
            Key: fileName,
            Body: fileStream
        };

        const data = await s3.upload(uploadParams).promise();
        return data
    } catch(error){
        console.log('Error uploading to S3', error);

        throw error;
    } 
}