import { Request, Response } from 'express';

import { BaseRouter } from './base.router';
import { GenericResponse, RouterCallback } from '../models/router.model';
import { routes } from '../routes';

export class ReservationsRouter extends BaseRouter {

  constructor(routerCallback: RouterCallback<GenericResponse>) {
    const route = routes.api._root + routes.api.reservation._root;
    super(route, routerCallback);

    this.router.post(route, (req: Request, res: Response) => {
      console.log('REQUEST body', req.body);
      // TODO - convert reservation data to email and send to Dive and customer
      res.status(200).send('{ "message": "Success!" }');

      //routerCallback(route, res);
    });
  }
}