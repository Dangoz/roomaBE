import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import AuthenService from "../services/authen.service";

// passport configurations
export default class PassportConfig {
  private authenService: AuthenService = new AuthenService();

  constructor() {
    passport.serializeUser(this.serialize());
    passport.deserializeUser(this.deserialize());
    passport.use(this.localLogin());
    passport.use(this.googleLogin());
  }

  // return local strategy configurations
  private localLogin(): LocalStrategy {
    return new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      async (email, password, done) => {
        const user = await this.authenService.getUserByEmailAndPassword(email, password);
        return user
          ? done(null, user)
          : done(null, false, {
            message: "Invalid credentials provided, email or password error",
          });
      }
    );
  }

  // return google strategy configurations
  private googleLogin(): GoogleStrategy {
    return new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_AUTH_CLIENTID as string,
        clientSecret: process.env.GOOGLE_AUTH_CLIENTSECRET as string,
        callbackURL: `${process.env.NODE_ENV === "production"
          ? "https://api.rooma.ca"
          : "http://localhost:8080"}/v1/auth/google/callback`,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        console.log("passport.google - GoogleStrategy : profile.emails[0]");
        console.log(profile.emails[0]);

        const email = profile.emails[0].value;
        const foundUser = await this.authenService.getUserByEmail(email);

        if (foundUser) {
          return done(null, foundUser);
        }

        const newUser = await this.authenService.createUser(profile.displayName, email);

        return done(null, newUser);
      }
    );
  }

  // return config function for passport.serialize()
  private serialize(): (user: any, done) => void {
    return (user: any, done): void => {
      console.log("serializeUser : user");
      console.log(user);

      done(null, user.id);
    }
  }

  // return config function for passport.deserailize()
  private deserialize(): (userId: string, done) => Promise<void> {
    return async (userId: string, done): Promise<void> => {
      // console.log("deserializeUser : userId");
      // console.log(userId);

      let foundUser = await this.authenService.getUserById(userId);

      if (foundUser) {
        done(null, foundUser);
      } else {
        done({ message: "User not found by id." }, null);
      }
    }
  }
}