// const express = require('express');

// const app = express();

// const PORT = process.env.PORT || 3000;

// app.get('/',(req, res) => res.send('Hello World'));

// app.listen(PORT, () => console.log(`Server listening in port ${PORT}`))



// const express = require('express'); // old js way of importing

// express and middleware
import express, { RequestHandler, Router, Request, Response } from 'express';
import compression from 'compression';
import path from 'path';

// framework
import { take } from 'rxjs/operators';

// our backend
import { ServerApp } from './server-app-postgres';
import { routes } from './routes';
import { BaseRouter } from './routers/base.router';

const PORT: string = process.env.PORT || '3000'; // process.env.PORT set by server (e.g. Heroku) when hosted, or use 3000 for local testing

// running server app from ./server/app or ./server/dist (for prod)
const ANGULAR_APP_LOCATION = '../../../../dist/public-client'; // output from ng build --prod
const ANGULAR_ASSETS_LOCATION = '../../../client/src/assets'; /** @TODO more consistent locations / file structure */

debugFileAndDir();

// list of paths for statically served content
// __dirname provided by Express, location app is running from
const angularDist = path.join(__dirname, ANGULAR_APP_LOCATION);
const assets = path.join(__dirname, ANGULAR_ASSETS_LOCATION);
const staticPaths: string[] = [
  angularDist, // published files from Angular --prod build
  assets // images, fonts, etc
];

// compile our list of middleware
const middleWare: RequestHandler[] = [
  // Express Framework Built-Ins
  compression(), // gzip for smaller file size / better performance
  express.json(), // parse JSON in body of request

  // custom
  //logger
];

// define controllers for paths
const routers: Router[] = [];

/**
 * Makes a typed request to poolQuery and returns array of results via Express Response
 * @param route API route to handle
 * @param query SQL query to make
 * @param res Response object from Express Router
 */
function makePoolQuery<ReturnType>(route: string, query: string, res: Response, values?: any[]) {
  console.log('***** makePoolQuery: route= ' + route + ', query= ' + query + '\n\tthese were passed values= ' + (values ? JSON.stringify(values,null,4) : 'none') + '\n\n');
  // serverApp.poolQuery<ReturnType>(query, values)
  //   .pipe(take(1))
  //   .subscribe(
  //     (results: ReturnType[]) => {
  //       res.send(results);
  //     },
  //     (err: string) => {
  //       console.log('\n!!!!! Express - Failed getting data from: ' + route + '\n\t' + err);
  //       res.sendStatus(500);
  //     }
  //   );
}

const angularRouter = new BaseRouter(routes._root, '', makePoolQuery);
//const allRoutes = express.Router();

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

