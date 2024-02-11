import { GetObjectCommand, ListBucketsCommand, ListBucketsCommandInput, ListObjectsCommand, ListObjectsCommandInput, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";


export type AwsBucketResult = { key: string, extension: string, data: Promise<any> };

export class AwsBucketIo {

  private config: S3ClientConfig = {
    credentials: {
      accessKeyId: environment.dive_inn_aws_access_key,
      secretAccessKey: environment.dive_inn_aws_secret_key,
    },
    region: 'us-east-1',
  };

  private readonly listBucketContentsCommand: ListObjectsCommand;
  private readonly listBucketContentsCommandInput: ListObjectsCommandInput;

  private readonly client: S3Client;

  //
  constructor(private bucketId: string, private bucketPrefix: string) {

    this.listBucketContentsCommandInput = {
      Bucket: bucketId,
      Prefix: bucketPrefix
    };
    
    this.listBucketContentsCommand = new ListObjectsCommand(this.listBucketContentsCommandInput);
    
    this.client = new S3Client(this.config);
  }

  private async getObject(command: GetObjectCommand): Promise<string> {
    if (!this.client) {
      return 'No client';
    }
    try {
      const response = await this.client.send(command);
      if (!response) {
        throw new Error('No response');
      }
      
      const str = await response.Body?.transformToString('base64');
      console.log('RESPONSE success', str?.length);
      return str || 'No response';

    } catch (err) {
      console.error('ERROR:' + err);
      return 'ERROR:' + err;
    }
  }

  private async listBucketObjects(bucketPath: string): Promise<any[]>{
    if (!this.client) {
      throw new Error('No client');
    }
    try {
      let response = await this.client.send(this.listBucketContentsCommand);
      response.Contents = response?.Contents?.filter(x => x.Key !== bucketPath);
console.log('listBucketObjects', response.Contents?.length);
      return response.Contents || [];
    }
    catch (err) {
    }
    return [];
  }

  public async getBucketContents(): Promise<any[]> {
    const bucketPath = this.bucketPrefix;
    console.log('@@@@', this.bucketId + this.bucketPrefix);
    const bucketContents = await this.listBucketObjects(bucketPath);
    let bucketResults: AwsBucketResult[] = [];
    let bucketObjects: any[] = [];

    await bucketContents.forEach(async (x, idx) => {
        const extension = x.Key.substr(x.Key.length - 3, 3);
        const command = new GetObjectCommand({
          Bucket: this.bucketId,
          Key: x.Key
        });
        const data = this.getObject(command);
        const result: AwsBucketResult = {
          key: x.Key,
          data,
          extension
        }
        console.log('Bucket: ', {extension});
        bucketResults.push(result);
      } 
    );

    const bucketData = bucketResults.map(br => br.data);
    bucketObjects = (await Promise.all([ ...bucketData]));
    return bucketObjects.map((bo, idx) => {
      const result: AwsBucketResult = { 
        key: bucketResults[idx].key,
        extension: bucketResults[idx].extension,
        data: bo
      }
      return result;
    });
  }

}