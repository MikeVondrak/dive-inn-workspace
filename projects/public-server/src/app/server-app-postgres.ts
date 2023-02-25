// https://dev.to/aligoren/developing-an-express-application-using-typescript-3b1

import express, { Application, RequestHandler, Router } from 'express';
//import { SQL } from 'sql';


export class ServerApp {
  private app: Application;
  //private pool: Pool;
  // private readonly dbConfig: Pool = new Pool({
  //   host: 'localhost',
  //   port: 5432,
  //   user: 'postgres',
  //   password: 'D1v31nnD4t4!?',
  //   database: 'postgres',
  // });
  // private readonly herokuDbConfig: Pool = new Pool({
  //   host: 'ec2-34-195-115-225.compute-1.amazonaws.com',
  //   port: 5432,
  //   user: 'gjdceezcnugnyv',
  //   password: '01830a0a446a61701aee908b0c6443262b943703339bd17bc7a6823f70cddc11',
  //   database: 'd125dfl39tajfu',
  //   //ssl: true,
  //   ssl: {
  //     rejectUnauthorized: false
  //   },
  //   connectionString: process.env.DATABASE_URL
  // });
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
      console.log('DB connection:\t\tHEROKU');
      //this.pool = this.herokuDbConfig;
      //this.pool = this.createPool(this.herokuDbConfig);
    } else {
      console.log('DB connection:\t\tLOCAL');
      //this.pool = this.dbConfig;
      //this.pool = this.createPool(this.dbConfig);
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
