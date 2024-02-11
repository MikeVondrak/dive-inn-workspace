import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, startWith } from 'rxjs';

import { routes } from 'projects/dive-inn-lib/src/lib/constants';

@Injectable({
  providedIn: 'root'
})
export class EventsApiService {

  private eventsCache$: Observable<string[]> | null = null;

  constructor(private http: HttpClient) { }

  public getEvents10$(): Observable<string[] | null> {
    console.log('getevents')
    // cache the data from S3 bucket because it's not changing frequently 
    if (!this.eventsCache$) {
      console.log('http', routes.api._root + routes.api.events._root)
      this.eventsCache$ = this.http.get<string[]>(routes.api._root + routes.api.events._root).pipe(shareReplay(1));
    }
    return this.eventsCache$;
  }
}
