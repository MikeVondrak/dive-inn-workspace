import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { routes } from 'projects/dive-inn-lib/src/lib/constants';

@Injectable({
  providedIn: 'root'
})
export class SpecialsApiService {

  constructor(private http: HttpClient) { }

  public getSpecials10$(): Observable<string[]> {
    const specials10: Observable<string[]> = this.http.get<string[]>(routes.api._root + routes.api.specials._root);
    return specials10;
  }
}
