import { Request, Response } from 'express';
import nodemailer, { Transporter } from 'nodemailer';

import { BaseRouter } from './base.router';
import { GenericResponse, RouterCallback } from '../models/router.model';
import { routes } from '../routes';
import { environment } from '../../environments/environment';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { Reservation, ReservationResponse } from '../models/reservation.model';

export class ReservationsRouter extends BaseRouter {

  private customerEmail = {
    subject: 'Ahoy Mate! Your reservation request has been received.',
    intro: 'Thank you for choosing the Dive Inn to host your event, we\'re excited to help you throw an epic party!',
    body1: 'We have received your request, and you will receive another email confirming your reservation, usually within 24-48 hours (please reach out if you do not hear from us).',
    body2: 'Your dedicated space for the event will depend on your group size and the weather. We will try to reserve your preferred selection but we cannot guarantee a particular space.',
    cateringHeader: 'Catering:',
    catering: [
      'Taki Takos (http://www.takitakos.com) and Cluck Chicken (http://cluckchickenden.com) are available to cater your event!',
      'Contact Mario (mario.takitakos@gmail.com) or Rachael (cluckchickenden@gmail.com) for details.',
    ],
    featuresHeader: 'Features:',
    features: [
      'NO charge to rent the space!',
      'NO drink minimums!',
      'Under 21 allowed until 6:00 PM',
      'We can provide wristbands / drink tickets for a group tab',
      'Groups up to 13 people in the Boat, and larger spaces for parties of 15-250+'    
    ],
    reviewRequest: 'All we ask in return is for you to kindly ask your guests to leave us a 5-star review on their favorite social media site (Facebook, Google, Yelp, TripAdvisor... we\'re not picky!)',
    doNotsHeader: 'IMPORTANT:',
    doNots: [
      'Absolutely NO moving chairs or tables',
      'No reserving games (pool, ping pong, cornhole) - first come, first serve!',
      'No outside food (Taki Takos & Cluck Chicken only!)',
    ],
    detailsHeader: 'Your Reserveation Request:',
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
    
    console.log('SENDING MAIL', options);

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
    var cater = this.reduceToStr(this.customerEmail.catering);
    var features = this.reduceToStr(this.customerEmail.features);
    var doNots = this.reduceToStr(this.customerEmail.doNots);
    var spaces = this.reduceToStr(reservation.rentalSpaces);
    return {
      to,
      from: 'Dive Inn Denver Reservations<reservations@diveinndenver.com>',
      subject: this.customerEmail.subject,
      text: 
`${this.customerEmail.intro}

${this.customerEmail.body1}

${this.customerEmail.body2}

${this.customerEmail.cateringHeader}
${cater}

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
Preferred Spaces:
${spaces}
Notes:
${reservation.notes}`,
    };
  }
  
  private createAppEmailOptions(reservation: Reservation): MailOptions {
    const organizerName = reservation.organizer.name;
    var spaces = this.reduceToStr(reservation.rentalSpaces);
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

Preferred Spaces:
${spaces}

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