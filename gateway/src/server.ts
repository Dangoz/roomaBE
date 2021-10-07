// register & map modules for alias, see tsconfig paths
import moduleAlias from "module-alias";
moduleAlias.addAliases({ '@': __dirname, });

require("dotenv").config();
import App from "@/app";
import UserController from "@/core/user/controllers/user.controller";
import AuthenController from "@/core/authentication/controllers/authen.controller";

const server = new App([
  new UserController(),
  new AuthenController()
]);

server.start();