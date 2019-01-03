import {NextFunction, Request, Response} from 'express';

declare global {
  namespace Express {
    interface Request {
      user: any,
      decodedToken: any
    }
  }
}

export class Controller {
  check = (req: Request, res: Response, next: NextFunction): any => {
    let decodedToken = req.decodedToken;
    next();
  }
}

export default new Controller();