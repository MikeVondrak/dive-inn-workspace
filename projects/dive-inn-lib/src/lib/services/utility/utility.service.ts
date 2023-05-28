import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  /**
   * Parses a string for '#' and splits before and after into root and fragment
   * @param route string to split at '#'
   * @returns object with root and fragment
   */
  public getRouteRootAndFragment(route: string): { root: string, fragment: string } {
    const routeHashIdx = (route.indexOf('#') > 0) ? route.indexOf('#') : route.length;
    const routeRoot = route.substring(0, routeHashIdx);
    // if there is text after the '#' grab it
    const routeHash = routeHashIdx < (route.length - 1) ? route.substring(routeHashIdx + 1) : '';
    return { root: routeRoot, fragment: routeHash };
  }
}
