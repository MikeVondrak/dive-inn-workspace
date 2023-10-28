import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, startWith } from 'rxjs';

import { routes } from 'projects/dive-inn-lib/src/lib/constants';

@Injectable({
  providedIn: 'root'
})
export class SpecialsApiService {

  private specialsResults$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) { }

  public getSpecials10$(): Observable<string[] | null> {
    const specials10: Observable<string[] | null> = this.http.get<string[]>(routes.api._root + routes.api.specials._root).pipe(startWith(null));
    return specials10;
  }
}
