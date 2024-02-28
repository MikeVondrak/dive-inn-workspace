import { Request, Response } from 'express';

import { BaseRouter } from './base.router';
import { GenericResponse, RouterCallback } from '../models/router.model';
import { routes } from '../routes';
import { AwsBucketIo, AwsBucketResult } from '../aws-bucket-io';

export class AwsBucketRouter extends BaseRouter {
  constructor(routerCallback: RouterCallback<GenericResponse>, private bucketId: string, private bucketPrefix: string, apiRoute: string) {
    const route = routes.api._root + apiRoute;
    super(route, routerCallback);

    const awsBucketIo: AwsBucketIo = new AwsBucketIo(bucketId, bucketPrefix);

    this.router.get(route, (req: Request, res: Response) => {
      if (!awsBucketIo) {
        res.status(500).send('Unable to get Bucket IO');
        return;
      }
      awsBucketIo.getBucketContents().then(
        (result: AwsBucketResult[]) => {
          const imgSrc = result.map((item: any) => this.encodeDataStream(item.extension, item.data));
          res.status(200).send(imgSrc);
        }
      )
    });
  }

  private encodeDataStream(extension: string, data: string): string {
    if (extension === 'svg') {
      extension += '+xml';
    }
    let mime = 'data:json/' + extension + ';base64,';
    return mime + data;
  }
}