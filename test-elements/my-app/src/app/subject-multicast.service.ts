import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubjectMulticastService {

  constructor() { }

  // multiCastSubject = new Subject<string>();
  multiCastSubject = new BehaviorSubject<string>('initial data');
}
