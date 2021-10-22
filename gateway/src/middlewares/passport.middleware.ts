import passport from "passport";
import PassportConfig from "@/core/authentication/config/passport.config";

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  // passport configurations
  const passportConfig = new PassportConfig();
};