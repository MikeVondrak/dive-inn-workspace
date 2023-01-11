import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { routes } from 'projects/public-server/src/app/routes';

@Injectable({
  providedIn: 'root'
})
export class ReservationApiService {

  constructor(private http: HttpClient) { }

  public submitReservation(reservationDetails: any) {
    const postResponse = this.http.post(
      routes.api._root + routes.api.reservation_request._root, reservationDetails
    );

    return postResponse;
  }
}
