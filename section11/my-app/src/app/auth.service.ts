//Demo file that allow to login or logout or check current authentication state
export class AuthService {
    loggedIn = false;

    isAuthenticated():Promise<boolean>{
        const promise:Promise<boolean> = new Promise(
            (resove, rejected)=>{
                setTimeout(() => {
                    resove(this.loggedIn);
                }, 1000);
            }
        )
        return promise;
    }
    login(){
        this.loggedIn = true;
    }
    logout(){
        this.loggedIn = false;
    }

}