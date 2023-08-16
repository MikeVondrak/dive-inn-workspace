import { Request, Response } from 'express';

import { BaseRouter } from './base.router';
import { GenericResponse, RouterCallback } from '../models/router.model';
import { routes } from '../routes';
import { Special, SpecialsResponse } from '../models/specials.model';
import { AwsBucketIo } from '../aws-bucket-io';

export class SpecialsRouter extends BaseRouter {
  constructor(routerCallback: RouterCallback<GenericResponse>) {
    const route = routes.api._root + routes.api.specials._root;
    super(route, routerCallback);

    const awsBucketIo: AwsBucketIo = new AwsBucketIo();

    this.router.get(route, (req: Request, res: Response) => {
      if (!awsBucketIo) {
        res.status(500).send('Unable to get Bucket IO');
        return;
      }

      awsBucketIo.getBucketFile('').then(
        (data: string) => {
          console.log('Specials: ', data.length);
          const imgSrc = this.encodeDataStream(data);
          res.status(200).send([imgSrc]);
        }
      )
    });
  }

  private encodeDataStream(data: string): string {
    const mime = 'data:image/jpeg;base64,';
    const buffer = Buffer.from(data, 'base64');
    const dataBase64 = buffer.toString('base64');
    return mime + dataBase64;
  }
}