import { Request, Response } from 'express';
import nodemailer, { Transporter } from 'nodemailer';

import { BaseRouter } from './base.router';
import { GenericResponse, RouterCallback } from '../models/router.model';
import { routes } from '../routes';
import { environment } from '../../environments/environment';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { Reservation, ReservationResponse } from '../models/reservation.model';

import copy from '../../../../../utility/copy/dive-inn-copy.module';

export class ReservationsRouter extends BaseRouter {
  private customerEmail = {
    subject: copy().reservations.email.subject,
    intro: copy().reservations.email.intro,
    body1: copy().reservations.email.requestReceived,
    body2: copy().reservations.email.weatherGroupSize,
    //cateringHeader: 'Catering:',
    // catering: [
    //   '',
    //   '',
    // ],
    featuresHeader: copy().reservations.email.features.header,
    features: [
      copy().reservations.email.features.noCharge,
      copy().reservations.email.features.noDrinkMin,
      copy().reservations.email.features.under21til6,
      copy().reservations.email.features.boatGroup13,
    ],
    reviewRequest: copy().reservations.email.reviewRequest,
    doNotsHeader: copy().reservations.email.doNots.header,
    doNots: [
      copy().reservations.email.doNots.noMovingTables,
      copy().reservations.email.doNots.noReserveGames,
      copy().reservations.email.doNots.noOutsideFood,
    ],
    detailsHeader: copy().reservations.email.detailsHeader,
  };

  constructor(routerCallback: RouterCallback<GenericResponse>) {
    const route = routes.api._root + routes.api.reservation._root;
    super(route, routerCallback);

    const transporter = this.createMailTransporter();

    this.router.post(route, (req: Request, res: Response) => {
      if (!transporter) {
        res.status(500).send('Unable to create reservation - no transporter');
        return;
      }
      const reservation: Reservation = req?.body;
      if (!reservation) {
        res.status(500).send('Unable to create reservation - no request data');
        return;
      } else if (!reservation.organizer?.email || !reservation.organizer?.name) {
        res.status(500).send('Unable to create reservation - missing organizer name or email');
        return;
      }
      
      this.sendMail(transporter, this.createAppEmailOptions(reservation), res);
      this.sendMail(transporter, this.createCustomerEmailOptions(reservation), res);
    });
  }

  private sendMail(transporter: Transporter, options: MailOptions, res: Response) {

    transporter.sendMail(options, (error, info) => {
      if (!!error) {
        res.status(500).send(error);
        return;
      }
      const response: ReservationResponse = { success: true };
      res.status(200).send(response);
    });
  }

  private createMailTransporter(): Transporter | null {
    const transporter: Transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'reservations@diveinndenver.com',
        pass: environment.gmail_app_access_key,
      }
    });    
    return transporter;
  }
  
  private createCustomerEmailOptions(reservation: Reservation): MailOptions {
    var to = reservation.organizer.email; // already validated to exist 
    //var cater = this.reduceToStr(this.customerEmail.catering);
    var features = this.reduceToStr(this.customerEmail.features);
    var doNots = this.reduceToStr(this.customerEmail.doNots);
    // var spaces = this.reduceToStr(reservation.rentalSpaces);
    return {
      to,
      from: 'Dive Inn Denver Reservations<reservations@diveinndenver.com>',
      subject: this.customerEmail.subject,
      text: 
`${this.customerEmail.intro}

${this.customerEmail.body1}

${this.customerEmail.body2}

${this.customerEmail.featuresHeader}
${features}

${this.customerEmail.reviewRequest}

${this.customerEmail.doNotsHeader}
${doNots}

${this.customerEmail.detailsHeader}
Theme: ${reservation.theme || 'None'}
Birthday: ${reservation.birthday}
- Name: ${reservation.birthday?.name || 'N/A'}
- Age: ${reservation.birthday?.age || 'N/A'}
Organizer: 
- Name: ${reservation.organizer.name}
- Email: ${reservation.organizer.email || 'N/A'}
- Phone: ${reservation.organizer.phoneNumber || 'N/A'}
- Preferred Contact: ${reservation.organizer.preferredContact}
Date: ${reservation.date}
- Start Time: ${reservation.startTime}
- End Time: ${reservation.endTime}
Headcount: ${reservation.headcount}
Notes:
${reservation.notes}`,
    };
  }
  
  private createAppEmailOptions(reservation: Reservation): MailOptions {
    const organizerName = reservation.organizer.name;
    // var spaces = this.reduceToStr(reservation.rentalSpaces);
    return {
      to: 'reservations@diveinndenver.com',
      from: 'Website Reservation<reservations@diveinndenver.com>',
      subject: `Reservation for ${organizerName}`,
      text: 
`Organizer: 
- Name: ${reservation.organizer.name}
- Email: ${reservation.organizer.email || 'N/A'}
- Phone: ${reservation.organizer.phoneNumber || 'N/A'}
- Preferred Contact: ${reservation.organizer.preferredContact}

Date: ${reservation.date}
- Start Time: ${reservation.startTime}
- End Time: ${reservation.endTime}

Headcount: ${reservation.headcount}

Theme: ${reservation.theme || 'None'}

Birthday: ${!!reservation.birthday}
- Name: ${reservation.birthday?.name || 'N/A'}
- Age: ${reservation.birthday?.age || 'N/A'}

Notes:
${reservation.notes}`
    };
  }

  private reduceToStr(arr: string[]): string {
    return arr.reduce((acc, next, idx) => {
      return acc + (idx === 0 ? '' : '\n') + '- ' + next;
    }, '');
  }
}