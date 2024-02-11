// express and middleware
import express, { RequestHandler, Router, Request, Response } from 'express';
import compression from 'compression';
import path from 'path';

// our backend
import { ServerApp } from './server-app-postgres';
import { ReservationsRouter } from './routers/reservations.router';
import { AwsBucketRouter } from './routers/aws-bucket.router';
import { routes } from './routes';

const PORT: string = process.env.PORT || '3000'; // process.env.PORT set by server (e.g. Heroku) when hosted, or use 3000 for local testing
process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'; 

const ANGULAR_APP_LOCATION_DEV = '../../../../dist/public-client'; // output from ng build --prod
const ANGULAR_APP_LOCATION_PROD = '../../../public-client'; // AWS relative path
// running server app from ./server/app or ./server/dist (for prod)
let ANGULAR_APP_LOCATION = ANGULAR_APP_LOCATION_DEV; // output from ng build --prod
if (process.env.NODE_ENV === 'production') {
  ANGULAR_APP_LOCATION = ANGULAR_APP_LOCATION_PROD;
}

debugFileAndDir(); // console log the resu

// list of paths for statically served content
// __dirname provided by Express, location app is running from
const angularDist = path.join(__dirname, ANGULAR_APP_LOCATION);
const staticPaths: string[] = [
  angularDist, // published files from Angular --prod build
];

// compile our list of middleware
const middleWare: RequestHandler[] = [
  // Express Framework Built-Ins
  compression(), // gzip for smaller file size / better performance
  express.json(), // parse JSON in body of request
];


/**
 * Makes a typed request to poolQuery and returns array of results via Express Response
 * @param route API route to handle
 * @param query SQL query to make
 * @param res Response object from Express Router
 */
function makePoolQuery<ReturnType>(route: string, res: Response, values?: ReturnType[]): void {
  console.log('***** makePoolQuery: route= ' + route + '\n\tpassed values= ' + (values ? JSON.stringify(values,null,4) : 'none') + '\n\n');
}

// define routers for routes
const routers: Router[] = [];
const reservationsRouter = new ReservationsRouter(makePoolQuery);
const specialsRouter = new AwsBucketRouter(makePoolQuery, 'diveinndenvers3', 'Public/Specials/', routes.api.specials._root);
const eventsRouter = new AwsBucketRouter(makePoolQuery, 'diveinndenvers3', 'Public/Events/', routes.api.events._root);
routers.push(reservationsRouter.router, specialsRouter.router, eventsRouter.router);

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

  console.log(`\n\n********************************************************************************`);
  console.log('Running:\t\t' + __filename);
  console.log(`Environment:\t\t${process?.env?.NODE_ENV}`);
  const tmp = path.join(__dirname, ANGULAR_APP_LOCATION);
  console.log('Angular App Path:\t' + ANGULAR_APP_LOCATION + '\nResolved:\t\t' + tmp);
}

function awsOperation<ReturnType>(route: string, res: Response, values?: ReturnType[]): void {
  console.log('AWS OP');

  res.send(['Moo']);
}