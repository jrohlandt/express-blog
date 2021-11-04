import "reflect-metadata"; // used by class-transformer
import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import loggerMiddleware from "./middleware/logger.middleware";
import Controller from "./interfaces/controller.interface";
import errorMiddleware from "./middleware/error.middleware";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: Controller[], port) {
    this.app = express();
    this.port = port;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(loggerMiddleware);
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeErrorHandling() {
    // initializeErrorHandling should be called last after all other middleware has been added.
    this.app.use(errorMiddleware);
  }

  private connectToTheDatabase() {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
    // mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
    mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
    );
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App is listening on port ${this.port}`);
    });
  }
}

export default App;
