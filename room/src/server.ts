// register & map modules for alias, see tsconfig paths
import moduleAlias from "module-alias";
moduleAlias.addAliases({ '@': __dirname, });

require("dotenv").config();
import App from "@/app";
import ServiceController from "@/core/api/service.controller";

const server = new App([
  new ServiceController()
]);

server.start();