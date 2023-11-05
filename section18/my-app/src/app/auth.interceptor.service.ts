import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable,tap } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {

    //intercept run right before request leave out application
    //if we add it in root module now each request this intercept() function run

    //type "any" data retrive by request   //
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if(req.url = "https something ") //we can restrict some url

        //as request object is immutable so we have to create new 
        const modifiedRequest = req.clone({headers: req.headers.append('newHeader', 'anything')})  //url: ''  can replace with new url, //headers:req.header.append" to keep old header, or we can change params
        return next.handle(modifiedRequest)  //new requested is send rather than old
            .pipe(tap(event=>{   //we can also do manipulate or whatever before our response reaches
                if(event.type === HttpEventType.Response){
                    console.log("response arrived");
                    console.log(event.body);
                }
            }))

        //console.log("Request is on the way");       
        //return next.handle(req);     //we return here and call next.allow() to allow request to leave the app
    }
}