// https://dev.to/aligoren/developing-an-express-application-using-typescript-3b1

import express, { Application, RequestHandler, Router } from 'express';
//import { SQL } from 'sql';


export class ServerApp {
  private app: Application;

  constructor(
    private angularAppLocation: string = '',
    private port: string = '5432',
    private staticPathList: string[],
    private middleWareList: RequestHandler[],
    private controllerList: Router[],
    private rootRoute: string,
    private catchAllRoute: string,
  ) {
    this.app = express(); // create a new express application instance
    this.port = process.env.PORT ? process.env.PORT : this.port; // process.env.PORT set by Heroku
    

    if (process.env.NODE_ENV === 'production') {
      console.log('Server App:\t\tProduction:', port);
    } else {
      process.env.NODE_ENV = 'development';
      console.log('Server App:\t\tDevelopment:', port);
    }
    

    // first to match route takes precedence,  static > middleware > controllers
    // '/' defaults to index.html from Express settings
    this.useStatic(this.staticPathList);
    this.useMiddleware(this.middleWareList);
    this.useControllers(this.controllerList);
    this.setCatchAllRoutes();
  }

  /**
   * Load app with paths from which to serve static files
   * @param paths array of paths to static file locations
   *  NOTE: express.static makes the files in the path passed in accessible from the root URL (e.g. localhost:3000/<file name>)
   *  Since we load the static paths first, calls to the root path (localhost:3000/) will end up loading /dist/dive-inn/index.html
   *  Can add a mount point to serve from a different path (e.g. '/static', doesn't have to exist) but causes problems w/Angular,
   *    may need to build with --base-href flag and/or set base href in index.html
   */
  private useStatic(paths: string[]) {
    paths.forEach(path => {
      this.app.use(express.static(path));
      // this.app.use('/static', express.static(path)); // specify a mount path
    });
  }

  /**
   * Load middleware for processing requests
   * @param requestHandlers array of middleware RequestHandlers
   */
  private useMiddleware(requestHandlers: RequestHandler[]) {
    requestHandlers.forEach(requestHandler => {
      this.app.use(requestHandler);
    });
  }

  /**
   * Load controllers to handle API routes
   * @param routers array of Routers
   */
  private useControllers(routers: Router[]) {
    routers.forEach(router => {
      // this.app.use(routes.api.root, router);
      this.app.use(this.rootRoute, router);
    });
  }

  /**
   * Catch all unhandled routes
   * @TODO proper 404 etc error handling
   */
  private setCatchAllRoutes() {
    if (!!this.catchAllRoute) {
      this.app.all(this.catchAllRoute, (req, res) => {
        res.status(200).sendFile('/', {root: this.angularAppLocation});
        //res.status(404).send('Route Not Found');
      });
    }
  }

  /**
   * Start Express app
   */
  public beginListening() {
    this.app.listen(this.port, () => {
      console.log('********************************************************************************');
      console.log('Node Express server for "' + this.app.name + '" listening on port: ' + this.port + '\n');
    });
  }

  /**
   * Query using pool, automatically aquires and releases connection to db
   * @template T Type of Observable to return
   * @param sqlQuery SQL query string
   * @returns Observable of array of provided type, containing query results
   */
  // public poolQuery<T>(sqlQuery: string, values?: any): Observable<T[]> {

  //   const queryResult$ = (observer: Observer<T[]>) => {
      
  //     const queryConfig: QueryConfig = {
  //       text: sqlQuery,
  //       values: values
  //     };

  //     const responseCallback = (err: Error, result: QueryResult) => {
  //       if (err) {
  //         observer.error(err);
  //       }
  //       const typedResult: T[] = result?.rows;
  //       observer.next(typedResult);
  //       observer.complete();
  //     };
      
  //     this.pool.query(queryConfig, responseCallback);      
  //   };

  //   return new Observable<T[]>(queryResult$);
  // }
  
}
