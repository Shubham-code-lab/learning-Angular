//we could have done fetch operation by using subject and then subscribe to it but there is no multiple component is involve that uses that method so here the better option is to use it in simple way
import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable, catchError, throwError, tap } from 'rxjs';
import { Post } from './post.model';

import { Subject } from "rxjs";

@Injectable({ providedIn: 'root'})

export class PostsService {

    error = new Subject<string>();

    constructor(private http: HttpClient) {}

    public onCreatePost(title: string, content: string){
        const postData:Post = {title, content}
        //httpClient convert our postData object into json
        //http request are managed by observable so we need to subscribe to the observable that wrap our http request in order to send it 
        //we don't need to unsubscribe the subscription manually as angular will do it for us
        this.http.post(
            'https://learning-angular-956f9-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
             postData,
             {
                // observe: 'body',  //Default behavior so we get the parsed body data
                observe: 'response',  //we get the parsed body along with other meta data like status code,headers,etc
             }
             )
        .subscribe({
          next: responseData=>{
            console.log(responseData);   //no need to return observable to subscribe in component as it is not required there 
          },
          error: error=>{
            this.error.next(error.message);    //handling error by using subject we subscribe it in ngOnInit
          }
        })
    }

    public fetchPosts(): Observable<Post[]>{
        //we can define type to the http method as it is generic
        //we are returning the subscription as we need to get value and assign it to local value of component

        let searchParams = new HttpParams();   //searchParam is immutable object
        searchParams = searchParams.append('print','pretty');  //so we need to create new one and append to it again
        searchParams = searchParams.append( 'custom', 'key');

        return this.http.get<{ [key: string]: Post }>(
            'https://learning-angular-956f9-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',  //?print=pretty&custom=key //we can also do it here //but HttpParams is more convinent way
            {
                headers: new HttpHeaders({ 'Custom-Header': 'Hello' }), 

                // params: new HttpParams().set('print', 'pretty')   //for API endpoint we can also attach query parameter
                //OR
                params: searchParams
            }
            )
        .pipe(
            map((responseData)=>{
                const postsArray: Post[] = [];
                for(const key in responseData){
                    if(responseData.hasOwnProperty(key))
                        postsArray.push({...responseData[key], id: key})
                }
                return postsArray;
            }),
            catchError(errorRes =>{         //another method of catching error by using catchError method
                return throwError(() => errorRes);   
            })
        )
    }

    public deletePost(){
        return this.http.delete(
            'https://learning-angular-956f9-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
            {
                observe: 'events',
                //responseType: 'text'  //keep response as text don't parse it to js object //blob= when response is file
            }
            ).pipe(
                tap(event=>{    //tap allow us to execute some code without altering the code //do something with response but not disturb other subscribe
                    console.log("observe events :-",event);
                    if(event.type === HttpEventType.Sent){
                        //we can update something in ui until we wait as request is sent
                        console.log(event.type);
                    }
                    if(event.type === HttpEventType.Response){  //HttpEventType is enum as event.type return two object first one is type which is numeric given to response type to check we hae to check it with enum to know what is it
                        //we can access the response body if exist at this point
                        console.log(event.body);
                    }
                })

            );
    }
}


// Error Handling different way 
// 1 subscribe it in component and
// error: (error) => {
//     this.error = error.message;
//   } 

//2 subscribe it in service and create observable through subject
//   error: error=>{
//     this.error.next(error.message);    //handling error by using subject we subscribe it in ngOnInit
//   }

// then subscribe it in ngOnInit

//use catchError of rxjs