
import express, { Request, Response, Router } from 'express';
import { RouterCallback } from '../models/router.model';

export class BaseRouter {

  public router: Router = express.Router();

  constructor(public baseRoute: string, routerCallback?: RouterCallback<any>) {

    // this.router.get(baseRoute, (req: Request, res: Response) => {
       console.log('----> baseRouter GET: ' + baseRoute);

    //   res.send('Base GET Response, callback: ' + baseRoute + ' routerCallback: ' + !!routerCallback);
    //   if (!!routerCallback) {
    //     routerCallback(baseRoute, res);
    //   }
    // });
  }

  
}