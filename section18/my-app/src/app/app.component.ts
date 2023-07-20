//always do task that are not realted to UI in service 
//In component do the task related to UI

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscribable, Subscription, map } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts:Post[] |[] = [];
  isFetching:boolean = false;
  error:string | null = null;
  private errorSub!: Subscription;

  constructor(private http: HttpClient, private postsService:PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.errorSub = this.postsService.error.subscribe(errorMessage=>{
        this.error = errorMessage;
    })

    //DEPRECIATED :-

      // this.postsService.fetchPosts().subscribe(responseData=>{  //we are subscribing it here are we do required the fetched data to render in component
      //   this.loadedPosts = responseData;        //assigning the fetched data to render on UI
      //   this.isFetching = false;                //also we know when the data fetching is completed
      // },
      //  error=>{
      //   this.error = error.message;
      //  }
      // )

      //NEW :-

      this.postsService.fetchPosts().subscribe({
        next: (responseData) => {
          this.loadedPosts = responseData;
          this.isFetching = false;
        },
        error: (error) => {
          this.error = error.message;
        }
      })
  }

  onCreatePost(postData:{ title: string, content: string}) {
    this.postsService.onCreatePost(postData.title, postData.content);  //we are not subscribing here because it no required in UI hence keeping file clean and doing it in service
  }

  onFetchPosts() {
      this.isFetching = true;

      //DEPRECIATED :-

      // this.postsService.fetchPosts().subscribe(responseData=>{  //we are subscribing it here are we do required the fetched data to render in component
      //   this.loadedPosts = responseData;        //assigning the fetched data to render on UI
      //   this.isFetching = false;                //also we know when the data fetching is completed
      // },
      //  error=>{
      //   this.error = error.message;
      //  }
      // )

      //NEW :-

      this.postsService.fetchPosts().subscribe({
        next: (responseData) => {
          this.loadedPosts = responseData;
          this.isFetching = false;
        },
        error: (error) => {
          this.error = error.message;
        }
      })
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePost().subscribe({
      next: ()=>{
        this.loadedPosts = [];  
      },
      error: (error)=>{
        this.error = error.message;
      }
    })
  }

  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }
}
