import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from ".prisma/client";

const { user } = new PrismaClient();

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_AUTH_CLIENTID as string,
    clientSecret: process.env.GOOGLE_AUTH_CLIENTSECRET as string,
    callbackURL: `${process.env.NODE_ENV === "production"
      ? "https://api.rooma.ca"
      : "http://localhost:8080"}/api/auth/google/callback`,
  },
  async function (
    _accessToken: any,
    _refreshToken: any,
    profile: any,
    done: any
  ) {
    console.log("passport.google - GoogleStrategy : profile.emails[0]");
    console.log(profile.emails[0]);

    const email = profile.emails[0].value;
    const foundUser = await user.findUnique({
      where: {
        email,
      },
    });

    if (foundUser) {
      return done(null, foundUser);
    }

    const newUser = await user.create({
      data: {
        name: profile.displayName,
        email,
      },
    });

    return done(null, newUser);
  }
);

passport.serializeUser(function (user: any, done) {
  console.log("serializeUser : user");
  console.log(user);

  done(null, user.id);
});

passport.deserializeUser(async function (userId: string, done) {
  console.log("deserializeUser : userId");
  console.log(userId);

  let foundUser = await user.findUnique({
    where: {
      id: userId,
    },
  });

  if (foundUser) {
    const deserializableUser = {
      id: foundUser.id,
      name: foundUser.name,
      pfp: foundUser.pfp,
    };
    done(null, deserializableUser);
  } else {
    done({ message: "User not found by id." }, null);
  }
});

passport.use(googleStrategy);
// passport.use(localStrate);
export default passport;