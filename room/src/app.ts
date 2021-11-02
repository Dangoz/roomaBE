import express from "express";
import IController from "@/interfaces/controller.interface";

class App {
  private _app: express.Application;
  private readonly _port: number | string = process.env.PORT || 5100;

  constructor(public controllers: IController[]) {
    this._app = express();

    this.initializeMiddlewares();
    this.initializeControllers();
  }

  public start() {
    this._app.listen(this._port, () => {
      console.log(`room listening on the port ${this._port}`);
    });
  }

  private initializeMiddlewares() {
    require("@/middlewares/express.middleware")(this._app);
  }

  private initializeControllers() {

    // pass in each router from controllers
    this.controllers.forEach(controller => {
      this._app.use('/', controller.router);
    })
  }
}

export default App;