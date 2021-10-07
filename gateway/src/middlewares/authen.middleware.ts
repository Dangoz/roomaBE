export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("user authenticated @@@")
    return next();
  }
  console.log("not authenticated!");
  res.status(299).json({ err: "not authenticated" });
};

export const forwardAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/home');
};