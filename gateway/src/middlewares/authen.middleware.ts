export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("@authenticated")
    return next();
  }

  res.status(299).send("🧙‍♂️ you shall not pass 🧙‍♂️");
};

export const forwardAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/home');
};