import {NextFunction, Request, Response} from 'express';
import firebaseService from '../../services/firebase.service';

declare global {
  namespace Express {
    interface Request {
      decodedToken: any
    }
  }
}

export class Controller {
  check = (req: Request, res: Response, next: NextFunction): any => {
    let token = req.headers["x-auth-token"];
    if (!token) {
      res.status(400).json({
        "error": "No token"
      })
    } else {
      firebaseService.checkToken(token.toString()).then((decodedToken) => {
        req.decodedToken = decodedToken;
        next();
      })
      .catch((error) => res.json(error));
    }
  }
}

export default new Controller();