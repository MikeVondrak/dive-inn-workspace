import express, { Request, Response, Router } from 'express';
import pgPromise from 'pg-promise';

import { ReservationRequest } from '@dive-inn-lib';

import { BaseRouter } from './base.router';
import { RouterCallback } from '../models/router.model';
import { routes } from '../routes';

export class FontTypeRouter extends BaseRouter {

  constructor(routerCallback: RouterCallback<ReservationRequest>) {
    const baseRoute = routes.api.font._root + routes.api.font.type._root;
    const baseQuery = sqlQueries.getFontTypes;
    super(baseRoute, baseQuery, routerCallback);
  }
}