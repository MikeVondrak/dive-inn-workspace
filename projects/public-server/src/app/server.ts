// express and middleware
import express, { RequestHandler, Router, Request, Response } from 'express';
import compression from 'compression';
import path from 'path';

// our backend
import { ServerApp } from './server-app-postgres';
import { routes } from './routes';
import { BaseRouter } from './routers/base.router';
import { ReservationsRouter } from './routers/reservations.router';

const PORT: string = process.env.PORT || '3000'; // process.env.PORT set by server (e.g. Heroku) when hosted, or use 3000 for local testing

// running server app from ./server/app or ./server/dist (for prod)
const ANGULAR_APP_LOCATION = '../../../../dist/public-client'; // output from ng build --prod
//const ANGULAR_ASSETS_LOCATION = '../../../client/src/assets'; /** @TODO more consistent locations / file structure */

debugFileAndDir();

// list of paths for statically served content
// __dirname provided by Express, location app is running from
const angularDist = path.join(__dirname, ANGULAR_APP_LOCATION);
//const assets = path.join(__dirname, ANGULAR_ASSETS_LOCATION);
const staticPaths: string[] = [
  angularDist, // published files from Angular --prod build
  //assets // images, fonts, etc
];

// compile our list of middleware
const middleWare: RequestHandler[] = [
  // Express Framework Built-Ins
  compression(), // gzip for smaller file size / better performance
  express.json(), // parse JSON in body of request

  // custom
  //logger
];

/**
 * Makes a typed request to poolQuery and returns array of results via Express Response
 * @param route API route to handle
 * @param query SQL query to make
 * @param res Response object from Express Router
 */
function makePoolQuery<ReturnType>(route: string, res: Response, values?: ReturnType[]): void {
  console.log('***** makePoolQuery: route= ' + route + '\n\tthese were passed values= ' + (values ? JSON.stringify(values,null,4) : 'none') + '\n\n');
}

// define routers for routes
const routers: Router[] = [];
const reservationsRouter = new ReservationsRouter(makePoolQuery);
routers.push(reservationsRouter.router);


console.log('~~~~~~~~~~~~~~~~~~~~~~~', reservationsRouter);

// Angular app is served as static file
// All other routes are for API
const serverApp = new ServerApp(angularDist, PORT, staticPaths, middleWare, routers, '/', '/*');
serverApp.beginListening();

/**
 * __dirname = location where node script is currently executing
 * use path.join to resolve relative path ('../') in _appLocation
 * /server/dist/server.js -> ../../dist/dive-inn -> /dist/dive-inn/
 */
function debugFileAndDir() {
  console.log('\n\n********************************************************************************');
  console.log('Running:\t\t' + __filename);
  const tmp = path.join(__dirname, ANGULAR_APP_LOCATION);
  console.log('Angular App Path:\t' + ANGULAR_APP_LOCATION + '\nResolved:\t\t' + tmp);
}

