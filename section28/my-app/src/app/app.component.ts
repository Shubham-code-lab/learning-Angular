import { state, trigger,style, transition, animate, keyframes, group } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //we define certain name that we place in DOM that will trigger animation 'divState'
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',       //OR use camel case  //backgroundColor
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),
      // transition('normal => highlighted', animate(300)),
      // transition('highlighted => normal', animate(800))
      //OR
      transition('normal <=> highlighted', animate(300)),   //<=>  to and fro
    ]),

    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',       //OR use camel case  //backgroundColor
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        backgroundColor: 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
        //from shrunken to any state //any state to shrunken
      transition('shrunken <=> *', 
        //we can animate during the tansition 
        // animate(500, style({          //it give 50px border radius but instantly remove it so not smooth
        //   borderRadius: '50px'
        // }))
        //to fix above
        [
          style({   //intantly apply change
            'background-color': 'orange'
          }),
          animate(1000, style({   //for 1sec we add border radius
            borderRadius: '50px'
          })),
          animate(500)       //0.5 sec to fix that instant change and make it smooth   //mean transition to end state
          //now shrunken state is applied
        ]
      )
    ]),

    trigger( 'list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      //void when element is not added to DOM
      transition('void => *', [ //when element added to DOM
        style({     //we need this to have the initial state of an element
          opacity: 0,
          transform: 'translateX(-100px)',
        }),
        animate(300)  //otherwise this alone doesn't work
      ]),
      transition('* => void', [  //when element is removed from DOM
        animate(300,style({  //as our element already has state so we don't need initial state here
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ]),

    trigger( 'list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      //void when element is not added to DOM
      transition('void => *', [ //when element added to DOM
        animate(1000, keyframes([  //by default each style is given 1000/number of style equal so last style get applied instantly at 66% if there 3 style to fix this we use offset to control style at each keyframe
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset:0  //we can change the time taken by each style using offset
          }),
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset:0.3
          }),
          style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset:0.8
          }),
          style({
            transform: 'translateX(0px)',
            opacity: 1,
            offset:1
          })
        ]))
      ]),
      transition('* => void', [  //when element is removed from DOM
        group([     //using group both animation get applied with different times
          animate(300,style({
            color: 'red'
          })),
          animate(800,style({  //as our element already has state so we don't need initial state here
            transform: 'translateX(100px)',
            opacity: 0
          }))
        ])
      ])
    ])
  ] 
})
export class AppComponent {
  state = 'normal';
  wildState = 'wildState';

  list = ['Milk', 'Sugar', 'Bread'];

    onAdd(item:any) {
      this.list.push(item);
    }

    onDelete(item:any){
      this.list.splice(this.list.indexOf(item), 1);
    }

    onAnimate(){
      this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
      this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
    }

    onShrink(){
      this.wildState = 'shrunken';
    }

    animationStart(event:any){
      console.log("execute when animation start", event);
    }

    animationEnd(event:any){
      console.log("execute when animation end", event);
    }
}
