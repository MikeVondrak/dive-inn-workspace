import { GetObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

export class AwsBucketIo {

  private config: S3ClientConfig = {
    credentials: {
      accessKeyId: environment.dive_inn_aws_access_key,
      secretAccessKey: environment.dive_inn_aws_secret_key,
    },
    region: 'us-east-1',
  };

  private readonly command: GetObjectCommand;
  private readonly client: S3Client;

  //
  constructor() {
    this.command = new GetObjectCommand({
      Bucket: 'diveinndenvers3',
      Key: 'Public/Specials/Breakfast_Menu.jpg'
    });

    this.client = new S3Client(this.config);
  }

  private async getObject(): Promise<string> {
    if (!this.client) {
      return 'No client';
    }
    try {
      const response = await this.client.send(this.command);
      if (!response) {
        throw new Error('No response');
      }
      
      const str = await response.Body?.transformToString('base64');
      console.log('RESPONSE success');
      return str || 'No response';

    } catch (err) {
      console.error('ERROR:' + err);
      return 'ERROR:' + err;
    }
  }

  public async getBucketFile(filename: string): Promise<string> {
    console.log('AWS BUCKET IO');
    const objPromise = this.getObject();
    return objPromise;
  }

}