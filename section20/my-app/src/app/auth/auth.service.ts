import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface authResponseData {
    idToken	:string;
    email	:string;
    refreshToken	:string;
    expiresIn	:string;
    localId:string;
    registered?:string;
}

@Injectable({providedIn: 'root'})

export class AuthService{

    user = new BehaviorSubject<User | null>(null);

    private tokenExpirationTimer: any = null;

    constructor(private http: HttpClient, private router: Router){}

    signup(email:string, password:string){
        return this.http.post<authResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJK-tu1zvUzIaMFpxyAD7z68n2MDiozQo',
            {
                email,
                password,
                returnSecureToken: true,
            }
        ).pipe(
            catchError(errorResponse=>this.handleError(errorResponse)),
            tap(responseData=>{
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            })
        )
    }

    login(email:string, password:string){
        console.log(email, password);
        return this.http.post<authResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJK-tu1zvUzIaMFpxyAD7z68n2MDiozQo',
            {
                email,
                password,
                returnSecureToken: true,
            }
        ).pipe(
            catchError(errorResponse=>this.handleError(errorResponse)),
            tap(responseData=>{
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            })
        )
    }

    private handleAuthentication(email: string, localId:string, idToken: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email,localId, idToken, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);    //set autologout when signin or signup
        localStorage.setItem('userData', JSON.stringify(user));
    }


    private handleError(errorResponse: HttpErrorResponse){
        let errorMessage = 'unKnown error occurred';
                
        if(!errorResponse.error || !errorResponse.error.error){
            return throwError(() => new Error(errorMessage));
        }
        switch(errorResponse.error.error.message){
            case "EMAIL_EXISTS":
                errorMessage = "This email is already exist.";
                break;
            case "OPERATION_NOT_ALLOWED":
                errorMessage = "Password sign-in is disabled for this project.";
                break;
            case "TOO_MANY_ATTEMPTS_TRY_LATER":
                errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
                break;
            case "EMAIL_NOT_FOUND":
                errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted.";
                break;
            case "INVALID_PASSWORD":
                errorMessage = "The password is invalid or the user does not have a password.";
                break;
            case "USER_DISABLED":
                errorMessage = "The user account has been disabled by an administrator.";
                break;
            default:
                errorMessage = 'unKnown error occurred';
        }
        return throwError(() => new Error(errorMessage));
    }

    autoLogin(){   //call this method when app is loaded for  first time in app component onInit
        const localStorageData = localStorage.getItem('userData');
        if(!localStorageData)return;

        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorageData);
        
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);   //when user auto login though page refresh we need to set timeout again
        }
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);//clear time out if user manually logout then this will again logout because of setTimeout which might cause logout if was login again
        }
        this.tokenExpirationTimer = null;
    }    

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(()=>{
            this.logout();
        },expirationDuration)
    }
}