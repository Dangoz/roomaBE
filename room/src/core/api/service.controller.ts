import IController from "@/interfaces/controller.interface";
import express from "express";

class ServiceController implements IController {
  path = "";
  router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/cat`, this.test);
  }

  private async test(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(200).json({ message: "Meow~!" });
  }
}

export default ServiceController;