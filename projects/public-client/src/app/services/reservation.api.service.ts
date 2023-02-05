import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { routes } from 'projects/dive-inn-lib/src/lib/constants';
import { Reservation } from '../models/api/reservations.api.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationApiService {

  constructor(private http: HttpClient) { }

  public submitReservation(reservationDetails: Reservation) {
    const postResponse = this.http.post(
      routes.api._root + routes.api.reservation._root, reservationDetails
    );

    return postResponse;
  }
}
