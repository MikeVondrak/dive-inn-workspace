import { Request, Response } from 'express';
import nodemailer, { Transporter, TransportOptions } from 'nodemailer';

import { BaseRouter } from './base.router';
import { GenericResponse, RouterCallback } from '../models/router.model';
import { routes } from '../routes';
import { environment } from '../environments/environment';
import { MailOptions } from 'nodemailer/lib/json-transport';

export class ReservationsRouter extends BaseRouter {

  constructor(routerCallback: RouterCallback<GenericResponse>) {
    const route = routes.api._root + routes.api.reservation._root;
    super(route, routerCallback);

    this.router.post(route, (req: Request, res: Response) => {
      console.log('REQUEST body', req.body);
      
      // TODO - convert reservation data to email and send to Dive and customer
      
      const transporter: Transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'reservations@diveinndenver.com',
          pass: environment.gmail_app_access_key,
        }
      });
      const options: MailOptions = {
        to: 'mike@diveinndenver.com',
        from: 'reservations@diveinndenver.com',
        subject: 'Test Subject',
        text: 'Test Text',
      }

      transporter.sendMail(options, (error, info) => {
        console.log('MAIL SENT', error, info);
      });

      res.status(200).send('{ "message": "Success!" }');

      //routerCallback(route, res);
    });
  }
}