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

  createUser(email: string, password: string): Promise<UserRecord> {
    return admin.auth().createUser({
      email,
      password
    });
  }

  deleteUser(uid: string): Promise<void> {
    return admin.auth().deleteUser(uid);
  }
}

export default new FirebaseService();