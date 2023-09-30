import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";

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

    constructor(private http: HttpClient){}

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
}