import { Injectable } from '@angular/core';
import { Auth, authState, UserCredential, UserInfo, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { updateProfile } from 'firebase/auth';
import { Observable, concatMap, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
 	
	constructor (
		private auth: Auth,
		// private fireAuth: AngularFireAuth
	) {}
		
	// currentUser$ = authState(this.auth);

	// signup
	signup(email: string, password:string):Observable<UserCredential> {
		return from(createUserWithEmailAndPassword(this.auth, email, password));
	}

	// login
	login(email: string, password:string):Observable<any> {
		return from(signInWithEmailAndPassword(this.auth, email, password));
	}


	async logout() {
		// return await this.fireAuth.signOut(); 
	}

	updateProfile(profileData: Partial<UserInfo>):Observable<any> {
		const user = this.auth.currentUser;
		return of(user).pipe(
			concatMap((user) => {
				if(!user) throw new Error('Not Authenticated');
				return updateProfile(user, profileData);
			})
		);
	}
}
