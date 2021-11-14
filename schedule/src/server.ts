// register & map modules for alias, see tsconfig paths
import moduleAlias from "module-alias";
moduleAlias.addAliases({ '@': __dirname, });

require("dotenv").config();
import App from "@/app";
import EventController from "./core/event/event.controller";
import TaskController from "./core/task/task.controller";

const server = new App([
  new EventController(),
  new TaskController()
]);

server.start();