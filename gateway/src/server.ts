// register & map modules for alias, see tsconfig paths
import moduleAlias from "module-alias";
moduleAlias.addAliases({ '@': __dirname, });

require("dotenv").config();
import App from "@/app";
import UserController from "@/core/user/controllers/user.controller";
import AuthenController from "@/core/authentication/controllers/authen.controller";
import ScheduleController from "@/core/schedule/schedule.controller";
import RoomController from "./core/room/room.controller";

const server = new App([
  new UserController(),
  new AuthenController(),
  new ScheduleController(),
  new RoomController()
]);

server.start();