import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent {
  @Output('servCreated') serverCreated = new EventEmitter<{newServerName:string, newServerContent:string}>();  
  @Output('bpCreated') blueprintCreated = new EventEmitter<{newServerName:string, newServerContent:string}>();  
  
  @ViewChild('serverNameInputElement', { static: false })  serverNameInputElementRef!:ElementRef;   //local referance

  newServerName = '';
  newServerContent = '';

  onAddServer(serverNameInputElement:HTMLInputElement) {   //using local referance 
    console.log("view child", this.serverNameInputElementRef.nativeElement.value);
    this.serverCreated.emit({
      // newServerName:this.newServerName,
      newServerName:serverNameInputElement.value,
      newServerContent:this.newServerContent
    })
  }

  onAddBlueprint() {
    this.blueprintCreated.emit({
      newServerName:this.newServerName,
      newServerContent:this.newServerContent
    })
  }

}