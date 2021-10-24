export default interface IUser {
  id: string;
  email: string;
  name: string;
  pfp: string;
}

// extend Express.User for req.user types
declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}