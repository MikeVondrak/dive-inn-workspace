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
  constructor() {

    this.listBucketContentsCommandInput = {
      Bucket: 'diveinndenvers3',
      Prefix: 'Public/Specials/'
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
  
  // public async getBucketFile(filename: string): Promise<string> {
  //   console.log('AWS BUCKET IO');
  //   const objPromise = this.getObject();
  //   return objPromise;
  // }


  public async getBucketContents(): Promise<any[]> {
    const bucketPath = 'Public/Specials/';
    const bucketContents = await this.listBucketObjects(bucketPath);
    let bucketResults: AwsBucketResult[] = [];
    let bucketObjects: any[] = [];

    await bucketContents.forEach(async (x, idx) => {
        const extension = x.Key.substr(x.Key.length - 3, 3);
        console.log('Bucket: ', {extension});
        const command = new GetObjectCommand({
          Bucket: 'diveinndenvers3',
          Key: x.Key
        });
        const data = this.getObject(command);
        const result: AwsBucketResult = {
          key: x.Key,
          data,
          extension
        }
        bucketResults.push(result);
      } 
    );

    const bucketData = bucketResults.map(br => br.data);

    bucketObjects = (await Promise.all([ ...bucketData]));
    console.log(bucketObjects.length);

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