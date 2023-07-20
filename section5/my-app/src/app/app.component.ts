import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements:{type:string, name:string, content:string}[] = [{type:"server", name:'Testserver', content:"just test server"}];

  onServerAdded(serverData:{newServerName:string, newServerContent:string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.newServerName,
      content: serverData.newServerContent
    });
  }

  onBlueprintAdded(blueprintData:{newServerName:string, newServerContent:string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.newServerName,
      content: blueprintData.newServerContent
    });
  }

  onChangeFirst(){
    this.serverElements[0].name = "shubham";
  }

  onDestroyFirst(){
    this.serverElements.splice(0,1);
  }
}
