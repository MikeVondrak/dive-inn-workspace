import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { routes } from 'projects/dive-inn-lib/src/lib/constants';

@Injectable({
  providedIn: 'root'
})
export class SpecialsApiService {

  private specialsCache$: Observable<string[]> | null = null;
  private eventsCache$: Observable<string[]> | null = null;

  constructor(private http: HttpClient) { }

  public getSpecials10$(): Observable<string[] | null> {
    // cache the data from S3 bucket because it's not changing frequently 
    if (!this.specialsCache$) {
      this.specialsCache$ = this.http.get<string[]>(routes.api._root + routes.api.specials._root).pipe(shareReplay(1));
    }
    return this.specialsCache$;
  }
}
