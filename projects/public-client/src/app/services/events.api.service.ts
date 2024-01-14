import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsApiService {

  constructor(private http: HttpClient) { }

  // public getEvents10$(): Observable<string[] | null> {
    // const events10: Observable<string[] | null> = this.http.get<string[]>(routes.api._root + routes.api.events._root).pipe(startWith(null));

    // return events10;
  // }
}
