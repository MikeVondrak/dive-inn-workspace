import { Request, Response } from 'express';

import { BaseRouter } from './base.router';
import { GenericResponse, RouterCallback } from '../models/router.model';
import { routes } from '../routes';
import { Special, SpecialsResponse } from '../models/specials.model';

export class SpecialsRouter extends BaseRouter {
  constructor(routerCallback: RouterCallback<GenericResponse>) {
    const route = routes.api._root + routes.api.specials._root;
    super(route, routerCallback);
  }
}