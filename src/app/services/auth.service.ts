import { Injectable } from '@angular/core';

import {
  getAuth,
  createUserWithEmailAndPassword,
  Auth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private _authFirebase: Auth = getAuth();
  private _isSignedIn: boolean = false;
  private _isSignedInSubject: Subject<boolean> = new Subject();

  /**
   *
   * @returns
   */
  public getAuthFirebase(): Auth {
    return this._authFirebase;
  }

  /**
   *
   * @returns
   */
  public getIsSignedIn(): boolean {
    return this._isSignedIn;
  }

  /**
   *
   * @param boolean
   */
  public setIsSignedIn(signedIn: boolean): void {
    this._isSignedIn = signedIn;
    this.emitSignIn();
  }

  public emitSignIn() {
    this._isSignedInSubject.next(this._isSignedIn);
  }

  /**
   * Function used to create a new user into Firebase
   * @param email
   * @param password
   */
  public async createNewUser(email: string, password: string) {
    await createUserWithEmailAndPassword(
      this.getAuthFirebase(),
      email,
      password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(`Success: User ${JSON.stringify(user.email)} created!`);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`error: ${JSON.stringify(error)}`);

        // ..
      });
  }

  /**
   * Function used to signIn a user into Firebase
   * @param email
   * @param password
   */
  public async signIn(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.getAuthFirebase(), email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(`Success: User ${JSON.stringify(user.email)} connected!`);
        this.setIsSignedIn(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`error: ${JSON.stringify(error)}`);
      });
  }

  /**
   * Function used to disconnect the user
   */
  public async signOut(): Promise<void> {
    try {
      await this._authFirebase.signOut();
      this.setIsSignedIn(false);
      console.log(`User disconnected successfully!`);
    } catch (error) {}
  }
}
