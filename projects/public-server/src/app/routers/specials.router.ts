import { Request, Response } from 'express';

import { BaseRouter } from './base.router';
import { GenericResponse, RouterCallback } from '../models/router.model';
import { routes } from '../routes';
import { Special, SpecialsResponse } from '../models/specials.model';
import { AwsBucketIo } from '../aws-bucket-io';

export class SpecialsRouter extends BaseRouter {
  constructor(routerCallback: RouterCallback<GenericResponse>) {
    const routeStr = routes.api._root + routes.api.specials._root;
    super(routeStr, routerCallback);

    this.router.get(routeStr + '/test', (route, res, req) => {
      const bucket: AwsBucketIo = new AwsBucketIo();
      //const imgData = bucket.getBucketFile('');
      routerCallback(routeStr, res, []);
      
      return bucket.getBucketFile('');
    })
  }
}