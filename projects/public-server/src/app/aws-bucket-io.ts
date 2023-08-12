import { GetObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

export class AwsBucketIo {

  private config: S3ClientConfig = {
    credentials: {
      accessKeyId: 'environment.dive_inn_aws_access_key',
      secretAccessKey: 'environment.dive_inn_aws_secret_key',
    },
    region: 'us-east-1',
  };

  private readonly command: GetObjectCommand;
  private readonly client: S3Client;

  //
  constructor() {
    this.command = new GetObjectCommand({
      Bucket: 'diveinndenvers3',
      Key: 'Breakfast_Menu.jpg'
    });

    this.client = new S3Client(this.config);

    console.log('CREDS: ' + environment.dive_inn_aws_secret_key);
  }

  private async getObject(): Promise<any> {
    if (!this.client) {
      return null;
    }
    try {
      const response = await this.client.send(this.command);
      if (!response) {
        throw new Error('No response');
      }
      
      const str = await response.Body?.transformToString();
      console.log('RESPONSE:' + str);
    } catch (err) {
      console.error('ERROR:' + err);
    }
  }

  public async getBucketFile(filename: string) {
    console.log('AWS BUCKET IO');
    return await this.getObject();
  }

}