import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { routes } from 'projects/dive-inn-lib/src/lib/constants';
import { Reservation, ReservationResponse } from '../models/api/reservations.api.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationApiService {

  constructor(private http: HttpClient) { }

  public submitReservation(reservationDetails: Reservation) {
    const postResponse = this.http.post<ReservationResponse>(
      routes.api._root + routes.api.reservation._root, reservationDetails
    );
      console.log(reservationDetails)
    return postResponse;
  }
}
