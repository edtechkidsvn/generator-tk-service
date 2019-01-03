import * as admin from 'firebase-admin';
import {account, dbUrl} from './credentials';

interface DecodedToken {
  uid: string;
}

interface UserRecord {
  uid: string;
  email: string;
}

export class FirebaseService {
  constructor() {
    admin.initializeApp(
      {
        credential: admin.credential.cert(account),
        databaseURL: dbUrl,
      },
    )
  }

  checkToken(token: string): Promise<DecodedToken> {
    return admin.auth().verifyIdToken(token);
  }
}

export default new FirebaseService();