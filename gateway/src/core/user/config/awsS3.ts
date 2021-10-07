import aws from "aws-sdk";
import Bcrypt from "./bcrypt";
require("dotenv").config();

export default class S3 {
  private static region: string = "us-west-2";
  private static bucketName: string = "rooma0";
  private static accessKeyId = process.env.S3_ACCESS;
  private static secretAccessKey = process.env.S3_SECRET;
  private static s3 = new aws.S3({
    region: S3.region,
    accessKeyId: S3.accessKeyId,
    secretAccessKey: S3.secretAccessKey,
    signatureVersion: 'v4'
  })

  static async generateUploadUrl(): Promise<string> {
    const imageName = await new Bcrypt().encrypt("watermelon00is00great");

    const params = ({
      Bucket: S3.bucketName,
      Key: imageName,
      Expires: 60
    })
    const uploadUrl = await S3.s3.getSignedUrlPromise('putObject', params);
    return uploadUrl;
  }
}