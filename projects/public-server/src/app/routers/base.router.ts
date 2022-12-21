
import express, { Request, Response, Router } from 'express';
import { RouterCallback } from '../models/router.model';

export class BaseRouter {

  public router: Router = express.Router();

  constructor(public baseRoute: string, sqlQuery: string, routerCallback: RouterCallback<any>) {
    this.router.get(baseRoute, (req: Request, res: Response) => {
      console.log('----> baseRouter GET: ' + baseRoute);
      routerCallback(baseRoute, sqlQuery, res);
    });
  }

  
}