import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObserverService {

  constructor() { 

    getContentDetailByID(id: string): Observable<ContentDetails> {
      return new Observable<ContentDetails>((observer) => {
          const foundContentDetail = this.contentDetails.find(detail => detail.id === id);
  
          if (foundContentDetail) {
              observer.next(foundContentDetail);
              observer.complete();
          } else {
              this.getContentDetails().pipe(take(1)).subscribe(
                  {
                      next: (contentDetails: ContentDetails[]) => {
                          const foundContentDetail = contentDetails.find(detail => detail.id === id);
                          if (foundContentDetail) {
                              observer.next(foundContentDetail);
                              observer.complete();
                          } else {
                              observer.error(new Error("Can't find the content"));
                          }
                      },
                      error: (errorMessage) => {
                          observer.error(errorMessage);
                      }
                  }
              );
          }
      });
  }
  
  }
}
