import { Injectable } from '@angular/core';
// import {
// 	Auth,
// 	signInWithEmailAndPassword,
// 	createUserWithEmailAndPassword,
// 	signOut,
// 	authState, 
// 	UserCredential,          
// 	UserInfo
// } from '@angular/fire/auth';
// import { doc, Firestore, setDoc } from '@angular/fire/firestore';
// import { updateProfile } from 'firebase/auth';
// import { Observable, from, of, switchMap,concatMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

	// currentUser$ = authState(this.auth);

  	// constructor(private auth: Auth, private fstore : Firestore) {}

	// signup(email: string,password:string):Observable<UserCredential>{
	// 	return from(createUserWithEmailAndPassword(this.auth,email,password));
		
	// }

	// login(email: string,password:string):Observable<any>{
	// 	return from(signInWithEmailAndPassword(this.auth,email,password));
	// }

	// logout():Observable<any>{
	// 	return from(this.auth.signOut());
	// }

	
	// updateProfile(profileData: Partial<UserInfo>):Observable<any>{
	// 	const user = this.auth.currentUser;
	// 	return of(user).pipe(
	// 		concatMap((user) => {
	// 			if(!user) throw new Error('Not Authenticated');
	// 			return updateProfile(user,profileData);
	// 		})
	// 	);
	// }
}
