import { Request, Response } from 'express';

import { BaseRouter } from './base.router';
import { GenericResponse, RouterCallback } from '../models/router.model';
import { routes } from '../routes';
//import { Special, SpecialsResponse } from '../models/specials.model';
import { AwsBucketIo, AwsBucketResult } from '../aws-bucket-io';

export class AwsBucketRouter extends BaseRouter {
  constructor(routerCallback: RouterCallback<GenericResponse>, private bucketId: string, private bucketPrefix: string, apiRoute: string) {
    console.log('---- AWS Route', apiRoute);
    const route = routes.api._root + apiRoute;
    super(route, routerCallback);

    const awsBucketIo: AwsBucketIo = new AwsBucketIo(bucketId, bucketPrefix);

    this.router.get(route, (req: Request, res: Response) => {
      if (!awsBucketIo) {
        console.log('bkt');
        res.status(500).send('Unable to get Bucket IO');
        return;
      }
      console.log('!!!!! GETTING BKT');
      awsBucketIo.getBucketContents().then(
        (result: AwsBucketResult[]) => {
          const imgSrc = result.map((item: any) => this.encodeDataStream(item.extension, item.data));
          console.log('------ img ' + !!imgSrc)
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
    //console.log('encoding: ' + mime);
    return mime + data;
  }
}