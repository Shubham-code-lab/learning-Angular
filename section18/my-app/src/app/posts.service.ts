//we could have done fetch operation by using subject and then subscribe to it but there is no multiple component is involve that uses that method so here the better option is to use it in simple way
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError, throwError } from 'rxjs';
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
        this.http.post('https://learning-angular-956f9-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', postData)
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
        return this.http.get<{ [key: string]: Post }>('https://learning-angular-956f9-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
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
        return this.http.delete('https://learning-angular-956f9-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json');
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