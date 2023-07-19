import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

import Controller from 'interfaces/controller.interface';

class App {
  private app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);

    // initialize services
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }

  public getServer() {
    return this.app;
  }

  public appListen() {
    this.app.listen(process.env.PORT || 5000);
  }
}

export default App;
