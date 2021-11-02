// register & map modules for alias, see tsconfig paths
import moduleAlias from "module-alias";
moduleAlias.addAliases({ '@': __dirname, });

require("dotenv").config();
import App from "@/app";
import RoomController from "@/core/room.controller";

const server = new App([
  new RoomController()
]);

server.start();