import 'express-session';
declare module "express-session" {
    interface Session {
      user: string;
      password:string;
      admin:boolean;
    }
  }